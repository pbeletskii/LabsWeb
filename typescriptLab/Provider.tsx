import * as React from "react";
import produce from "immer";

const { useReducer, createContext, useEffect } = React;

interface Todo {
  text: string;
  id: number;
  completed: boolean;
}

interface Draft {
  todos: Todo[];
  id: number;
}

interface State {
  todos?: Todo[];
  id?: number;
}

type Actions =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "CLEAR_TODOS" }
  | { type: "TOGGLE_TODO_COMPLETED"; payload: Todo };

const todosReducer = produce((draft: Draft, action: Actions) => {
  switch (action.type) {
    case "SET_TODOS":
      draft.todos = action.payload;
      break;
    case "ADD_TODO":
      const todo: Todo = {
        text: action.payload,
        id: draft.id,
        completed: false
      };
      draft.todos.push(todo);
      draft.id = draft.id + 1;
      break;
    case "DELETE_TODO":
      draft.todos = draft["todos"].filter(el => el.id !== action.payload);
      break;
    case "CLEAR_TODOS":
      draft.todos = [];
      break;
    case "TOGGLE_TODO_COMPLETED":
      const todoIdx = draft.todos.findIndex(el => el.id === action.payload.id);
      draft.todos[todoIdx].completed = !draft.todos[todoIdx].completed;
  }
});

const initialState: Draft = {
  todos: [],
  id: 0
};

interface Props {
  children: React.ReactNode;
}

let context;

export default function Provider(props: Props) {
  context = createContext<{ state: State; dispatch: () => void }>({
    state: {},
    dispatch: () => {}
  });
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const todos: string = window.localStorage.getItem("todos");
    dispatch({ type: "SET_TODOS", payload: JSON.parse(todos) || [] });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <>
      <context.Provider value={{ state, dispatch }}>
        {props.children}
      </context.Provider>
    </>
  );
}

export { context };
