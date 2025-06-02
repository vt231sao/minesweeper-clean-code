export class Board {
    constructor(difficultyStrategy, container, timer, difficultyName = 'easy') {
        this.difficultyStrategy = difficultyStrategy;
        this.container = container;
        this.timer = timer;
        this.difficultyName = difficultyName;
        this.observers = [];
        this.initBoard();
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(event = 'update') {
        this.observers.forEach(observer => observer(event, this));
    }

    initBoard() {
        this.difficultyStrategy.configure(this);
        // ... логіка ініціалізації ігрового поля ...
        this.notify('init');
    }

    setDifficulty(level) {
        // ... логіка вибору стратегії ...
        this.notify('difficultyChanged');
    }

    restart() {
        this.initBoard();
        this.notify('restart');
    }
}