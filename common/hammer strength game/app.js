const needle= document.getElementById("needle");
const stop=document.getElementById("stop");
const p1turn = document.getElementById("p1")
const p2turn = document.getElementById("p2")
const pong = document.getElementById("pong")
const hammerR = document.getElementById("hammerR")
const hammerL = document.getElementById("hammerL")
const hitAudio = new Audio("hit.mp3")
needle.style.transformOrigin='left';
needle.style.transition='ease-in-out';
let p1score,p2score;

//Nedle Oscillation 
let theta=0;
let isGoing=1;
let intervalID = null;
const needleRotate = function(){
    intervalID = setInterval(()=>{
        if(theta>=180)isGoing=0;
        else if(theta<=0)isGoing=1;
        let delta;

        if(theta<90)delta=5*(theta+1)/90;
        else if(theta>=90)delta=5*(181-theta)/90;

        if(isGoing)theta+=delta;
        else theta-=delta;
        needle.style.transform = `${window.innerWidth<1100?"translate(14vw, -15vh)": "translate(4vw, -15vh)"} rotate(-${theta}deg)`;
    },16)
    return intervalID;
}

function click(turn) {
    return new Promise((resolve) => {
        const handler = () => {
            const score = theta>90? 100- ((theta-90)/90)*100 : 100 - ((90-theta)/90)*100 
            resolve(score);
            turn.removeEventListener('click', handler);
        };
        turn.addEventListener('click', handler);
    });
}

function movePong(score) {
    return new Promise((resolve) => {
        pong.style.transition = "transform 2s ease-in-out";
        pong.style.transform = `translate(0, ${-20 - 0.45 * score}vh)`;

        const handleTransitionEnd = () => {
            pong.removeEventListener('transitionend', handleTransitionEnd);
            setTimeout(() => {
                resolve();
            }, 1000);
        };

        pong.addEventListener('transitionend', handleTransitionEnd);
    });
}

function animateHammerR(){
    let rect = hammerR.getBoundingClientRect();
    let startX=rect.left;
    let startY=rect.top;
    let endX = meter.getBoundingClientRect().left + (meter.getBoundingClientRect().width);
    let endY = meter.getBoundingClientRect().bottom;
    let cx=(startX+endX)/2;
    let cy=(startY+endY)/2;
    let r = Math.hypot(endX - startX, endY- startY) / 2;
    let angle=0;
    return new Promise((resolve)=>{
        function animate(){
        if(angle<=Math.PI){
            const x = cx+ r * Math.cos(angle);
            const y = cy - r * Math.sin(angle);
            hammerR.style.transform = `translate(${x-startX}px, ${y - startY}px) rotate(${(1 - angle / Math.PI) * 90}deg)`;
    
            angle += 0.04;
            requestAnimationFrame(animate);
        }
        else{
            hitAudio.play();
            hammerR.style.display="none";
            resolve();
        }
        }
        requestAnimationFrame(animate);
    })   
}

function animateHammerL() {
    const rect = hammerL.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;

    const meterRect = meter.getBoundingClientRect();
    const endX = meterRect.left - meterRect.width/2;
    const endY = meterRect.bottom;

    const cx = (startX + endX) / 2;
    const cy = (startY + endY) / 2;
    const r = Math.hypot(endX - startX, endY - startY) / 2;

    let angle = Math.PI; // Start from left side

    return new Promise((resolve) => {
        function animate() {
            if (angle >= 0) {
                const x = cx + r * Math.cos(angle);
                const y = cy - r * Math.sin(angle); // top semicircle (clockwise)

                const rotation = 90+ (1- angle / Math.PI) * 90 ; // from -90 to 0 deg

                hammerL.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotation}deg)`;

                angle -= 0.04; // move clockwise
                requestAnimationFrame(animate);
            } else {
                hitAudio.play();
                hammerL.style.display = "none";
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}



async function game(){
    //first turn
    intervalID = needleRotate();
    p1turn.style.transform = "scale(1.5) translate(2vh,-2vh)";
    p1turn.querySelector("p").innerHTML = "Your Turn";
    p1score = await click(p1turn);
    clearInterval(intervalID);
    console.log(p1score);
    await animateHammerR();
    await movePong(p1score);
    pong.style.transform = `translate(0,-20vh)`
    intervalID=null;
    p1turn.style.transform = "scale(1)";
    p1turn.querySelector("p").innerHTML = "";

    //next turn
    hammerL.style.display="flex";
    intervalID = needleRotate();
    p2turn.style.transform = "scale(1.5) translate(-2vh,-2vh)";
    p2turn.querySelector("p").innerHTML = "Your Turn";
    p2score = await click(p2turn);
    clearInterval(intervalID);
    console.log(p2score);
    await animateHammerL();
    await movePong(p2score);
    pong.style.transform = `translate(0,-20vh)`
    intervalID=null;
    p2turn.style.transform = "scale(1) translate(-2vh,-2vh)";
    p2turn.querySelector("p").innerHTML = "";
    
    document.getElementById("gamebox").style.opacity="20%";
    document.getElementById("endpage").style.display="flex";
    document.getElementById("endpage").classList.add("endchar")
    document.getElementById("win").querySelector("p").innerHTML=`Player1 Score:${Math.round(p1score)}<br>Player2 Score:${Math.round(p2score)}<br>${p1score>p2score? "Player1":"Player2"} Won`;
    
    document.getElementById("close").addEventListener("click",()=>{
        document.getElementById("endpage").style.display="none";
        document.getElementById("gamebox").style.opacity="100%";
    })

    document.getElementById("replay").addEventListener("click",()=>{
        window.location.reload();
    })
    

}


window.addEventListener("DOMContentLoaded",game)

