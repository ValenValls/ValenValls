document.addEventListener("DOMContentLoaded", function() {   


    function typeWriter(element_id, text, speed, index = 0) {
        return new Promise((resolve) => {
            function type() {
                if (index < text.length) {
                    const elem = document.getElementById(element_id);
                    elem.innerHTML += text.charAt(index);
                    index++; // Increment index here
    
                    if (text.charAt(index - 1) != ' ') {
                        setTimeout(type, speed);
                    } else {
                        type(); // Call type() immediately for spaces
                    }
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    typeWriter("hello", "Hello World!", 100)
        .then(() => typeWriter("my-name", "Valen Valls welcomes you all", 50));


    const toggleCheckbox = document.getElementById("night-day");
    const body = document.body;

    toggleCheckbox.addEventListener("change", function() {          
        body.classList.toggle("dark-mode");
    });        

    const lovesElement = document.getElementById("loves");
    lovesElement.textContent = "Programming";
});
const lovesElement = document.getElementById("loves");
const loves = ["Programming", "Learning", "Being Creative", "Solving Problems", "AI", "Games", "Animals"];
let lovesIndex = 0;

function changeText() {
    lovesIndex = (lovesIndex + 1) % loves.length;
    lovesElement.textContent = loves[lovesIndex];
}

setInterval(changeText, 2000);
/*
const image = document.getElementById('greetings-img');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function updateImageTransform() {
    const rect = image.getBoundingClientRect();
    const x = mouseX - rect.left - rect.width / 2;
    const y = mouseY - rect.top - rect.height / 2;

    const rotateX = Math.max(-15, Math.min(15, -y * 0.05)); // Clamp rotation between -15 and 15 degrees
    const rotateY = Math.max(-15, Math.min(15, x * 0.05));

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateImageTransform();
});
document.addEventListener('scroll', updateImageTransform);
*/



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

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

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

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Left swipe
            direction = 'LEFT';
        } else {
            // Right swipe
            direction = 'RIGHT';
        }
    } else {
        if (yDiff > 0) {
            // Up swipe
            direction = 'UP';
        } else {
            // Down swipe
            direction = 'DOWN';
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}