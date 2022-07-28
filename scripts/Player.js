import GAME from './Globals.js';
import Vector from './utilities/Vector.js';
import { generatorColors } from './utilities/Utilities.js';

class Player {
        constructor({ name, pos, offset, game }) {
                this.name = name;
                this.pos = pos.copy();
                this.offset = offset;
                this.game = game;
                this.ctx = game.ctx;

                this.color = generatorColors();
                this.collision = false;
                this.function = (x) => 1/x;
        }
        checkCollisionWithMouse(mouse) {
                const n = mouse.subtract(this.pos.subtract(this.offset));

                const dist = n.getMagnitude();

                this.collision = !(dist > GAME.DIAMETER);
        }
        setFunction(func) {
                this.function = func;
        }
        getColor(a = 1) {
                return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${a})`;
        }
        renderName() {
                const width = this.ctx.measureText(this.name).width;
                const player_offset = this.pos.subtract(this.offset);

                this.ctx.save();
                this.ctx.font = '15px Roboto';
                this.ctx.textBaseline = 'top';
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.fillRect(player_offset.x - (width / 2), player_offset.y - 2 * GAME.DIAMETER - 5, width, 20);
                this.ctx.fillStyle = this.getColor();
                this.ctx.fillText(this.name, player_offset.x, player_offset.y - 2*  GAME.DIAMETER);
                this.ctx.restore();
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

                const current_position = this.pos.subtract(this.game.graph.axis);
                const dividedByScale = (a) => a / GAME.SCALE;
                const render = (x) => {
                        // y(x) = scale(f(x) - f(x0) - y/scale)
                        const y = GAME.SCALE *
                                (
                                        this.function(dividedByScale(x)) -
                                        this.function(dividedByScale(current_position.x)) -
                                        (dividedByScale(current_position.y))
                                );
                        const position = new Vector(
                                this.game.graph.axis.x + x - this.offset.x,
                                this.game.graph.axis.y - y - this.offset.y
                        );
                        if (x === current_position.x) this.ctx.moveTo(position.x, position.y);
                        else this.ctx.lineTo(position.x, position.y);
                }

                if (current_position.x < 0)
                        for (let x = current_position.x; x <= 0; ++x)
                                render(x);
                else
                        for (let x = current_position.x; x >= 0; --x)
                                render(x);

                this.ctx.stroke();
        }
        render() {
                if (this.function)
                        this.renderFunction();
                this.renderPlayer();
                this.renderName();
        }
}

export default Player;
