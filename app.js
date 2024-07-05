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

// snake body
let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let gameOver = false;

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
  if (gameOver) {
    return;
  }
  //   console.log("clicked");
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height); //this will build the box

  //   this will create a block for the food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //   check if snake eat the food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //   this will create a block for the snake head
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "lime";
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // game over condation
  // if it go to walls
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;

    // will refresh the page with user click
    if (!alert("Game Over")) {
      window.location.reload();
    }
  }
  //  if snake eat it self
  for (let i = 0; i < snakeBody.length; I++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;

      // will refresh the page with user click
      if (!alert("Game Over")) {
        window.location.reload();
      }
    }
  }
}

//https://www.youtube.com/watch?v=baBq5GAL0_U   25:51

function placeFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// change the direction of snake head
function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
