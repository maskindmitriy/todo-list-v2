import {SelectTodo, SetError, SetIsLoading, SetTodos, TodoActionEnum} from "./types";
import {ITodo} from "../../../models/ITodo";
import {AppDispatch} from "../../index";
import {TodoService} from "../../../api/TodoService";
import {mapResponseToTasks} from "../../../utils/utils";

export const TodoActionCreators = {
  SetIsLoading: (isLoading: boolean): SetIsLoading => ({
    type: TodoActionEnum.SET_IS_LOADING, payload: isLoading
  }),
  SetError: (error: string): SetError => ({
    type: TodoActionEnum.SET_ERROR, payload: error
  }),
  SelectTodo: (todo: ITodo): SelectTodo => ({
    type: TodoActionEnum.SELECT_TODO, payload: todo
  }),
  SetTodos: (todos: ITodo[]): SetTodos => ({
    type: TodoActionEnum.SET_TODOS, payload: todos
  }),
  SetTodo: (todo: ITodo): any => async (dispatch: AppDispatch) => {
    dispatch(TodoActionCreators.SetIsLoading(true))
    const username = localStorage.getItem('username')
    TodoService.setTodo(todo, username!).then(res => {
      const newTodo = {...todo, id: res.data.name}
      dispatch({type: TodoActionEnum.ADD_TODO, payload: newTodo})
    }).catch(e => {
      dispatch(TodoActionCreators.SetError(e))
    }).finally(() => {
      dispatch(TodoActionCreators.SetIsLoading(false))
    })
  },
  getTodos: (): any => async (dispatch: AppDispatch) => {
    dispatch(TodoActionCreators.SetIsLoading(true))
    TodoService.getTodos().then((res) => {
      const todos = mapResponseToTasks(res.data)
      if (todos.length === 0)
        dispatch(TodoActionCreators.SetTodos([]))
      else
        dispatch(TodoActionCreators.SetTodos(todos))
    }).catch(e => {
      dispatch(TodoActionCreators.SetError(e))
    }).finally(() => {
      dispatch(TodoActionCreators.SetIsLoading(false))
    })
  },
  deleteTodo: (id: string): any => async (dispatch: AppDispatch) => {
    dispatch(TodoActionCreators.SetIsLoading(true))
    TodoService.deleteTodo(id).then(() => {
      dispatch({type: TodoActionEnum.REMOVE_TODO, payload: id})
    }).catch(e => {
      dispatch(TodoActionCreators.SetError(e))
    }).finally(() => {
      dispatch(TodoActionCreators.SetIsLoading(false))
    })
  },
  updateTodo: (todo: ITodo): any => async (dispatch: AppDispatch) => {
    dispatch(TodoActionCreators.SetIsLoading(true))
    const username = localStorage.getItem('username')
    TodoService.updateTodo(todo, username!).then(() => {
      dispatch({type: TodoActionEnum.UPDATE_TODO, payload: todo})
    }).catch(e => {
      dispatch(TodoActionCreators.SetError(e))
    }).finally(() => {
      dispatch(TodoActionCreators.SetIsLoading(false))
    })
  }
}