import GAME from './Globals.js';

class Player {
        constructor({ pos, offset, game}) {
                this.pos = pos.copy();
                this.offset = offset;
                this.ctx = game.ctx;

                this.color = '#265bbd';
                this.collision = false;
                this.function = (x) => -2*x;
        }
        checkCollisionWithMouse(mouse) {
                const n = mouse.subtract(this.pos.subtract(this.offset));

                const dist = n.getMagnitude();

                this.collision = !(dist > GAME.DIAMETER);
        }
        render() {
                const player_offset = this.pos.subtract(this.offset);
                this.ctx.beginPath();
                this.ctx.arc(player_offset.x, player_offset.y, GAME.RADIUS, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = this.color;
                this.ctx.fill();
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = `rgba(29, 70, 145, ${this.collision ? '0.5' : '0.2'})`;
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.strokeStyle = 'rgba(29, 70, 145, 0.2)';

                // let dx = 4, scale = 40;
                // this.ctx.beginPath();
                // this.ctx.strokeStyle = 'green';
                // for (let i = 80; i <= 350 + 100; ++i) {
                //         let x = dx*i;
                //         let y = this.function(x/scale) * scale;
                //         if (x == 80) this.ctx.moveTo(x - this.offset.x, this.pos.y + y - this.offset.y);
                //         else this.ctx.lineTo(x - this.offset.x, this.pos.y + y - this.offset.y);
                // }
                //
                // this.ctx.stroke();
        }
}

export default Player;
