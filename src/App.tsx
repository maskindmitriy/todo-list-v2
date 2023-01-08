import React, {useEffect} from 'react';
import {Navbar} from "./components/Navbar";
import {AppRouter} from "./components/AppRouter";
import {IUser} from "./models/IUser";
import {useActions} from "./hooks/useActions";

function App() {
  const {setIsAuth, setUser} = useActions()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username' || '')} as IUser)
      setIsAuth(true)
    }
  }, [])

  return (
    <>
      <Navbar/>
      <AppRouter/>
    </>
  );
}

export default App;
