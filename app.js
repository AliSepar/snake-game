//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//food
let foodX, foodY;

let velocityX = 0;
let velocityY = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.width = cols * blockSize;
  board.height = rows * blockSize;
  context = board.getContext("2d"); // used for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);

  //   update();
  setInterval(update, 1000 / 10);
};

function update() {
  //   console.log("clicked");
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height); //this will build the box

  //   this will create a block for the food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //   check if snake eat the food
  if (snakeX == foodX && snakeY == foodY) {
    placeFood();
  }

  //   this will create a block for the snake head
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols * blockSize);
  foodY = Math.floor(Math.random() * rows * blockSize);
}

// change the direction of snake head
function changeDirection(e) {
  if (e.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
}
