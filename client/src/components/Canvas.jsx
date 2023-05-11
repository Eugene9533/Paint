import React, { useEffect, useRef } from "react";
import "../style/canvas.css";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Modal from "./Modal"
import { useParams } from "react-router-dom";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import axios from "axios";

export const color = () => {
  const back = ["white"];
  return back[0];
}

const Canvas = observer(() => {
  const canvasRef = useRef();
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext('2d');
    axios.get(`http://localhost:5000/image?id=${params.id}`)
      .then(response => {
        const img = new Image();
        img.src = response.data
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      })
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(JSON.stringify( {
          id: params.id,
          username: canvasState.username,
          method: "connection",
        }))
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
            case "connection":
                console.log(`пользователь ${msg.username} присоединился`);
                break
            case "draw":
                drawHandler(msg)
                break
        }
      }
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.fill, figure.stroke, figure.line);
        break;
      case "rect":
        Rect.staticDrawRect(ctx, figure.x, figure.y, figure.width, figure.height, figure.fill, figure.stroke, figure.line);
        break;
      case "circle":
        Circle.staticDrawCircle(ctx, figure.x, figure.y, figure.radius, figure.fill, figure.stroke, figure.line);
        break;
      case "line":
        Line.staticDrawLine(ctx, figure.x, figure.y, figure.stx, figure.sty, figure.fill, figure.stroke, figure.line);
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.line);
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  }

  const mouseDownHandler= () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
      .then(response => console.log(response.data))
  }

  return (
    <div className="canvas">
        <Modal/>
        <canvas onMouseDown={() => mouseDownHandler()} onMouseUp={() => mouseDownHandler()} style={{backgroundColor: color()}} ref={canvasRef} width={800} height={600}/>
    </div>
  );
});

export default Canvas;