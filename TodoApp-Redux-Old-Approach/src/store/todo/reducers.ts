import { v1 as uuid } from "uuid";
import { Todo } from "../../App/App";
import {
  CREATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SelectedTodoActionType,
  SELECT_TODO,
  TodoActionTypes,
  TOGGLE_TODO,
} from "./actions";

const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false,
  },
];

export const todosReducer = (
  state: Todo[] = todosInitialState,
  action: TodoActionTypes
) => {
  switch (action.type) {
    case CREATE_TODO: {
      return [...state, action.payload];
    }
    case EDIT_TODO: {
      let { id, desc } = action.payload;
      return state.map((todo) => (todo.id === id ? { ...todo, desc } : todo));
    }
    case TOGGLE_TODO: {
      let { id, isComplete } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !isComplete } : todo
      );
    }
    case DELETE_TODO: {
      let { id } = action.payload;
      return state.filter((todo) => todo.id === id);
    }
    default:
      return state;
  }
};

export const selectedTodoReducer = (
  state: Todo | null = null,
  action: SelectedTodoActionType
) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload.id;
    default:
      return state;
  }
};

export const counterReducer = (state: number = 0, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO:
      return state + 1;
    case DELETE_TODO:
      return state + 1;
    case EDIT_TODO:
      return state + 1;
    case TOGGLE_TODO:
      return state + 1;
    default:
      return state;
  }
};
