import React from "react";
import "./style/app.css";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/:id' element={<><Toolbar/><Canvas/></>} />
          <Route path='/' element={<><Toolbar/><Canvas/><Navigate to={`/f${(+new Date()).toString(16)}`} replace/></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
