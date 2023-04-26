import React, { Fragment, useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ResearcherList from "./components/ResearcherList";
import EditRshRow from "./components/EditRshRow";
import { nanoid } from "nanoid";
import InsertResearcherRow from "./components/InsertResearcherRow";
import FileDetail from "./components/FileDetail";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const Researcher = () => {
  const loaderData = useLoaderData();
  const [isInsert, setIsInsert] = useState(false);
  const [rshList, setRshList] = useState(loaderData);
  console.log(rshList);
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
  const insertFormSubmitHandler = async () => {
    const insertData = {
      id: nanoid(),
      student_id: insertFormData.student_id,
      firstname: insertFormData.firstname,
      lastname: insertFormData.lastname,
      email: insertFormData.email,
      tel: insertFormData.tel,
      grade: insertFormData.grade,
    };
    console.log("data before insert  = ", insertData);
    const response = await fetch("http://localhost:8080/researcher/insert", {
      method: "post",
      body: JSON.stringify(insertData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("User already exits");
        } else {
          const data = response.json();
          return data;
        }
      })
      .then((data) => {
        insertData.id = data.id;
        console.log("data = " + data);
        setRshList((prev) => [...prev, insertData]);
        setIsInsert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editFormSubmitHandler = async () => {
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

    const response = await fetch("http://localhost:8080/researcher/update", {
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

  const deleteHandler = async (id) => {
    console.log(id);
    const rshTemp = [...rshList];

    const dataTemp = rshTemp.filter((i) => i.id !== id);
    console.log(dataTemp);
    console.log(rshList);
    setRshList(dataTemp);
    const response = await fetch("http://localhost:8080/researcher/delete", {
      method: "post",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
  };

  const [file, setFile] = useState(null);
  const fileRef = React.useRef();
  useEffect(() => {
    console.log(fileRef.current.value);
  }, [fileRef]);
  const fileInputHandler = () => {
    fileRef.current.click();
  };
  const fileChangeHandler = async (e) => {
    console.log(fileRef.current.value);
    const fileUploaded = await e.target.files[0];
    if (fileUploaded) {
      console.log(fileUploaded);
      setFile(fileUploaded);
      openModalHandler();
    }

    if (file) {
      console.log("here");
      openModalHandler();
    }
  };

  const fileSubmitHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    await formData.append("file", file);
    console.log(Object.fromEntries(formData));
    const response = await fetch(
      "http://localhost:8080/researcher/insertXlsx",
      {
        method: "post",
        body: formData,
        headers: {
          // "Content-Type":
          //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        credentials: "include",
      }
    )
      .then((res) => {
        const data = res.json();
        // setFile(null);
        return data;
      })
      .then((data) => {
        fileRef.current.value = null;

        setModalOpen(false);
        console.log(data);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => setModalOpen(true);
  const closeModalHandler = () => {
    fileRef.current.value = null;
    setFile(null);
    setModalOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
                      deleteHandler={deleteHandler}
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
          {/* <form encType="multipart/form-data"> */}
          <input
            type="file"
            ref={fileRef}
            onChangeCapture={(e) => fileChangeHandler(e)}
            className="hidden"
          />
          {/* </form> */}
          <Modal open={modalOpen} onClose={closeModalHandler}>
            <Box sx={style}>
              <FileDetail
                file={file}
                onClose={closeModalHandler}
                submit={fileSubmitHandler}
              />
            </Box>
          </Modal>
          <div className="flex justify-end">
            <button
              className="px-3 py-2 rounded bg-green-500 text-black"
              onClick={() => fileInputHandler()}
            >
              เพิ่มนักวิจัย (CSV)
            </button>
            <button
              className="px-3 py-2 rounded bg-green-500 text-black"
              onClick={() => isInsertHandler()}
            >
              เพิ่มนักวิจัย (ปกติ)
            </button>
          </div>
          {/* <form
            method="post"
            encType="multipart/form-data"
            onSubmit={testSubmitFile}
          >
            <input type="file" name="" id="" onChange={testFileHandler} />
            <button type="submit">Submit It</button>
          </form> */}
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
