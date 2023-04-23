import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { checkAuth } from "../loader/auth";
const AuthContext = React.createContext({});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();

  useEffect(() => {
    const isLogged = localStorage.getItem("usename");
    if (isLogged) {
      setIsLoggedIn(true);
    }
  }, []);


  const usernameHandler = (name) => {
    localStorage.setItem("username", name);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  // const isLoggedIn = () => {

  //   const username = localStorage.getItem("username");
  //   console.log(username)
  //   if (!username || undefined || null) {
  //     return false;
  //   }
  //   return true;
  // };

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "get",
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      localStorage.clear();
      setIsLoggedIn(false)
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
        username: username,
        usernameHandler: usernameHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
