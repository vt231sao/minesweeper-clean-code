const game = document.getElementById("game");
const rows = 9, cols = 9, mines = 10;
let board = [];
let revealed = [];

function createEmptyBoard() {
    board = Array(rows).fill().map(() => Array(cols).fill(0));
    revealed = Array(rows).fill().map(() => Array(cols).fill(false));
}

function placeMines() {
    let placed = 0;
    while (placed < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (board[r][c] !== 'M') {
            board[r][c] = 'M';
            updateNumbers(r, c);
            placed++;
        }
    }
}

function updateNumbers(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr, nc = c + dc;
            if (isInBounds(nr, nc) && board[nr][nc] !== 'M') {
                board[nr][nc]++;
            }
        }
    }
}

function isInBounds(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
}

function drawBoard() {
    game.innerHTML = "";
    game.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => handleClick(r, c));
            game.appendChild(cell);
        }
    }
}

function handleClick(r, c) {
    if (revealed[r][c]) return;
    revealed[r][c] = true;
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    cell.classList.add("revealed");

    if (board[r][c] === 'M') {
        cell.textContent = "💣";
        alert("Гра закінчена!");
        revealAll();
    } else if (board[r][c] === 0) {
        cell.textContent = "";
        revealEmpty(r, c);
    } else {
        cell.textContent = board[r][c];
    }
}

function revealEmpty(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr, nc = c + dc;
            if (isInBounds(nr, nc) && !revealed[nr][nc]) {
                handleClick(nr, nc);
            }
        }
    }
}

function revealAll() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!revealed[r][c]) {
                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                if (board[r][c] === 'M') {
                    cell.textContent = "💣";
                } else if (board[r][c] !== 0) {
                    cell.textContent = board[r][c];
                }
                cell.classList.add("revealed");
            }
        }
    }
}

function startGame() {
    createEmptyBoard();
    placeMines();
    drawBoard();
}

window.onload = startGame;
