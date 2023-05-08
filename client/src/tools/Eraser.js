import Brush from "./Brush";
import {color} from "../components/Canvas";

export default class Eraser extends Brush {

    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = color();
        this.ctx.stroke();
    }
}