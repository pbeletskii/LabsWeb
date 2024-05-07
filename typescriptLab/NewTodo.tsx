import * as React from "react";
import { context } from "./Provider";

const { useState, useContext } = React;

export default function NewTodo() {
  const [todo, setTodo] = useState("");
  const { dispatch } = useContext(context);

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: "ADD_TODO", payload: todo });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  return (
    <>
      <input
        type="text"
        value={todo}
        onChange={e => setTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Add</button>
    </>
  );
}
