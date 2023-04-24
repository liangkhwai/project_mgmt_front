import React, { Fragment, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ResearcherList from "./components/ResearcherList";
import EditRshRow from "./components/EditRshRow";
import { nanoid } from "nanoid";
import InsertResearcherRow from "./components/InsertResearcherRow";
const Researcher = () => {
  console.log(nanoid(10));
  const loaderData = useLoaderData();
  const [isInsert, setIsInsert] = useState(false);
  const [rshList, setRshList] = useState(loaderData);
  const [editFormData, setEditFormData] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    grade: "",
  });
  const [insertFormData, setInsertFormData] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    grade: "",
  });

  const [editRshId, setEditRshId] = useState(null);
  console.log(rshList);
  const setEditRshIdHandler = (id, rsh) => {
    console.log(id);
    console.log(rsh);
    setEditRshId(id);

    const editValues = {
      student_id: rsh.student_id,
      firstname: rsh.firstname,
      lastname: rsh.lastname,
      email: rsh.email,
      tel: rsh.tel,
      grade: rsh.grade,
    };
    setEditFormData(editValues);
  };
  const cancelEditFormHandler = () => {
    setEditRshId(null);
  };
  const insertFormHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    console.log(val);
    setInsertFormData((prev) => ({ ...prev, [name]: val }));
  };
  const editFormHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    console.log(val);
    setEditFormData((prev) => ({ ...prev, [name]: val }));
  };
  const insertFormSubmitHandler = () => {
    const insertData = {
      student_id: insertFormData.student_id,
      firstname: insertFormData.firstname,
      lastname: insertFormData.lastname,
      email: insertFormData.email,
      tel: insertFormData.tel,
      grade: insertFormData.grade,
    };

    const response = fetch("http://localhost:8080/researcher/insert", {
      method: "post",
      body: JSON.stringify(insertData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        return response.status;
      })
      .then((status) => {
        setRshList((prev) => [...prev, insertData]);
        setIsInsert(false);
      });
  };
  const editFormSubmitHandler = () => {
    console.log(editFormData);
    const editData = {
      id: editRshId,
      student_id: editFormData.student_id,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      email: editFormData.email,
      tel: editFormData.tel,
      grade: editFormData.grade,
    };
    console.log(editData);

    const response = fetch("http://localhost:8080/researcher/update", {
      method: "put",
      body: JSON.stringify(editData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        return response.status;
      })
      .then((status) => {
        console.log(status);
        const rshTemp = [...rshList];

        const index = rshTemp.findIndex((rsh) => rsh.id === editRshId);
        rshTemp[index] = editData;
        setRshList(rshTemp);
        setEditRshId(null);
      });
  };
  const isInsertHandler = () => {
    setIsInsert(!isInsert);
  };
  const cancelInsertHadnler = () => {
    setIsInsert(false);
  };

  return (
    <div className="mx-10">
      <h1 className="text-3xl my-10">ผู้วิจัย</h1>

      <div className="bg-white rounded-md ">
        <div className="pt-10 mx-10">
          <table className="table table-responsive w-full border">
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
                <th>เบอร์โทร</th>
                <th>เกรดเฉลี่ย</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {rshList.map((rsh, idx) => (
                <Fragment key={idx}>
                  {editRshId === rsh.id ? (
                    <EditRshRow
                      rsh={editFormData}
                      editFormHandler={editFormHandler}
                      cancelEditFormHandler={cancelEditFormHandler}
                      editFormSubmitHandler={editFormSubmitHandler}
                    />
                  ) : (
                    <ResearcherList
                      rsh={rsh}
                      setEditRshIdHandler={setEditRshIdHandler}
                    />
                  )}
                </Fragment>
              ))}
              {isInsert ? (
                <InsertResearcherRow
                  cancelInsertHadnler={cancelInsertHadnler}
                  insertFormHandler={insertFormHandler}
                  insertFormSubmitHandler={insertFormSubmitHandler}
                />
              ) : null}
            </tbody>
          </table>
          <div className="flex justify-end">
            <button className="px-3 py-2 rounded bg-green-500 text-black">
              เพิ่มนักวิจัย (CSV)
            </button>
            <button
              className="px-3 py-2 rounded bg-green-500 text-black"
              onClick={() => isInsertHandler()}
            >
              เพิ่มนักวิจัย (ปกติ)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Researcher;
// export async function getList() {
//   const response = await fetch("http://localhost:8080/researcher/list", {
//     method: "get",
//   });

//   const data = await response.json();
//   console.log(data);

//   if (response.status === 200) {
//     return data;
//   }
//   return { message: "error" };
// }
