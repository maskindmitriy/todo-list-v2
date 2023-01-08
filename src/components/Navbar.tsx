import React from "react"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

export function Navbar() {
  const {isAuth} = useTypedSelector(state => state.authReducer)
  const {logout} = useActions()

  const logoutHandler = () => {
    logout()
  }

  return (
    <AppBar position="static">
      <Toolbar variant={'dense'}>
        {isAuth && <span style={{color: 'white', fontSize: "16px", width: '150px'}}>Список задач</span>}
        <Grid container justifyContent={'flex-end'}>
          {isAuth ?
            <NavLink to={RouteNames.LOGIN_ROUTE}>
              <p style={{color: "white"}} onClick={logoutHandler}>Выйти</p>
            </NavLink>
            :
            <>
              <NavLink to={RouteNames.LOGIN_ROUTE}>
                <p style={{color: "white", marginRight: '10px'}}>Войти</p>
              </NavLink>
              <NavLink to={RouteNames.REGISTER_ROUTE}>
                <p style={{color: "white"}}>Регистрация</p>
              </NavLink>
            </>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  )
}