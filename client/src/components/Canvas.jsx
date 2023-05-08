import React, { useEffect, useRef } from "react";
import "../style/canvas.css";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Modal from "./Modal"
import { useParams } from "react-router-dom";

export const color = () => {
  const back = ["white"];
  return back[0];
}

const Canvas = observer(() => {
  const canvasRef = useRef();
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:3000/`);
      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(JSON.stringify( {
          id: params.id,
          username: canvasState.username,
          method: "connection"
        }))
      }
      socket.onmessage = (event) => {
        console.log(event.data)
      }
    }
  }, [canvasState.username]);

  const mouseDownHandler= () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className="canvas">
        <Modal/>
        <canvas onMouseDown={() => mouseDownHandler()} style={{backgroundColor: color()}} ref={canvasRef} width={800} height={600}/>
    </div>
  );
});

export default Canvas;