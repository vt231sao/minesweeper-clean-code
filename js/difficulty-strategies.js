export class DifficultyStrategy {
  configure(board) {
    throw new Error('Метод не реалізований');
  }
}

export class EasyDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = 9;
    board.cols = 9;
    board.mines = 10;
  }
}

export class MediumDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = 16;
    board.cols = 16;
    board.mines = 40;
  }
}

export class HardDifficulty extends DifficultyStrategy {
  configure(board) {
    board.rows = 16;
    board.cols = 30;
    board.mines = 99;
  }
}
