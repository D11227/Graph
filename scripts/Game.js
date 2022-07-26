import GAME from './Globals.js';

import Graph from './Graph.js';
import Player from './Player.js';
import Vector from './utilities/Vector.js';

class Game {
        constructor() {
                this.players = [];
                this.canvas = document.getElementById('canvas');
                this.ctx = this.canvas.getContext('2d');

                this.lastTickLength = 1;
                this.tickLengthArray = [];
                this.lastTimestamp = Date.now();
                this.start_time = 0;

                this.clicked = false;
                this.mousePos = new Vector();
                this.startPan = new Vector();
                this.offset = new Vector();

                this.graph = new Graph({
                        pos: new Vector(450, 350),
                        offset: this.offset,
                        game: this
                });
                this.player = new Player({
                        pos: new Vector(300, 480),
                        offset: this.offset,
                        game: this
                });
        }
        start() {
                window.setTimeout(() => {
                    this.start_time = Date.now();
                    this.graph.centerCamera();
                    this.tick();
                }, 1000);
        }
        mouseEvents() {
                this.canvas.onmousedown = (event) => {
                        this.clicked = true;
                        this.startPan = this.getMousePos(event);
                }
                this.canvas.onmousemove = (event) => {
                        this.mousePos = this.getMousePos(event);
                        if (!this.clicked) return;
                        this.graph.panCamera(this.mousePos, this.startPan);
                        this.startPan = this.mousePos.copy();
                }
                this.canvas.onmouseup = (event) => this.clicked = false;
                this.player.checkCollisionWithMouse(this.mousePos);
        }
        getMousePos(event) {
                const rect = this.canvas.getBoundingClientRect();
                return new Vector(
                        event.clientX - rect.left,
                        event.clientY - rect.top
                );
        }
        render() {
                this.graph.render();
                this.player.render();
        }
        update() {
                this.mouseEvents();
        }
        tick() {
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(0, 0, GAME.WIDTH_GAME, GAME.HEIGHT_GAME);
                let lastTickLength = Date.now() - this.lastTimestamp;
                this.lastTimestamp = Date.now();
                this.tickLengthArray.push(lastTickLength);
                if (this.tickLengthArray.length > 30) {
                    this.tickLengthArray.splice(0, 1);
                }

                let timeSum = 0;
                for (let i = 0; i < this.tickLengthArray.length; i++) {
                    timeSum += this.tickLengthArray[i];
                }

                let timeAverage = timeSum / 30;
                let fps = 1000 / timeAverage;
                if (fps < 30) {
                    fps = 30;
                }

                //fpsCoefficient = 144 / fps;

                this.render();
                this.update();

                window.requestAnimationFrame(this.tick.bind(this));
        }
}

export default Game;
