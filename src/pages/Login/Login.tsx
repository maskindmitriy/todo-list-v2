import React, { useState } from "react"
import {TextField} from "@mui/material";
import styles from './Login.module.css'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LoadingButton } from '@mui/lab';
import {useActions} from '../../hooks/useActions'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {isLoading, error} = useTypedSelector(state => state.authReducer)
  const { login } = useActions()

  const loginHandler = () => {
    login(username, password)
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Авторизация</h2>
      <form className={styles.loginForm}>
        <TextField id="username" placeholder='Логин'
                   required helperText={username === '' ? 'Обязательное поле': ''}
                   variant="outlined"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
        <TextField id="password" placeholder='Пароль'
                   required helperText={password === '' ? 'Обязательное поле': error}
                   variant="outlined"
                   type='password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
        <LoadingButton
          loading={isLoading}
          onClick={loginHandler}

        >Войти</LoadingButton>
      </form>
    </div>
  )
}