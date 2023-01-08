import {IUser} from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string
}

export enum AuthActionEnum {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_USER = 'SET_USER',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR'
}

type Action<AuthActionEnum, P> = {
  type: AuthActionEnum,
  payload: P
}

export type SetUserAction = Action<AuthActionEnum.SET_USER, IUser>
export type SetIsAuthAction = Action<AuthActionEnum.SET_IS_AUTH, boolean>
export type SetIsLoadingAction = Action<AuthActionEnum.SET_IS_LOADING, boolean>
export type SetErrorAction = Action<AuthActionEnum.SET_ERROR, string>

export type AuthAction = SetUserAction | SetIsAuthAction | SetIsLoadingAction | SetErrorAction

