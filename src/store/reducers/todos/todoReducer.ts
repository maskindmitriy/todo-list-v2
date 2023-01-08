import {ToDoAction, TodoActionEnum, TodoState} from "./types";
import {ITodo} from "../../../models/ITodo";

// const todos: ITodo[] = [
//   {id: '1', description: 'Собрать раму', domain: 'работа', priority: '1', isDone: false},
//   {id: '2', description: 'Послушать музыку', domain: 'отдых', priority: '3', isDone: false},
//   {id: '3', description: 'Сделать тест Купера', domain: 'спорт', priority: '2', isDone: false},
// ];

const initialState: TodoState = {
  todos: [],
  error: '',
  isLoading: false,
  todo: {} as ITodo,
  selectedTodo: {} as ITodo
}

export default function todoReducer(state = initialState, action: ToDoAction): TodoState {
  switch (action.type) {
    case TodoActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case TodoActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    case TodoActionEnum.SET_TODOS:
      return {...state, todos: action.payload}
    case TodoActionEnum.SELECT_TODO:
      return {...state, selectedTodo: action.payload}
    case TodoActionEnum.ADD_TODO: {
      return {...state, todos: [...state.todos, action.payload]}
    }
    case TodoActionEnum.UPDATE_TODO: {
      const oldTodo = state.todos.find(todo => todo.id === action.payload.id)
      const newTodos = state.todos.filter(todo => todo.id !== oldTodo!.id)
      newTodos.push(action.payload)
      return {...state, todos: newTodos}
    }
    case TodoActionEnum.REMOVE_TODO: {
      return {...state, todos: state.todos.filter(todo => todo.id !== action.payload) }
    }
    default:
      return state
  }
}