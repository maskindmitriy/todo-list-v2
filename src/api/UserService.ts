import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {ITodo} from "../models/ITodo";

export class UserService {
  private static url = 'https://' + process.env.REACT_APP_FIREBASE_DB_URL;

  // static async getUsers(): Promise<AxiosResponse<IUser[]>> {
  //   return axios.get<IUser[]>('/users.json')
  // }

  static async registerUser(user: IUser): Promise<AxiosResponse<IUser>> {
    return axios.post(`${this.url}/users.json`, {...user})
  }

  static async getUsers(): Promise<AxiosResponse> {
    return axios.get(`${this.url}/users.json`)
  }
}

//забрать users.json, пройти по массиву, найти username текущего юзера, сравнить пароль, загрузить его todos в state.todos