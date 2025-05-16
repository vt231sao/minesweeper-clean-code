const game = document.getElementById("game");
let rows = 9, cols = 9, mines = 10;
let board = [];
let revealed = [];
let isFirstClick = true;
let startTime = null;
let timerInterval = null;
let gameOver = false;
let currentDifficulty = 'easy';

function createEmptyBoard() {
    board = Array(rows).fill().map(() => Array(cols).fill(0));
    revealed = Array(rows).fill().map(() => Array(cols).fill(false));
}
function restartGame() {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "⏱ Час: 0 с";
    gameOver = false;
    isFirstClick = true;
    startTime = null;
    timerInterval = null;
    createEmptyBoard();
    drawBoard();
}

function setDifficulty(level) {
    currentDifficulty = level;
    if (level === "easy") {
        rows = 9;
        cols = 9;
        mines = 10;
    } else if (level === "medium") {
        rows = 16;
        cols = 16;
        mines = 10;
    } else if (level === "hard") {
        rows = 16;
        cols = 30;
        mines = 20;
    }
    restartGame();
}


function placeMinesSafe(r0, c0) {
    let placed = 0;
    while (placed < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (board[r][c] !== 'M' &&
            Math.abs(r - r0) > 1 &&
            Math.abs(c - c0) > 1) {
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
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                toggleFlag(r, c);
            });
            game.appendChild(cell);
        }
    }
}

function toggleFlag(r, c) {
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (revealed[r][c]) return;

    if (cell.textContent === "🚩") {
        cell.textContent = "";
    } else {
        cell.textContent = "🚩";
    }
}
function updateTimerDisplay() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `⏱ Час: ${elapsed} с`;
}

function handleClick(r, c) {
    if (gameOver) return;
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (revealed[r][c] || cell.textContent === "🚩") return;

    if (isFirstClick) {
        placeMinesSafe(r, c);
        isFirstClick = false;
        startTime = Date.now();
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }

    revealed[r][c] = true;
    cell.classList.add("revealed");

    if (board[r][c] === 'M') {
        cell.textContent = "💣";
        alert("Гра закінчена!");
        revealAll();
        return;
    } else if (board[r][c] === 0) {
        cell.textContent = "";
        revealEmpty(r, c);
    } else {
        cell.textContent = board[r][c];
    }

    checkWin();
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

function revealAll(lock = false) {
    gameOver = true;
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
            if (lock) {
                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                cell.style.pointerEvents = 'none';
            }
        }
    }
}

function checkWin() {
    let revealedCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (revealed[r][c]) revealedCount++;
        }
    }

    if (revealedCount === rows * cols - mines) {
        alert("Ви виграли!");
        revealAll();
        clearInterval(timerInterval);
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

        fetch('save_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'time=' + encodeURIComponent(elapsedTime) +
                '&difficulty=' + encodeURIComponent(currentDifficulty)
        }).then(res => {
            if (res.ok) {
                alert(`Результат (${elapsedTime} с) збережено!`);
            } else {
                alert("Не вдалося зберегти результат.");
            }
        });
    }
}


function startGame() {
    isFirstClick = true;
    createEmptyBoard();
    drawBoard();
}

window.onload = startGame;
