import { GameTimer } from './timer.js';
import { Board } from './board.js';
import { EasyDifficulty, MediumDifficulty, HardDifficulty } from './difficulty-strategies.js';
import { Renderer } from './renderer.js';

const gameContainer = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
const timer = new GameTimer(timerDisplay);
let game = new Board(new EasyDifficulty(), gameContainer, timer, 'easy');

game.subscribe(() => {
    Renderer.draw(game, gameContainer, (row, col) => {/* handle left click */}, (row, col) => {/* handle right click */});
});

document.querySelectorAll('#difficulty button').forEach(button => {
    button.addEventListener('click', () => {
        const level = button.dataset.difficulty;
        game.setDifficulty(level);
    });
});

document.getElementById("restart").addEventListener("click", () => {
    game.restart();
});

window.onload = () => game.restart();
