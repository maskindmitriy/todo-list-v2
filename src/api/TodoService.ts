import axios, {AxiosResponse} from "axios";
import {ITodo, TodoResponse} from "../models/ITodo";

export class TodoService {
  private static url = 'https://' + process.env.REACT_APP_FIREBASE_DB_URL;

  static async setTodo(todo: ITodo, username: string): Promise<AxiosResponse> {
    return axios.post(`${this.url}/todos.json`, {author: username, todo})
  }

  static async getTodos(): Promise<AxiosResponse> {
    return axios.get(`${this.url}/todos.json`)
  }

  static async deleteTodo(id: string): Promise<AxiosResponse> {
    return axios.delete(`${this.url}/todos/${id}.json`)
  }

  static async updateTodo(todo: ITodo, username: string): Promise<AxiosResponse> {
    return axios.put(`${this.url}/todos/${todo.id}.json`, {author: username, todo})
  }
}