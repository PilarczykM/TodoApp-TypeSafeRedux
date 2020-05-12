import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { counterSlice } from "./counter/slices";
import { selectedTodoSlice, todosSlice } from "./todo/slices";

const reducer = {
  todos: todosSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
  counter: counterSlice.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({
  reducer,
  middleware,
});
