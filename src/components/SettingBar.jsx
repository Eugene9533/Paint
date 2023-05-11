import React from "react";
import "../style/toolbar.css";
import toolState from "../store/toolState";

function SettingBar() {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Толщина линии:</label>
      <input 
        onChange={e => toolState.setLineWidth(e.target.value)}
        id="line-width" 
        type="number" 
        defaultValue={1} min={1} max={50} />
      <label htmlFor="stroke-style">Цвет обводки:</label>
      <input 
        onChange={e => toolState.setStrokeStyle(e.target.value)}
        id="stroke-style" 
        type="color" 
        defaultValue={1} min={1} max={50} />
    </div>
  );
}

export default SettingBar;