import { Renderer } from "./renderer.js";

export class Board {
  constructor(rows, cols, mines, container, timer, difficulty = "easy") {
    this.container = container;
    this.timer = timer;
    this.setDifficulty(difficulty);
  }

  setDifficulty(level) {
    this.difficulty = level;

    if (level === "easy") {
      this.rows = 9;
      this.cols = 9;
      this.mines = 10;
    } else if (level === "medium") {
      this.rows = 16;
      this.cols = 16;
      this.mines = 40;
    } else if (level === "hard") {
      this.rows = 16;
      this.cols = 30;
      this.mines = 99;
    }

    this.restart();
  }

  restart() {
    this.board = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(0));
    this.revealed = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.isFirstClick = true;
    this.gameOver = false;
    this.timer.reset();
    Renderer.draw(
      this,
      this.container,
      this.handleClick.bind(this),
      this.toggleFlag.bind(this)
    );
  }

  placeMinesSafe(r0, c0) {
    let placed = 0;
    while (placed < this.mines) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      if (
        this.board[r][c] !== "M" &&
        Math.abs(r - r0) > 1 &&
        Math.abs(c - c0) > 1
      ) {
        this.board[r][c] = "M";
        this.updateNumbers(r, c);
        placed++;
      }
    }
  }

  updateNumbers(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        let nr = r + dr,
          nc = c + dc;
        if (this.inBounds(nr, nc) && this.board[nr][nc] !== "M") {
          this.board[nr][nc]++;
        }
      }
    }
  }

  inBounds(r, c) {
    return r >= 0 && r < this.rows && c >= 0 && c < this.cols;
  }

  handleClick(r, c) {
    if (this.gameOver || this.revealed[r][c]) return;
    const cell = Renderer.getCell(r, c);
    if (cell.textContent === "🚩") return;

    if (this.isFirstClick) {
      this.placeMinesSafe(r, c);
      this.isFirstClick = false;
      this.timer.start();
    }

    this.revealCell(r, c);
    this.checkWin();
  }

  revealCell(r, c) {
    const cell = Renderer.getCell(r, c);
    this.revealed[r][c] = true;
    cell.classList.add("revealed");

    if (this.board[r][c] === "M") {
      cell.textContent = "💣";
      this.revealAll();
      alert("Гра закінчена!");
    } else if (this.board[r][c] === 0) {
      cell.textContent = "";
      this.revealEmpty(r, c);
    } else {
      cell.textContent = this.board[r][c];
    }
  }

  revealEmpty(r, c) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        let nr = r + dr,
          nc = c + dc;
        if (this.inBounds(nr, nc) && !this.revealed[nr][nc]) {
          this.handleClick(nr, nc);
        }
      }
    }
  }

  toggleFlag(r, c) {
    if (this.revealed[r][c]) return;
    const cell = Renderer.getCell(r, c);
    cell.textContent = cell.textContent === "🚩" ? "" : "🚩";
  }

  updateCellDisplay(r, c) {
    const cell = Renderer.getCell(r, c);
    if (!this.revealed[r][c]) {
      if (this.board[r][c] === "M") {
        cell.textContent = "💣";
      } else if (this.board[r][c] !== 0) {
        cell.textContent = this.board[r][c];
      }
      cell.classList.add("revealed");
      cell.style.pointerEvents = "none";
    }
  }

  revealAll() {
    this.gameOver = true;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.updateCellDisplay(r, c);
      }
    }
    this.timer.stop();
  }

  checkWin() {
    const hiddenCells = this.rows * this.cols - this.mines;
    const revealedCount = this.revealed.flat().filter(Boolean).length;

    if (revealedCount === hiddenCells) {
      this.timer.stop();
      alert("Ви виграли!");
      this.revealAll();
      const time = this.timer.getElapsedTime();
      this.saveScore(time);
    }
  }

  saveScore(time) {
    fetch("save_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `time=${encodeURIComponent(time)}&difficulty=${encodeURIComponent(
        this.difficulty
      )}`,
    }).then((res) => {
      if (res.ok) {
        alert(`Результат (${time} с) збережено!`);
      } else {
        alert("Не вдалося зберегти результат.");
      }
    });
  }
}
