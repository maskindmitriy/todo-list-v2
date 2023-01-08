import React, {useState} from "react"
import styles from './Register.module.css'
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {UserService} from "../../api/UserService";
import {IUser} from "../../models/IUser";
import {useNavigate} from "react-router-dom";

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [succReg, setSuccReg] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '', password: ''
  })

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = (form: IUser) => {
    setIsLoading(true)
    UserService.registerUser({...form}).then(() => {
      setSuccReg(true)
    }).catch((e) => {
      setError(e)
    }).finally(() => {
      setIsLoading(false)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    })
  }

  if (succReg) {
    return (
      <div className={styles.message}>
        <h2>Пользователь создан</h2>
      </div>
    )
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Регистрация</h2>
      <form className={styles.loginForm}>
        <TextField id="username" placeholder='Логин'
                   required helperText={form.username === '' ? 'Обязательное поле' : ''}
                   variant="outlined"
                   name='username'
                   value={form.username}
                   onChange={changeHandler}/>
        <TextField id="password" placeholder='Пароль'
                   required helperText={form.password === '' ? 'Обязательное поле' : error}
                   variant="outlined"
                   name='password'
                   type='password'
                   value={form.password}
                   onChange={changeHandler}/>
        <LoadingButton
          loading={isLoading}
          onClick={(e) => registerHandler(form)}

        >Создать</LoadingButton>
      </form>
    </div>
  )
}