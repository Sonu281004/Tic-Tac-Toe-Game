const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked() {
  const index = this.getAttribute("data-cell-index");
  if (options[index] !== "" || !running) return;
  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins!`;
    showPopupMessage(`${currentPlayer} Wins! 🎉`);
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    showPopupMessage("It's a Draw! 🤝");
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s Turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;

  // Hide the result overlay
  document.getElementById("resultOverlay").style.display = "none";
}

function showPopupMessage(message) {
  const resultOverlay = document.getElementById("resultOverlay");
  const resultMessage = document.getElementById("resultMessage");

  resultMessage.textContent = message;
  resultOverlay.style.display = "flex";
}

initializeGame();
