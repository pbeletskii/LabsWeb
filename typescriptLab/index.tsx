import * as React from "react";
import { render } from "react-dom";

import Todo from "./Todo";
import Provider from "./Provider";

import "./styles.css";

function App() {
  return (
    <div className="container">
      <h1>Todo</h1>
      <Provider>
        <Todo />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);