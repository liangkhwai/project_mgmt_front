import { redirect, useNavigate } from "react-router-dom";
export async function checkBoards(grpId) {
  let boardsCheck = false;
  let groupCheck = false;
  const getBoards = async () => {
    const response = await fetch(
      `http://localhost:8080/boards/get/${localStorage.getItem("grpId")}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.length <= 0) {
      boardsCheck = false;
    } else {
      boardsCheck = true;
    }
  };
  const getGroup = async () => {
    const response = await fetch("http://localhost:8080/group/getGroup", {
      method: "get",
      credentials: "include",
    });

    const data = await response.json();
    if (data.length <= 0) {
      groupCheck = false;
    } else {
      groupCheck = true;
    }
  };

  if (boardsCheck === true && groupCheck === true) {
    return;
  } else {
    alert("กรุณาสร้างกลุ่มโปรเจคหรือสุ่มกรรมการสอบ");
    return redirect("/dashboard/group");
  }
}
