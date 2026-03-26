const squares = Array.from({ length: 9 }, (_, index) => ({
    player: null,
    index,
}));
function createBoard() {
    const board = document.querySelector(".board");
    for (let i = 0; i < squares.length; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = `${[i]}`;
        board.appendChild(square);
    }
}
createBoard();
let currentPlayer = 0;
function swapPlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    console.log(currentPlayer);
}
function hasWon() {
    if ((squares[0].player === currentPlayer &&
        squares[1].player === currentPlayer &&
        squares[2].player === currentPlayer) ||
        (squares[3].player === currentPlayer &&
            squares[4].player === currentPlayer &&
            squares[5].player === currentPlayer) ||
        (squares[6].player === currentPlayer &&
            squares[7].player === currentPlayer &&
            squares[8].player === currentPlayer) ||
        (squares[0].player === currentPlayer &&
            squares[3].player === currentPlayer &&
            squares[6].player === currentPlayer) ||
        (squares[1].player === currentPlayer &&
            squares[4].player === currentPlayer &&
            squares[7].player === currentPlayer) ||
        (squares[2].player === currentPlayer &&
            squares[5].player === currentPlayer &&
            squares[8].player === currentPlayer) ||
        (squares[0].player === currentPlayer &&
            squares[4].player === currentPlayer &&
            squares[8].player === currentPlayer) ||
        (squares[2].player === currentPlayer &&
            squares[4].player === currentPlayer &&
            squares[6].player === currentPlayer)) {
        console.log(`${currentPlayer} won the match!`);
    }
}
const squareDivs = document.querySelectorAll(".square");
squareDivs.forEach((el) => {
    el.addEventListener("click", (e) => {
        el.classList.add("is-clicked");
        el.classList.add(`is-player-${currentPlayer}`);
        let squareID = parseInt(el.id);
        squares[squareID].player = currentPlayer;
        console.log(squares);
        hasWon();
        swapPlayer();
    });
});
export {};
//# sourceMappingURL=main.js.map