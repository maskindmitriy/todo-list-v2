import {ITodo} from "../../../models/ITodo";

export interface TodoState {
  todos: ITodo[],
  isLoading: boolean,
  error: string
  todo: ITodo
  selectedTodo: ITodo
}

export enum TodoActionEnum {
  SET_TODOS = 'SET_TODOS',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  ADD_TODO = 'ADD_TODO',
  SELECT_TODO = 'SELECT_TODO',
}

type Action<TodoActionEnum, P> = {
  type: TodoActionEnum,
  payload: P
}

export type SetTodos = Action<TodoActionEnum.SET_TODOS, ITodo[]>
export type SetIsLoading = Action<TodoActionEnum.SET_IS_LOADING, boolean>
export type SetError = Action<TodoActionEnum.SET_ERROR, string>
export type UpdateTodo = Action<TodoActionEnum.UPDATE_TODO, ITodo>
export type RemoveTodo = Action<TodoActionEnum.REMOVE_TODO, string>
export type AddTodo = Action<TodoActionEnum.ADD_TODO, ITodo>
export type SelectTodo = Action<TodoActionEnum.SELECT_TODO, ITodo>

export type ToDoAction = SetTodos | SetIsLoading | SetError | UpdateTodo | RemoveTodo | AddTodo | SelectTodo






