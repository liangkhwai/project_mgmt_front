import { redirect } from "react-router-dom";

export async function checkHasGroup() {
  const response = await fetch("http://localhost:8080/researcher/getOne", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (data.groupId !== null) {
    return redirect("/dashboard");
  } else {
    return true;
  }
}
