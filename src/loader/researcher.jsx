import { redirect } from "react-router-dom";
export async function getList() {
  const researcherList = await fetch("http://34.124.162.203:8080/researcher/list", {
    method: "get",
  });

  const dataResearcherList = await researcherList.json();
  // console.log(dataResearcherList);

  const roomList = await fetch("http://34.124.162.203:8080/categories/list", {
    method: "get",
  });

  const dataRoomList = await roomList.json();

  if (researcherList.status === 200 && roomList.status === 200) {
    return { dataResearcherList, dataRoomList };
  }
  return { message: "error" };
}

export async function getSelfInfo() {
  const res = await fetch("http://34.124.162.203:8080/researcher/getOne", {
    method: "get",
    credentials: "include",
  });
  const data = await res.json();
  console.log(res.status);
  if (res.status === 401) {
    return redirect("/dashboard");
  } else {
    return data;
  }
  // return data
}
