import React from "react";
import "../style/toolbar.css";
import SettingBar from "./SettingBar";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

function Toolbar() {

  const changeColor = e => {
    toolState.setStrokeStyle(e.target.value);
    toolState.setFillStyle(e.target.value);
  }

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function togg(a) {
    let btn = document.getElementsByClassName("toolbar__btn");
    for (let i = 0; i < 5; i++) {
      if (btn[i].classList.contains("select")) btn[i].classList.toggle("select");
    }
    a.classList.add("select");
  }

  function link () {
    let url = window.location.href;
    navigator.clipboard.writeText(url)
    alert("Ссылка для приглашения")
  }

  function warning() {
    let warningWindow = document.createElement("div");
    warningWindow.className = "warningWindow";
    warningWindow.innerHTML = "<p>Кисть и онлайн режим работают \n только при наличии сервера</p>"
    document.body.appendChild(warningWindow);
  }

  function warningDel() {
    let warning = document.querySelector(".warningWindow");
    document.body.removeChild(warning);
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={(i) => {toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid)); togg(i.target);}} onMouseOver={() => warning()} onMouseOut={() => warningDel()}/>
      <button className="toolbar__btn rect" onClick={(i) => {toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid)); togg(i.target);}}/>
      <button className="toolbar__btn circle" onClick={(i) => {toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid)); togg(i.target);}}/>
      <button className="toolbar__btn eraser" onClick={(i) => {toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid)); togg(i.target);}}/>
      <button className="toolbar__btn line" onClick={(i) => {toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid)); togg(i.target);}}/>
      <input className="toolbar__btn" onChange={e => changeColor(e)} style={{marginLeft:10}} type="color"/>
      <SettingBar />
      <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
      <button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>
      <button className="toolbar__btn copy" onClick={() => link()} />
      <button className="toolbar__btn save" onClick={() => download()}/>
    </div>
  );
}

export default Toolbar;