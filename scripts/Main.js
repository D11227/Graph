import Game from './Game.js';
import { GAME } from './Globals.js';

function lobby() {
        document.body.innerHTML += `
                <div id="lobby">
                        <div class="list_games">
                                <div class="title">
                                        <h1>Games</h1>
                                </div>
                                <div class="list">
                                        <ul>
                                                <li>Game 1 [1 / 2]</li>
                                                <li>Game 1 [1 / 2]</li>
                                                <li>Game 1 [1 / 2]</li>
                                        </ul>
                                </div>
                        </div>
                        <div class="list_chat">
                                <div class="list_messages">
                                        <h1>Chat</h1>
                                </div>
                                <input type="text" name="chat">
                        </div>
                        <div class="list_players">
                                <h1>Players</h1>
                        </div>
                </div>
        `;
}
window.onload = () => {
        lobby();
        GAME.game = new Game(true);
        GAME.game.start();
}
