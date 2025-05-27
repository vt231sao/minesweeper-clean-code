export class GameTimer {
  constructor(displayElement, onTickCallback = null) {
    this.displayElement = displayElement;
    this.onTickCallback = onTickCallback;
    this.startTime = null;
    this.intervalId = null;
    this.paused = false;
    this.elapsedBeforePause = 0;
  }

  start() {
    this.startTime = Date.now() - this.elapsedBeforePause * 1000;
    this.intervalId = setInterval(() => this.updateDisplay(), 1000);
    this.paused = false;
    console.log("⏱ Таймер запущено");
  }

  pause() {
    if (!this.paused) {
      clearInterval(this.intervalId);
      this.elapsedBeforePause = this.getElapsedTime();
      this.paused = true;
      console.log("⏸ Таймер на паузі");
    }
  }

  resume() {
    if (this.paused) {
      this.start();
      console.log("▶️ Таймер відновлено");
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.startTime = null;
    this.elapsedBeforePause = 0;
    this.paused = false;
    console.log("⏹ Таймер зупинено");
  }

  reset() {
    this.stop();
    this.updateDisplay(0);
    console.log("🔄 Таймер скинуто");
  }

  getElapsedTime() {
    if (!this.startTime) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  updateDisplay() {
    const seconds = this.getElapsedTime();
    const formatted = this.formatTime(seconds);
    this.displayElement.textContent = `⏱ Час: ${formatted}`;

    if (typeof this.onTickCallback === "function") {
      this.onTickCallback(seconds);
    }
  }
}
