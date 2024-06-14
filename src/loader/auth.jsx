import { redirect } from "react-router-dom";

export async function checkAuth() {
  // console.log("start check");
  const response = await fetch(process.env.REACT_APP_AUTH_CHECK, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  console.log(data);

  if (data.isAuth === false || response.status !== 200) {
    return redirect("/login");
  } else {
    return true;
  }
}

export async function checkAuthTF() {
  const response = await fetch(process.env.REACT_APP_AUTH_CHECK, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  console.log(data);

  if (data.isAuth === false || response.status !== 200) {
    return false;
  } else {
    console.log(data);
    return { isAuth: true, userData: data.userData, userRole: data.userRole };
  }
}

export async function checkRole() {
  const response = await fetch(process.env.REACT_APP_AUTH_CHECK_ROLE, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  if (data) {
    return data;
  } else {
    return false;
  }
}
