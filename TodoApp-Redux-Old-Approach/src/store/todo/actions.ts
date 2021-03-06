import { v1 as uuid } from "uuid";
import { Todo } from "./types";

export const CREATE_TODO = "todo/CREATE_TODO";
export const EDIT_TODO = "todo/EDIT_TODO";
export const TOGGLE_TODO = "todo/TOGGLE_TODO";
export const DELETE_TODO = "todo/DELETE_TODO";
export const SELECT_TODO = "todo/SELECT_TODO";

interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: { id: string; desc: string };
}
export const editTodoActionCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): EditTodoActionType => {
  return {
    type: EDIT_TODO,
    payload: { id, desc },
  };
};

interface ToggleTodoActionType {
  type: typeof TOGGLE_TODO;
  payload: { id: string; isComplete: boolean };
}
export const toggleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): ToggleTodoActionType => {
  return {
    type: TOGGLE_TODO,
    payload: { id, isComplete },
  };
};

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: { id: string };
}
export const deleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): DeleteTodoActionType => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string };
}
export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): SelectTodoActionType => {
  return {
    type: SELECT_TODO,
    payload: { id },
  };
};

export type TodoActionTypes =
  | CreateTodoActionType
  | EditTodoActionType
  | DeleteTodoActionType
  | ToggleTodoActionType;

export type SelectedTodoActionType = SelectTodoActionType;
