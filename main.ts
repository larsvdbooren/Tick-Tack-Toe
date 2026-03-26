type Square = {
  player: 0 | 1 | null;
  index: number;
};

const squares: Square[] = Array.from({ length: 9 }, (_, index) => ({
  player: null,
  index,
}));

function createBoard() {
  const board = document.querySelector<HTMLElement>(".board");
  for (let i = 0; i < squares.length; i++) {
    let square: HTMLElement = document.createElement("div");
    square.classList.add("square");
    square.id = `${[i]}`;
    board!.appendChild(square);
    square.addEventListener("click", () => {
      square.classList.add("is-clicked");
      square.classList.add(`is-player-${currentPlayer}`);
      squares[i]!.player = currentPlayer;
      console.log(squares);
      hasWon();
      swapPlayer();
    });
  }
}

createBoard();

let currentPlayer: 0 | 1 = 0;

function swapPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  console.log(currentPlayer);
}

const winConditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function hasWon() {
  for (const condition of winConditions) {
    let isWinning: boolean = true;
    for (const position of condition) {
      if (squares[position]!.player === currentPlayer) {
        isWinning = true;
      } else {
        isWinning = false;
        break;
      }
    }
    if (isWinning) {
      console.log(`${currentPlayer} won the match!`);
      showOverlay();
      updateScore(currentPlayer);
    }
  }
}

const overlay = document.querySelector<HTMLElement>(".overlay");

function showOverlay() {
  if (overlay) {
    overlay.classList.add("is-visible");
  }
}

function hideOverlay() {
  if (overlay) {
    overlay.classList.remove("is-visible");
  }
}

const scoreSpanP1 = document.querySelector<HTMLElement>("#player1Score");
const scoreSpanP2 = document.querySelector<HTMLElement>("#player2Score");
let player1Score = 0;
let player2Score = 0;

function updateScore(player: number) {
  if (player === 0) {
    player1Score++;
    scoreSpanP1!.textContent = player1Score.toString();
  }
  if (player === 1) {
    player2Score++;
    scoreSpanP2!.textContent = player2Score.toString();
  }
}

const resetBtn = document.querySelector<HTMLElement>("#reset-button");

function resetBoard() {
  const parent = document.querySelector<HTMLElement>(".board");
  while (parent!.firstChild) {
    parent?.firstChild.remove();
  }
  squares.forEach((sq) => (sq.player = null));
  hideOverlay();
  createBoard();
}

resetBtn?.addEventListener("click", (e: Event) => {
  resetBoard();
});
