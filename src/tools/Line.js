import Rect from "./Rect";

export default class Line extends Rect {

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.draw(this.startX, this.startY, currentX, currentY);
        }
    }

    draw(stx, sty, x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo (stx, sty);
            this.ctx.lineTo (x, y);
            this.ctx.stroke();
        }
    }
}