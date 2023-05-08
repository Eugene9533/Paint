import React, { useRef } from "react";
import "../style/modal.css";
import canvasState from "../store/canvasState";

const Modal = (() => {

    const usernameRef = useRef();

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        if(usernameRef.current.value) document.querySelector('.canvas').firstChild.remove();
    }

    return (
    <div className = "back">
        <div className="modal">
            <div className="header">
                <h2>Введите ваше имя</h2>
            </div>
            <div className="body">
                <input type="text" maxlength="20" required ref={usernameRef}/>
            </div>
            <hr className="mline"/>
            <div className="btn">
                <button onClick={() => connectHandler()} >Войти</button>
            </div>
        </div>
    </div>
    );
  });
  
  export default Modal;