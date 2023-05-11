import Rect from "./Rect";

export default class Circle extends Rect {

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify( {
            method: "draw",
            id: this.id,
            figure: {
                type: "circle",
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                radius: this.radius,
                fill: this.ctx.fillStyle,
                stroke: this.ctx.strokeStyle,
                line: this.ctx.lineWidth
            }
        }));
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.radius = Math.sqrt(this.width**2 + this.height**2);
            this.draw(this.startX, this.startY, this.radius);
        }
    }
    
    draw(x, y, radius) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc (x, y, radius, 0, 2 * Math.PI)
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    static staticDrawCircle(ctx, x, y, radius, fill, stroke, line) {
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = line;
        ctx.beginPath();
        ctx.arc (x, y, radius, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
    }
}