export class GameTimer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.startTime = null;
        this.intervalId = null;
    }

    start() {
        this.startTime = Date.now();
        this.intervalId = setInterval(() => this.updateDisplay(), 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    reset() {
        this.stop();
        this.startTime = null;
        this.updateDisplay(0);
    }

    getElapsedTime() {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    updateDisplay() {
        if (!this.startTime) {
            this.displayElement.textContent = "⏱ Час: 0 с";
        } else {
            const seconds = this.getElapsedTime();
            this.displayElement.textContent = `⏱ Час: ${seconds} с`;
        }
    }
}
