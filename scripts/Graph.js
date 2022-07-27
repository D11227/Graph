import GAME from './Globals.js';
import Vector from './utilities/Vector.js';

class Graph {
        constructor({ pos, offset, game }) {
                this.offset = offset;
                this.ctx = game.ctx;
                this.pos = pos.copy();
                this.fpos = pos.copy();
                this.axis = new Vector(450, 310);

                this.functions = [];
        }
        centerCamera() {
                this.offset.x = this.pos.x - (GAME.WIDTH_GAME / 2);
                this.offset.y = this.pos.y - (GAME.HEIGHT_GAME / 2);
        }
        panCamera(mouse, startPan) {
                this.pos.x -= (mouse.x - startPan.x);
                this.pos.y -= (mouse.y - startPan.y);
                this.centerCamera();
        }
        writeText(text, position, font = 'serif') {
                const width = this.ctx.measureText(text).width;
                this.ctx.save();
                this.ctx.font = font;
                this.ctx.textBaseline = 'top';
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(position.x - (width / 2), position.y - 5, width, 20);
                this.ctx.fillStyle = 'black';
                this.ctx.fillText(text, position.x, position.y);
                this.ctx.restore();
        }
        drawLine(start, end) {
                this.ctx.beginPath();
                this.ctx.moveTo(start.x, start.y);
                this.ctx.lineTo(end.x, end.y);
                this.ctx.stroke();
        }
        drawGrid(color = 'black', sizeGrid) {
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 1;
                for (let x = sizeGrid - (this.pos.x % sizeGrid) - sizeGrid - 0.5; x <= GAME.WIDTH_GAME; x += sizeGrid) {
                        this.drawLine(
                                { x: x, y: 0 },
                                { x: x, y: GAME.HEIGHT_GAME }
                        );
                }

                for (let y = sizeGrid - (this.pos.y % sizeGrid) - sizeGrid - 0.5; y <= GAME.HEIGHT_GAME; y += sizeGrid) {
                        this.drawLine(
                                { x: 0, y: y },
                                { x: GAME.WIDTH_GAME, y: y }
                        );
                }
        }
        drawNumberAxis(type) {
                const types = {
                        x: 'WIDTH_GAME',
                        y: 'HEIGHT_GAME'
                };

                this.ctx.textAlign = 'center';
                let f = Math.floor((this.axis[type] - this.offset[type]) / GAME.BIG_SIZE);
                let a = Math.floor(GAME.BIG_SIZE - (this.pos[type] % GAME.BIG_SIZE) - 0.5);

                /*
                        Actually at this moment i can't find any good Algorithm to show this grid better.
                        So, this is a temporary fix.
                */
                if (this.pos[type] < 0 || a === GAME.BIG_SIZE - 1) a -= GAME.BIG_SIZE;

                for (let i = f; a <= GAME[types[type]]; a += GAME.BIG_SIZE, --i)
                        if (i != 0)
                                this.writeText(
                                        (type == 'x') ? -i : i,
                                        (type === 'x')
                                        ? new Vector(a, this.axis.y - this.offset.y + 20)
                                        : new Vector(this.axis.x - this.offset.x - (this.ctx.measureText(i).width), a - 5)
                                );
        }
        drawNumbers() {
                this.ctx.font = '15px serif';

                this.drawNumberAxis('x');
                this.drawNumberAxis('y');

                this.writeText(0, new Vector(this.axis.x - this.offset.x - 10, this.axis.y - this.offset.y + 20))
        }
        render() {
                this.drawGrid('lightgrey', GAME.SMALL_SIZE);
                this.drawGrid('gray', GAME.BIG_SIZE);
                this.drawNumbers();

                this.ctx.strokeStyle = 'black';

                const axis_offset = this.axis.subtract(this.offset);
                this.drawLine(
                        { x: axis_offset.x, y: 0 },
                        { x: axis_offset.x, y: GAME.HEIGHT_GAME }
                );
                this.drawLine(
                        { x: 0, y: axis_offset.y },
                        { x: GAME.WIDTH_GAME, y: axis_offset.y }
                );
        }
}

export default Graph;
