import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectBox from "./components/ProjectBox/ProjectBox";
import { ProjectLine } from "./components/ProjectLine/ProjectLine";

function App() {
  return (
    <div className="App">
      <ProjectLine />
      <ProjectLine />
      <ProjectLine />
    </div>
  );
}

export default App;
