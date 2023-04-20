import { redirect } from "react-router-dom";

export async function logout() {
  const response = await fetch("http://localhost:8080/auth/logout", {
    method: "get",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data.message);
  return redirect("/login");
}
