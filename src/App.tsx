import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styles from "./app.module.css";
import { Input } from "./components/Input/Input";

function App() {
  return (
    <div className="App">
      <Input label="test" name="test" />
    </div>
  );
}

export default App;
