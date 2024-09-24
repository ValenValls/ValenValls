let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let paused = true;
let boardColor= getComputedStyle(document.body).getPropertyValue('--text-color')
let snakeColor= getComputedStyle(document.body).getPropertyValue('--bg-color')
let text = document.getElementById("game-text");

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    snakeColor= getComputedStyle(document.body).getPropertyValue('--bg-color')
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
    
    context.fillStyle = boardColor;
    context.fillRect(0, 0, board.width, board.height);

    placeFood();   
    document.addEventListener("keyup", changeDirection, { capture: true });

    const buttons = {
        up: document.getElementById("up-button"),
        down: document.getElementById("down-button"),
        left: document.getElementById("left-button"),
        right: document.getElementById("right-button")
    };

    Object.keys(buttons).forEach(direction => {
        buttons[direction].dataset.code = `Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
        buttons[direction].addEventListener("click", changeDirection);
    });

    document.addEventListener("keydown", function(e) {
        if ((["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) && (paused==false))  {
            e.preventDefault(); // Prevent the default action (scrolling)
        }
    });

    startb = document.getElementById("start-button");
    startb.addEventListener("click", togglePause);
    restart_button = document.getElementById("restart-button");
    restart_button.addEventListener("click", reset);    
    


    text.innerHTML = "PRESS SPACE KEY OR PLAY/PAUSE BUTTON TO START THE GAME"
    // Set snake speed
    setInterval(update, 1000 / 10);
}
function reset(){
    boardColor= getComputedStyle(document.body).getPropertyValue('--text-color')
    snakeColor= getComputedStyle(document.body).getPropertyValue('--bg-color')
    snakeBody = [];
    speedX = 0;  
    speedY = 0;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    placeFood(); 
    gameOver = false;   
    update();
    paused=true;
    text.innerHTML = "PRESS SPACE KEY OR PLAY/PAUSE BUTTON TO START THE GAME"
    
}
function update() {
    boardColor= getComputedStyle(document.body).getPropertyValue('--text-color')
    snakeColor= getComputedStyle(document.body).getPropertyValue('--bg-color')

    // Background of a Game
    context.fillStyle = boardColor;
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (gameOver || paused) { // Check if the game is paused
        context.fillStyle = snakeColor;        
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }
        return;
    }

    

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = snakeColor;
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 
        || snakeX > (total_col * blockSize)-1 
        || snakeY < 0 
        || snakeY > (total_row * blockSize)-1 ) { 
        
        // Out of bound condition
        gameOver = true;
        paused = true;
        text.innerHTML = "GAME OVER. RESTART THE GAME"
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            paused = true;
            text.innerHTML = "GAME OVER. RESTART THE GAME"
            
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if(paused == false){
        e.preventDefault();
    }
    else{
        return;
    }   
    
    let code;
    if (e.type === "keyup") {
        code = e.code;
    } else {
        code = e.target.dataset.code;
    }

    if (code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
    else if(code == "Space"){
        togglePause();
    }
}



// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function togglePause() {
    paused = !paused; // Toggle the paused flag
    if(paused){
        text.innerHTML = "GAME PAUSED"
    }
    else{
        text.innerHTML = ""
    }
}