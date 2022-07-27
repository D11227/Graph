import GAME from './Globals.js';
import Vector from './utilities/Vector.js';
import { generatorColors } from './utilities/Utilities.js';

class Player {
        constructor({ pos, offset, game}) {
                this.pos = pos.copy();
                this.offset = offset;
                this.game = game;
                this.ctx = game.ctx;

                this.color = generatorColors();
                this.collision = false;
                this.function = (x) => 1/Math.abs(x);
        }
        checkCollisionWithMouse(mouse) {
                const n = mouse.subtract(this.pos.subtract(this.offset));

                const dist = n.getMagnitude();

                this.collision = !(dist > GAME.DIAMETER);
        }
        changeFunction(func) {
                this.function = func;
        }
        getColor(a = 1) {
                return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${a})`;
        }
        renderPlayer() {
                const player_offset = this.pos.subtract(this.offset);
                this.ctx.beginPath();
                this.ctx.arc(player_offset.x, player_offset.y, GAME.RADIUS, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = this.getColor();
                this.ctx.fill();
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = this.getColor(this.collision ? 0.7 : 0.2);
                this.ctx.stroke();
        }
        renderFunction() {
                this.ctx.beginPath();
                this.ctx.lineWidth = 3.5;
                this.ctx.strokeStyle = this.getColor(0.5);

                let current_position = this.pos.subtract(this.game.graph.axis), y;
                if (current_position.x < 0) for (let x = current_position.x; x <= 0; ++x) {
                        y = GAME.BIG_SIZE * (this.function(x / GAME.BIG_SIZE) - this.function(current_position.x / GAME.BIG_SIZE) - (current_position.y / GAME.BIG_SIZE));
                        if (x == current_position.x) this.ctx.moveTo(this.game.graph.axis.x + x - this.offset.x, this.game.graph.axis.y - y - this.offset.y);
                        else this.ctx.lineTo(this.game.graph.axis.x + x - this.offset.x, this.game.graph.axis.y - y - this.offset.y);
                }
                else for (let x = current_position.x; x >= 0; --x) {
                        y = GAME.BIG_SIZE * (this.function(x / GAME.BIG_SIZE) - this.function(current_position.x / GAME.BIG_SIZE) - (current_position.y / GAME.BIG_SIZE));
                        if (x == current_position.x) this.ctx.moveTo(this.game.graph.axis.x + x - this.offset.x, this.game.graph.axis.y - y - this.offset.y);
                        else this.ctx.lineTo(this.game.graph.axis.x + x - this.offset.x, this.game.graph.axis.y - y - this.offset.y);
                }

                this.ctx.stroke();
        }
        render() {
                this.renderFunction();
                this.renderPlayer();
        }
}

export default Player;
