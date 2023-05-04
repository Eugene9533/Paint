import React, { useEffect, useRef } from "react";
import "../style/canvas.css";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

export const color = () => {
  const back = ["white"];
  return back[0];
}

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler= () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className="canvas">
        <canvas 
          onMouseDown={() => mouseDownHandler()}
          style={{backgroundColor: color()}} 
          ref={canvasRef} 
          width={800} 
          height={600}/>
    </div>
  );
});

export default Canvas;