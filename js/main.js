import { GameTimer } from './timer.js';
import { Board } from './board.js';
import { EasyDifficulty, MediumDifficulty, HardDifficulty } from './difficulty-strategies.js';

const gameContainer = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
const timer = new GameTimer(timerDisplay);
let game = new Board(new EasyDifficulty(), gameContainer, timer, 'easy');

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
