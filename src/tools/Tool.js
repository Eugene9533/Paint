export default class Tool {
    constructor(canvas, socket, id) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
        this.destroyEvents();
        this.ctx.globalCompositeOperation = 'source-over';
    }

    set fillStyle(color){
        this.ctx.fillStyle = color;
    }

    set strokeStyle(color){
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width){
        this.ctx.lineWidth = width;
    }

    destroyEvents(){
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}