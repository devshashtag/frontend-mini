const board = document.querySelector(".board");
const size = { min: 1, max: 20 };

let lastTimestamp = 0;
let speed = 100;

function randomCircle(board, size){
  // random position in board
  const boardBounding = board.getBoundingClientRect();
  const x = Math.trunc(Math.random() * (boardBounding.right  - size.max) + size.min);
  const y = Math.trunc(Math.random() * (boardBounding.bottom - size.max) + size.min);

  // circle
  const circle = document.createElement("div");
  const circleSize = Math.random() * size.max + size.min + 'px';
  circle.style.backgroundColor = '#' + `${Math.floor(Math.random()*16777215).toString(16)}`.padStart(6, '0');;
  circle.classList.add('circle');
  board.appendChild(circle);

  setTimeout(() => {
    circle.style.top = y + 'px';
    circle.style.left = x + 'px';
    circle.style.width = circleSize;
    circle.style.height = circleSize;

    setTimeout(() => {
      board.removeChild(circle);
    }, 1000);
  }, 10);

}

function render(timestamp) {
  if (lastTimestamp + (1000 / speed) <= timestamp) {
    lastTimestamp = timestamp;
    randomCircle(board, size);
    randomCircle(board, size);
  }

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);



