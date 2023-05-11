import Rect from "./Rect";

export default class Line extends Rect {

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify( {
            method: "draw",
            id: this.id,
            figure: {
                type: "line",
                x: this.startX,
                y: this.startY,
                stx: this.currentX,
                sty: this.currentY,
                fill: this.ctx.fillStyle,
                stroke: this.ctx.strokeStyle,
                line: this.ctx.lineWidth
            }
        }));
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.currentX = e.pageX - e.target.offsetLeft;
            this.currentY = e.pageY - e.target.offsetTop;
            this.draw(this.startX, this.startY, this.currentX, this.currentY);
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

    static staticDrawLine(ctx, stx, sty, x, y, fill, stroke, line) {
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = line;
        ctx.beginPath();
        ctx.moveTo (stx, sty);
        ctx.lineTo (x, y);
        ctx.stroke();
    }
}