import React, { useState } from "react";
import { redirect } from "react-router-dom";
const AuthContext = React.createContext({});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const usernameHandler = (name) => {
    setUsername(name);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "get",
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setIsLoggedIn(false);
      return true
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
