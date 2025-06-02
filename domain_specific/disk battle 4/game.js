let intervalID=null;
let condition=0;
let k,l;
const now= new Date();
let clickHandlers=[];
let blockrowisblocked=false;
let yTurn=true; 
let blocked_col="0";       //blocked_col is a string
let ytime=180;
let rtime=180;
const yyt=document.getElementById("yyt");
const ybc=document.getElementById("ybc");
const ryt=document.getElementById("ryt");
const rbc=document.getElementById("rbc");
const arrowRowTop=document.getElementById("arrows-top");
const arrowRowBottom=document.getElementById("arrows-bottom");
const arrowsListTop=Array.from(document.getElementsByClassName("arrow top"));
const arrowsListBottom=Array.from(document.getElementsByClassName("arrow bottom"));
const yt=document.getElementById("ytimer");
const rt=document.getElementById("rtimer");
const ul=document.getElementById("ranking");
let isPause = false;

//audios
const diskDrop = new Audio('diskdrop.wav');
const blockAud = new Audio('block.wav');
const powerUpSound = new Audio('powerup.wav');
const winAudio = new Audio('win.wav');

const soundToggle=document.getElementById('soundToggle');
const etY=document.getElementById('etY');
const etR=document.getElementById('etR');
let isSound=false;
const yPU=document.getElementById('powerUpsY');
const rPU=document.getElementById('powerUpsR');
const cfY = document.getElementById('cfY');
const aboutPage=document.getElementById("about-popup")

aboutPage.style.display="none";

soundToggle.addEventListener('change',function(){
    isSound=this.checked;
})

etY.addEventListener('click', function(){
    if(isSound)powerUpSound.play();
    etY.disabled=true;
    ytime+=15;
})
etR.addEventListener('click', function(){
    if(isSound)powerUpSound.play();
    etR.disabled=true;
    rtime+=15;
})

cfY.addEventListener('click',function(){
    cfY.disabled="true";
    colorFlip();
})
cfR.addEventListener('click',function(){
    cfR.disabled="true";
    colorFlip();
})
//unocc=0 yellow-1 red-2;
let filled = [] 
arrowRowBottom.style.display="none";
ybc.style.display="none";
rbc.style.display="none";
ryt.style.display="none";
rt.style.display="none";

let occupied = Array.from({length:7},()=>Array(6).fill(0));

function colorFlip(){
    if(isSound)powerUpSound.play();
    let cfclickHandlers=Array.from({length:7},()=>Array(6).fill(null));
    let num=yTurn?1:2;
    let num_tf = yTurn? 2 : 1 //num has the number of the colours to be flipped
    for(let i=0;i<7;i++){
        for(let j=0;j<6;j++){
            const cell = document.getElementById(`${i+1}${j+1}`);

            if(occupied[i][j]==num)cell.style.opacity="50%"
            else if(occupied[i][j]==num_tf){
                const handler = (event) =>{
                    occupied[i][j]=num;
                    event.target.style.backgroundColor= yTurn? "#FFD166" : "#EF476F";
                    condition=win();
                    if(condition!=0){
                        handleGameOver();
                    }

                    for (let x = 0; x < 7; x++) {
                        for (let y = 0; y < 6; y++) {
                            const el = document.getElementById(`${x + 1}${y + 1}`);
                            if (cfclickHandlers[x][y]) {
                                el.removeEventListener("click", cfclickHandlers[x][y]);
                            }
                            el.style.opacity = "100%"; // Reset opacity
                        }
                    }
                };

                cfclickHandlers[i][j]=handler;
                cell.addEventListener("click",handler);
                cell.style.cursor="pointer";
            }
        }
    }
}

function handleGameOver(){
    if(isSound)winAudio.play();
    clearInterval(intervalID);
    localStorage.removeItem("loglevel:ERROR");
    ybc.style.display="none";
    rbc.style.display="none";
    ryt.style.display="none";
    yyt.style.display="none";
    rt.style.display="none";
    yt.style.display="none";
    etR.style.display="none";
    etY.style.display="none";
    cfY.style.display="none";
    cfR.style.display="none";
    if(condition!=0){
        if(condition==1)
            alert("Yellow Player Won");
        else{
            alert("Red Player Won");
        }
    }
    if(ytime==0 || rtime==0){
    alert(`${ytime==0? "Red Player Won": "Yellow Player Won"}`);
    }
    localStorage.setItem(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${condition==1?"Yellow Player": "Red Player"}`, condition==1?ytime:rtime);
    document.getElementById("arena").style.display="none";
    
    let pastScores=[];
        for(i=0;i<localStorage.length; i++){
            const myKey=localStorage.key(i);
            pastScores.push([myKey,localStorage[myKey]])
        }
            
        pastScores.sort((a,b)=>b[1]-a[1]);
    
    for(i=0;i<5;i++){
        let li=document.createElement("li");
        li.innerHTML=`${pastScores[i][0]} | Time: ${pastScores[i][1]}`;
    ul.appendChild(li);
    }   
    document.getElementById("leaderboard").style.display="flex";
}

function startTimer(){
    let timer= yTurn? yt : rt;
    timer.style.display="flex";
    intervalID=setInterval(()=>{
        if(!isPause)yTurn? ytime--:rtime--;
        timer.innerHTML=`${yTurn? ytime:rtime}`;
        if(ytime==0 || rtime==0){
            handleGameOver();
        }
    },1000)
}

function win() {
    const rows = 6;
    const cols = 7;

    // Vertical check
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row <= rows - 4; row++) {
            let cell = occupied[col][row];
            if (cell !== 0 &&
                cell === occupied[col][row + 1] &&
                cell === occupied[col][row + 2] &&
                cell === occupied[col][row + 3]) {
                return parseInt(cell);
            }
        }
    }

    // Horizontal check
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            let cell = occupied[col][row];
            if (cell !== 0 &&
                cell === occupied[col + 1][row] &&
                cell === occupied[col + 2][row] &&
                cell === occupied[col + 3][row]) {
                return parseInt(cell);
            }
        }
    }

    // Diagonal check (bottom-left to top-right)
    for (let col = 0; col <= cols - 4; col++) {
        for (let row = 0; row <= rows - 4; row++) {
            let cell = occupied[col][row];
            if (cell !== 0 &&
                cell === occupied[col + 1][row + 1] &&
                cell === occupied[col + 2][row + 2] &&
                cell === occupied[col + 3][row + 3]) {
                return parseInt(cell);
            }
        }
    }

    // Diagonal check (top-left to bottom-right)
    for (let col = 0; col <= cols - 4; col++) {
        for (let row = 3; row < rows; row++) {
            let cell = occupied[col][row];
            if (cell !== 0 &&
                cell === occupied[col + 1][row - 1] &&
                cell === occupied[col + 2][row - 2] &&
                cell === occupied[col + 3][row - 3]) {
                return parseInt(cell);
            }
        }
    }

    return 0;
}


function chosingBlock(){
    return new Promise((resolve)=>{
        let handlerArray=[];
        const tempCopy= [...arrowsListBottom];
        arrowsListBottom.forEach((arrow,i)=>{
            if(filled.includes(i)){}
            else{
                const handler= (event)=>{
                    const arrow= event.currentTarget;
                    blocked_col=arrow.id.slice(1);   //blocked_col is a string
                    tempCopy.forEach((arrow,i)=>{
                        arrow.removeEventListener("click",handlerArray[i])
                    });
                    resolve(`blocked col is ${blocked_col}`);
                };
                handlerArray[i]=handler;
                arrow.addEventListener("click",handler);
            }
            
        })
    })
}

async function block(){
        arrowRowTop.style.display="none";
        arrowRowBottom.style.display="flex";
        if(yTurn){ //means y has just played
            yyt.style.display="none";
            ybc.style.display="flex";
            
        }
        else{ //means r has just played
            ryt.style.display="none";
            rbc.style.display="flex";
            
        }
        if(filled.length!=6){
            const message = await chosingBlock()

        }
        if(yTurn){ //means y has chosen column to block
            ybc.style.display="none";
            yt.style.display="none";
            ryt.style.display="flex";
        }
        else{
            rbc.style.display="none";
            rt.style.display="none";
            yyt.style.display="flex";
        }
        arrowsListTop[parseInt(blocked_col)-1].style.opacity="50%";
        arrowRowTop.style.display="flex";
        arrowRowBottom.style.display="none";

    return "Row to be blocked has been chosen";
}



function insertion(event){
    if(isSound)diskDrop.play();
    let tempCopy = [...arrowsListTop]
    //is called when coin already inserted
    arrowRowTop.style.display="flex";
    arrowRowBottom.style.display="none";
    const arrow=event.currentTarget;
    return new Promise((resolve)=>{
        let cnum=arrow.id;

        let c_no=parseInt(cnum.slice(1));
        let l_unoc=1;
        for(i=0;i<6;i++){
            if(occupied[c_no-1][i]===0)break;
            else l_unoc++;  
        }
        //hence we know which circle is to be filled
        if(yTurn){
            //y has played so now y has to block
            yyt.style.display="none";
            if(!blockrowisblocked) ybc.style.display="flex";
            occupied[c_no-1][l_unoc-1]=1;
            document.getElementById(`${c_no}${l_unoc}`).style.backgroundColor="#FFD166";
        }
        else{
            ryt.style.display="none";
            if(!blockrowisblocked) rbc.style.display="flex";
            occupied[c_no-1][l_unoc-1]=2;
            document.getElementById(`${c_no}${l_unoc}`).style.backgroundColor="#EF476F";
        }
        if(l_unoc===6){
            document.getElementById(`u${c_no}`).removeEventListener('click',clickHandlers[c_no-1]);
            filled.push(c_no-1); //filled has indexes
            document.getElementById(`d${c_no}`).style.opacity="50%";
            document.getElementById(`u${c_no}`).style.opacity="50%";
        }
        if(filled.length===6){
            rbc.style.display="none";
            ybc.style.display="none";
            blockrowisblocked=true;
            blocked_col=0;
            arrowsListBottom.forEach((arrow)=>{
                arrow.style.opacity="50%";
            })
        }
        tempCopy.forEach((arrow,i)=>{
            arrow.removeEventListener("click",clickHandlers[i]);
        })
        resolve("Coin was inserted");
    })
}

async function gameSequence(){
    if(yTurn){
        yPU.style.display="flex";
        rPU.style.display="none";
    }
    else{
        rPU.style.display="flex";
        yPU.style.display="none";
    }
    startTimer();
    clickHandlers=[];
    arrowsListTop.forEach((arrow,i)=>{
        if(i===(parseInt(blocked_col)-1) || filled.includes(i)){}
        else{
            arrow.style.opacity="100%";
            //handler has both insertion and block - both together should take 20sec
            let handler = async function(){
                let message = await insertion(event)
                condition = win();
                if(condition!=0){
                    handleGameOver();
                }
                else{
                    //if total 6 columns are already filled then the blocking feature itself is not called.
                if(filled.length!=6){
                    message = await block();
                    if(isSound)blockAud.play();
                }
                //column to be blocked has been chosen
                if(yTurn){
                    ryt.style.display="flex";
                    rt.style.display="flex";
                }
                else{
                    yyt.style.display="flex";
                    yt.style.display="flex";
                }
                clearInterval(intervalID);
                let timer=yTurn? yt:rt;
                timer.style.display="none";
                yTurn=(!yTurn);
                gameSequence();
                }

            }
            clickHandlers[i]=handler;
            arrow.addEventListener("click",handler);
        }
    })
}

window.addEventListener("DOMContentLoaded",()=>{
    localStorage.removeItem("loglevel:ERROR");
    gameSequence();
}
)

document.getElementById("about-button").addEventListener('click',()=>{
    isPause=true;
    aboutPage.style.display="flex";
    document.getElementById("game-body").style.opacity="20%";
})

document.getElementById("cross").addEventListener('click',()=>{
    isPause=false;
    aboutPage.style.display="none";
    document.getElementById("game-body").style.opacity="100%";
} )