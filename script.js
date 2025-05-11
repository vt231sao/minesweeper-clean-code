const game = document.getElementById("game");
const rows = 9, cols = 9, mines = 10;

function createBoard() {
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        game.appendChild(cell);
    }
}

window.onload = createBoard;
