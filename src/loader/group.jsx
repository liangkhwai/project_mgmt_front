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


export async function getGroupDetail(grpId){
  const response = await fetch("http://localhost:8080/group/getOneGroup", {
      method: "post",
      body: JSON.stringify({ grpId: parseInt(grpId) }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

  const data = await response.json();

  return data
}