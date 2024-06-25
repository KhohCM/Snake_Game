
//border size
const blockSize = 25;
let rows = 24;
let cols = 18;
let board;
let context;

//snake
let snakeX = blockSize * 5
let snakeY = blockSize * 5
//speed
let velocityX = 0;
let velocityY = 0;
//+body after eat food ##
let snakeBody = []

//food
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d") //drawing on board

    placeFood();
    document.addEventListener("keyup",changeDirection)
    // update();
    setInterval(update, 125); //speed = 125 millisec / sec
}


function update() {
    if (gameOver){
        return
    }
//board
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

//food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

//snake eat food -> snake body length++ at bottom & food will appear at new loacation
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
//## move forward from tail to head, to ensure the part of the body is connecting
    for  (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = (snakeBody[i-1])
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }


//snake
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
//food become part of snake body 
//##
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

//game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over!")
    }
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert("Game Over!")
        }

    }
}

//move keys
function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}