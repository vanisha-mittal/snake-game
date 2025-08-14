let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let cellSize=50; // height and width of each cell
let snakeCells=[[0,0]];
let direction="right";
let gameOver=false;
let foodCells=generateFood();
let score=0;

let intervalId=setInterval(function(){
    update();
    draw();
},100);



document.addEventListener("keydown", function(event){
    if(event.key==="ArrowUp" && direction!=="down"){
        direction="up";
    }else if(event.key==="ArrowDown" && direction!=="up"){
        direction="down";
    }else if(event.key==="ArrowLeft" && direction!=="right"){
        direction="left";
    }else if(event.key==="ArrowRight" && direction!=="left"){
        direction="right";
    }
});

function draw(){
    if(gameOver===true){
        clearInterval(intervalId);
        // Show the game over box
        document.getElementById("finalScore").textContent = score;
        document.getElementById("gameOverBox").style.display = "block";
        
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (let i = 0; i < snakeCells.length; i++) {
    let cell = snakeCells[i];
    
    if (i === snakeCells.length - 1) {
        // Snake head - same neon green but transparent
        ctx.fillStyle = "rgba(57, 255, 20, 1)";
        ctx.shadowColor = "#39FF14";
        ctx.shadowBlur = 15;
    } else {
        // Snake body - solid neon green
        ctx.fillStyle = "rgba(57, 255, 20, 0.4)";
        ctx.shadowColor = "#39FF14";
        ctx.shadowBlur = 8;
    }
    
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    ctx.strokeStyle = "#000000"; // black outline
    ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
}
ctx.shadowBlur = 0; // reset glow after drawing



    //draw food
    ctx.fillStyle = "#FF10F0";
    ctx.fillRect(foodCells.x, foodCells.y, cellSize, cellSize);


    //score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}


function update(){
    let headx=snakeCells[snakeCells.length-1][0];
    let heady=snakeCells[snakeCells.length-1][1];

    let newHeadx;
    let newHeady;
    if(direction=='right'){
        newHeadx=headx+cellSize;
        newHeady=heady;
        if(newHeadx===canvas.width || bodyCollision(newHeadx, newHeady)){
            gameOver=true;
        }
    }else if(direction=='left'){
        newHeadx=headx-cellSize;
        newHeady=heady;
        if(newHeadx<0 || bodyCollision(newHeadx, newHeady)){
            gameOver=true;
        }
    }else if(direction=='up'){
        newHeadx=headx;
        newHeady=heady-cellSize;
        if(newHeady<0 || bodyCollision(newHeadx, newHeady)){
            gameOver=true;
        }
    }else{
        newHeadx=headx;
        newHeady=heady+cellSize;
        if(newHeady===canvas.height || bodyCollision(newHeadx, newHeady)){
            gameOver=true;
        }
    }

    snakeCells.push([newHeadx,newHeady]);
    if(newHeadx===foodCells.x && newHeady===foodCells.y){
        foodCells=generateFood();
        score++;
    }else{
        snakeCells.shift();
    }

}


function generateFood(){
    return{
        x: Math.floor(Math.random()*canvas.width/cellSize)*cellSize,
        y: Math.floor(Math.random()*canvas.height/cellSize)*cellSize,
    }
}


function bodyCollision(newHeadx,newHeady){
    for(let item of snakeCells){
        if(item[0]===newHeadx && item[1]===newHeady){
            return true;
        }
    }
    return false;
}