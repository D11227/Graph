import Vector from './utilities/Vector.js';

class Graph {
        constructor({ width, height, pos, game }) {
                this.width = width;
                this.height = height;
                this.size = 20;
                this.bigSize = 100;
                this.offset = new Vector();
                this.ctx = game.ctx;
                this.pos = pos;
                this.fpos = new Vector(450, 350);
                this.axis = new Vector(450, 310);

                this.functions = [];
        }
        centerCamera() {
                this.offset.x = this.pos.x - (this.width / 2);
                this.offset.y = this.pos.y - (this.height / 2);
        }
        panCamera(mouse, startPan) {
                this.pos.x -= (mouse.x - startPan.x) * 0.2;
                this.pos.y -= (mouse.y - startPan.y) * 0.2;
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
                for (let x = sizeGrid - (this.pos.x % sizeGrid) - sizeGrid - 0.5; x <= this.width; x += sizeGrid) {
                        this.drawLine(
                                { x: x, y: 0 },
                                { x: x, y: this.height }
                        );
                }

                for (let y = sizeGrid - (this.pos.y % sizeGrid) - sizeGrid - 0.5; y <= this.height; y += sizeGrid) {
                        this.drawLine(
                                { x: 0, y: y },
                                { x: this.width, y: y }
                        );
                }
        }
        drawNumberAxis(type) {
                const types = {
                        x: 'width',
                        y: 'height'
                }
                this.ctx.textAlign = 'center';
                let f = Math.floor((this.axis[type] - this.offset[type]) / this.bigSize);
                let a = Math.floor(this.bigSize - (this.pos[type] % this.bigSize) - 0.5);

                /*
                        Actually at this moment i can't find any good Algorithm to show this grid better.
                        So, this is a temporary fix.
                */
                if (this.pos[type] < 0) a -= this.bigSize;

                for (let i = f; a <= this[types[type]]; a += this.bigSize, --i)
                        if (i != 0)
                                this.writeText(
                                        i,
                                        (type === 'x')
                                        ? new Vector(a, this.axis.y - this.offset.y + 20)
                                        : new Vector(this.axis.x - this.offset.x - 15, a)
                                );
        }
        drawNumbers() {
                this.ctx.font = '15px serif';

                this.drawNumberAxis('x');
                this.drawNumberAxis('y');

                this.writeText(0, new Vector(this.axis.x - this.offset.x - 10, this.axis.y - this.offset.y + 20))
        }
        render() {
                this.drawGrid('lightgrey', this.size);
                this.drawGrid('gray', this.bigSize);
                this.drawNumbers();

                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 3;

                const axis_offset = this.axis.subtract(this.offset);
                this.drawLine(
                        { x: axis_offset.x, y: 0 },
                        { x: axis_offset.x, y: this.height }
                );
                this.drawLine(
                        { x: 0, y: axis_offset.y },
                        { x: this.width, y: axis_offset.y }
                );
        }
}

export default Graph;
