import {Navigate} from "react-router-dom";
import {ToDoList} from "../pages/ToDoList";
import {UpdateTodoForm} from "../components/UpdateTodoForm/UpdateTodoForm";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export interface IRoute {
  path: string,
  element: JSX.Element
}

export enum RouteNames {
  LOGIN_ROUTE = '/login',
  REGISTER_ROUTE = '/register',
  TO_DO_LIST_ROUTE = '/todo-list',
  UPDATE_TODO_ROUTE = '/update-todo',
  CREATE_TODO_ROUTE = '/create-todo',
  HOME_ROTE= '/'
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN_ROUTE, element: <Login/>},
  {path: RouteNames.REGISTER_ROUTE, element: <Register/>},
  {path: '*', element: <Navigate to={RouteNames.LOGIN_ROUTE}/>}
]

export const privateRoutes: IRoute[] = [
  {path: RouteNames.TO_DO_LIST_ROUTE, element: <ToDoList/>},
  {path: RouteNames.UPDATE_TODO_ROUTE, element: <UpdateTodoForm/>},
  {path: RouteNames.CREATE_TODO_ROUTE, element: <UpdateTodoForm/>},
  {path: '*', element: <Navigate to={RouteNames.TO_DO_LIST_ROUTE}/>}
]