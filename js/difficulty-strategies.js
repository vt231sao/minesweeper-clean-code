export const EASY_ROWS = 9;
export const EASY_COLS = 9;
export const EASY_MINES = 10;
export const MEDIUM_ROWS = 16;
export const MEDIUM_COLS = 16;
export const MEDIUM_MINES = 40;
export const HARD_ROWS = 16;
export const HARD_COLS = 30;
export const HARD_MINES = 99;

export class DifficultyStrategy {
  configure(board) {
    throw new Error('Метод не реалізований');
  }
}

export class EasyDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = EASY_ROWS;
    board.cols = EASY_COLS;
    board.mines = EASY_MINES;
  }
}

export class MediumDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = MEDIUM_ROWS;
    board.cols = MEDIUM_COLS;
    board.mines = MEDIUM_MINES;
  }
}

export class HardDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = HARD_ROWS;
    board.cols = HARD_COLS;
    board.mines = HARD_MINES;
  }
}
