import { redirect } from "react-router-dom";

export async function checkAuth() {
  // console.log("start check");
  const response = await fetch("http://localhost:8080/auth/check", {
    method: "get",
    credentials: "include",
  });

  const data = await response.json();
  // console.log(data);

  if (data.isAuth === false || response.status !== 200) {
    return redirect("/login");
  } else {
    return true;
  }
}

export async function checkAuthTF() {
  const response = await fetch("http://localhost:8080/auth/check", {
    method: "get",
    credentials: "include",
  });

  const data = await response.json();
  // console.log(data);

  if (data.isAuth === false || response.status !== 200) {
    return false
  } else {
    return true;
  }
}
