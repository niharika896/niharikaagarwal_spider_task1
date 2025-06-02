let isDarkMode=false;
const grid=document.getElementById("grid-container");
const arrowsTop=document.getElementById("arrows-top");
const arrowsBottom=document.getElementById("arrows-bottom");
const toggle=document.getElementById("themeToggle");

localStorage.removeItem("loglevel:ERROR");

for(i=1;i<=7;i++){
    let columndiv=document.createElement('div');
    columndiv.id=`c${i}`;       //all ids are strings
    columndiv.className="column"; //all classNames are strings
    grid.appendChild(columndiv);
}


const columns=document.getElementsByClassName("column");

for(i=0;i<7;i++){
    let column=columns[i];
    for(j=1;j<=6;j++){
        row = document.createElement('div');
        row.id= `${i+1}${7-j}`
        row.className="circle";
        column.appendChild(row);
    }
}

//down arrows
for(i=1;i<=7;i++){
    let arrow=document.createElement('button');
    arrow.style.backgroundImage="url('down-arrow.png')";
    arrow.style.backgroundSize="contain";
    arrow.style.backgroundRepeat="no-repeat";
    arrow.className="arrow top";
    arrow.id=`d${i}`;
    arrowsTop.appendChild(arrow);
}
//up arrows
for(i=1;i<=7;i++){
    let arrow=document.createElement('button');
    arrow.style.backgroundImage="url('up-arrow.png')";
    arrow.style.backgroundSize="contain";
    arrow.style.backgroundRepeat="no-repeat";
    arrow.className="arrow bottom";
    arrow.id=`u${i}`;
    arrowsBottom.appendChild(arrow);
}

toggle.addEventListener('change', function(){
    isDarkMode=this.checked;
    document.body.classList.toggle('darkMode', this.checked);
    document.getElementById("grid-container").classList.toggle('darkMode',this.checked);
    document.getElementById("leaderboard").classList.toggle('darkMode',this.checked);
    Array.from(arrowsTop.querySelectorAll('.arrow.top')).forEach((arrow) => {
    arrow.style.backgroundImage = isDarkMode? "url('down-arrow-white.png')": "url('down-arrow.png')";
});
    Array.from(arrowsBottom.querySelectorAll('.arrow.bottom')).forEach((arrow) => {
    arrow.style.backgroundImage = isDarkMode? "url('up-arrow-white.png')": "url('up-arrow.png')";
});
    Array.from(document.getElementsByClassName("circle")).forEach((circle)=>{
        circle.classList.toggle('darkMode',this.checked);
    })
})



