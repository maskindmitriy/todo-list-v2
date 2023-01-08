import {ITodo} from "../models/ITodo";
import { IUser } from "../models/IUser";

export const mapResponseToTasks = (response: any): ITodo[] => {
  const username = localStorage.getItem('username')

  // response = Object.keys(response).filter(key => key.author === username)

  // return Object.keys(response).map(key => {
  //   return {
  //     ...response[key].todo,
  //     id: key
  //   }
  // })
  return Object.keys(response).reduce((filtered: ITodo[], key) => {
    if (response[key].author === username) {
      const newTodo = {...response[key].todo, id: key}
      filtered.push(newTodo)
    }
    return filtered
  }, [])
}

export const mapResponseToUsers = (response: any): IUser[] => {
  return Object.keys(response).map(key => {
    return {
      ...response[key],
      id: key
    }
  })
}