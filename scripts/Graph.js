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
                this.axis = new Vector(
                        (this.width / 2) / this.size * this.size,
                        (this.height / 2) / this.size * this.size
                );

                this.functions = [];
        }
        centerCamera(vector) {
                this.offset.x = vector.x - (this.width / 2);
                this.offset.y = vector.y - (this.height / 2);
        }
        writeText(text, position) {
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(position.x - 6, position.y - 15, 15, 20);
                this.ctx.fillStyle = 'black';
                this.ctx.fillText(text, position.x, position.y);
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
        drawNumber(type) {
                const types = {
                        x: 'width',
                        y: 'height'
                }
                let f = Math.floor((this.axis[type] - this.offset[type]) / this.bigSize);
                if (f >= (this[types[type]] / this.bigSize)) --f;
                for (let a = this.bigSize - (this.pos[type] % this.bigSize) - this.bigSize - 0.5, i = f + 1; a <= this[types[type]]; a += this.bigSize, --i)
                        if (i != 0) this.writeText(i, (type === 'x') ? new Vector(a, this.axis.y - this.offset.y + 20) : new Vector(this.axis.x - this.offset.x - 15, a))
        }
        drawNumbers() {
                this.ctx.font = '15px serif';
                this.ctx.textAlign = 'center';
                // let rows = Math.floor((this.axis.x - this.offset.x) / this.bigSize);
                // if (rows >= (this.width / this.bigSize)) --rows;
                // for (let x = this.bigSize - (this.pos.x % this.bigSize) - this.bigSize - 0.5, i = rows + 1; x <= this.width; x += this.bigSize, --i)
                //         if (i != 0) this.writeText(i, new Vector(x, this.axis.y - this.offset.y + 20))
                this.drawNumber('x');
                this.drawNumber('y');

                // let cols = Math.floor((this.axis.y - this.offset.y) / this.bigSize);
                // if (cols >= (this.height / this.bigSize)) --cols;
                // for (let y = this.bigSize - (this.pos.y % this.bigSize) - this.bigSize - 0.5, i = cols + 1; y <= this.height; y += this.bigSize, --i)
                //         if (i != 0) this.writeText(i, new Vector(this.axis.x - this.offset.x - 15, y))

                this.writeText(0, new Vector(this.axis.x - this.offset.x - 15, this.axis.y - this.offset.y + 20))
        }
        render() {
                this.centerCamera(this.pos);

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
