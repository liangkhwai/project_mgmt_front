import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { checkAuthTF } from "../loader/auth";
const AuthContext = React.createContext({});

export const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [isTeacher, setIsTeacher] = useState(false);

  const setIsTeacherLoginHandler = () => {
    setIsTeacher(true);
  };

  const checkLogged = async () => {
    const res = await checkAuthTF();
    console.log(res);
    if (res.isAuth === true) {
      // console.log("yes it is");
      const isLogged = localStorage.getItem("username");
      if (isLogged) {
        setIsLoggedIn(true);
      }
      if (res.userRole === "teacher") {
        setIsTeacher(true);
      }
      console.log("userData : ", res.userData);
      setUserData(res.userData);
    } else {
      // console.log("No token for route");
      setUserData(null);
      setIsLoggedIn(false);
      localStorage.removeItem("username");
    }
  };
  useEffect(() => {
    checkLogged();
  }, []);

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  const usernameHandler = (name) => {
    setUsername(name);
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
      // console.log(data);
      localStorage.clear();
      setIsLoggedIn(false);
      setIsTeacher(false);
      // setUserData(null);
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
        getUsername,
        setIsTeacherLoginHandler: setIsTeacherLoginHandler,
        isTeacher: isTeacher,
        // setUserData: setUserData,
        userData: userData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
