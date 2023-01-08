import React from "react"
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

export function AppRouter() {
  const { isAuth } = useTypedSelector(state => state.authReducer);

  return (
    <Routes>
      {isAuth ?
        privateRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={route.element}/>)
        :
        publicRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={route.element}/>)}
    </Routes>
  )
}