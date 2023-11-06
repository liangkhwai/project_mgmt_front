import { redirect, useNavigate } from "react-router-dom";
export async function checkBoards(grpId) {
  let boardsCheck = false;
  let groupCheck = false;
  console.log(localStorage.getItem("grpId"));
  const getBoards = async () => {
    const response = await fetch(
      `http://34.124.162.203:8080/boards/get/${localStorage.getItem("grpId")}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.length <= 0 || data === null) {
      console.log('checkde');
      boardsCheck = false;
    } else {
      boardsCheck = true;
    }
  };
  const getGroup = async () => {
    const response = await fetch("http://34.124.162.203:8080/group/getGroup", {
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

  if (localStorage.getItem("grpId") === null ||localStorage.getItem("grpId") === undefined) {
    console.log(localStorage.getItem('grpId'));
    console.log('+++');
    boardsCheck = false;
  } else {
     await getBoards();
  }
  await getGroup();
  console.log(boardsCheck, groupCheck);
  if (boardsCheck === true && groupCheck === true) {
    return redirect('/dashboard/request/exam')
  } else {
    alert("กรุณาสร้างกลุ่มโปรเจคหรือสุ่มกรรมการสอบ");
    return redirect("/dashboard/group");
  }
}
