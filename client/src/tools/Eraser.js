import Brush from "./Brush";
import {color} from "../components/Canvas";

export default class Eraser extends Brush {

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.ctx.globalCompositeOperation = 'destination-out';
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify( {
                method: "draw",
                id: this.id,
                figure: {
                    type: "eraser",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    line: this.ctx.lineWidth
                }
            }));
        }
    }

    static draw(ctx, x, y, line) {
        ctx.lineWidth = line;
        ctx.lineTo(x, y);
        ctx.strokeStyle = "white" /*color()*/;
        ctx.stroke();
    }
}