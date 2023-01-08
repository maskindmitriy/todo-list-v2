import {AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from '../../../models/IUser'
import {AppDispatch} from "../..";
import {UserService} from "../../../api/UserService";
import {mapResponseToUsers} from "../../../utils/utils";

export const AuthActionCreators = {
  setIsAuth: (isAuth: boolean): SetIsAuthAction => ({
    type: AuthActionEnum.SET_IS_AUTH, payload: isAuth
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR, payload: error
  }),
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER, payload: user
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING, payload: isLoading
  }),
  // login: (username: string, password: string) => async (dispatch: AppDispatch) => {
  //   try {
  //     dispatch(AuthActionCreators.setIsLoading(true))
  //     setTimeout(async () => {
  //       const response = await UserService.getUsers()
  //       const user = response.data.find(user =>
  //         user.username === username && user.password === password)
  //       if (user) {
  //         localStorage.setItem('auth', 'true')
  //         localStorage.setItem('username', username)
  //         dispatch(AuthActionCreators.setUser(user))
  //         dispatch(AuthActionCreators.setIsAuth(true))
  //         dispatch(AuthActionCreators.setError(''))
  //       } else {
  //         dispatch(AuthActionCreators.setError('Некорректное имя пользователя или пароль'))
  //       }
  //       dispatch(AuthActionCreators.setIsLoading(false))
  //     }, 1000)
  //   } catch (e) {
  //     dispatch(AuthActionCreators.setError('Произошла ошибка при входе'))
  //   }
  // },
  login: (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setIsLoading(true))
    UserService.getUsers().then((res) => {
        const users = mapResponseToUsers(res.data)
        const user = users.find(u =>
          u.username === username && u.password === password)
        if (user) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('username', username)
          localStorage.setItem('userId', (user as any).id)
          dispatch(AuthActionCreators.setUser(user))
          dispatch(AuthActionCreators.setIsAuth(true))
          dispatch(AuthActionCreators.setError(''))
        } else {
          dispatch(AuthActionCreators.setError('Некорректное имя пользователя или пароль'))
        }
      }
    ).catch((e) => {
      dispatch(AuthActionCreators.setError('Не удалось загрузить пользователей'))}
    ).finally(() => {
      dispatch(AuthActionCreators.setIsLoading(false))
    })
  },
  logout: () => (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setIsLoading(true))
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    dispatch(AuthActionCreators.setUser({} as IUser))
    dispatch(AuthActionCreators.setIsAuth(false))
  }
}