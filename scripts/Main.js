import Game from './Game.js';

var game = null;

window.onload = () => {
        game = new Game();
        game.start();
}
