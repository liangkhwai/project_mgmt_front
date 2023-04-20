import React from "react";
import { redirect } from "react-router-dom";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;

export function checkAuth() {
  console.log("start check");
  const response = fetch("http://localhost:8080/auth/check", {
    method: "get",
  });

  const data = response.json();

  if (data.isAuth === false) {
    return redirect("/login");
  }
}
