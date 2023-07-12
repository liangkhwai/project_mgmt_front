import React, { Fragment, useEffect, useState } from "react";
import TeacherRow from "./TeacherRow";
import EditTeacherRow from "./EditTeacherRow";
import InsertTeacherButton from "./InsertTeacherButton";
import InsertTeacherRow from "./InsertTeacherRow";

const TeacherTable = ({ data, setData }) => {
  const [editTchId, setEditTchId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    line_id: "",
  });

  const [insertFormData, setInsertFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    line_id: "",
  });

  const [isInsert, setIsInsert] = useState(false);

  const cancelInsertRow = () => {
    setIsInsert(!isInsert);
  };

  const insertFormDataSubmitHandler = async () => {
    console.log(insertFormData);

    const insertForm = {
      prefix: insertFormData.prefix,
      firstname: insertFormData.firstname,
      lastname: insertFormData.lastname,
      email: insertFormData.email,
      tel: insertFormData.tel,
      line_id: insertFormData.line_id,
    };

    const response = await fetch("http://localhost:8080/teachers/insert", {
      method: "post",
      body: JSON.stringify(insertForm),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData((prev) => [...prev, data]);
        setIsInsert(false);
      });
  };

  const editFormDataSubmitHandler = async () => {
    const editForm = {
      id: editTchId,
      prefix: editFormData.prefix,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      email: editFormData.email,
      tel: editFormData.tel,
      line_id: editFormData.line_id,
    };

    const response = await fetch("http://localhost:8080/teachers/update", {
      method: "put",
      body: JSON.stringify(editForm),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        const dataTeacherTmp = [...data];

        const findIndexData = dataTeacherTmp.findIndex(
          (item) => item.id === editTchId
        );
        dataTeacherTmp[findIndexData] = result;

        setData(dataTeacherTmp);
        setEditTchId(null);
      });
  };

  const deleteFormDataHandler = async (id) => {
    const response = await fetch("http://localhost:8080/teachers/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        const dataTeacherTmp = [...data];

        const filterDataNotInclude = dataTeacherTmp.filter(
          (item) => item.id !== id
        );
        console.log(filterDataNotInclude);
        setData(filterDataNotInclude);
      });
  };

  return (
    <div className="pt-5 mx-5">
      <table className="table w-full table-responsive border text-center">
        <thead>
          <tr className="">
            <td className="border-2 py-1 ">คำนำหน้า</td>
            <td className="border-2 py-1 "> ชื่อ</td>
            <td className="border-2 py-1 ">นามสกุล</td>
            <td className="border-2 py-1 ">Email</td>
            <td className="border-2 py-1 ">เบอร์โทร</td>
            <td className="border-2 py-1 ">Line Id</td>
            <td className="border-2 py-1 ">แก้ไข</td>
            <td className="border-2 py-1 ">ลบ</td>
          </tr>
        </thead>
        <tbody>
          {data.map((data, idx) => {
            return (
              <Fragment key={idx}>
                {data.id === editTchId ? (
                  <EditTeacherRow
                    dataEdit={editFormData}
                    cancelEdit={setEditTchId}
                    setEditFormData={setEditFormData}
                    editFormDataSubmitHandler={editFormDataSubmitHandler}
                  />
                ) : (
                  <TeacherRow
                    data={data}
                    setEditId={setEditTchId}
                    setEditFormData={setEditFormData}
                    deleteFormDataHandler={deleteFormDataHandler}
                  />
                )}
              </Fragment>
            );
          })}
          {isInsert && (
            <InsertTeacherRow
              setInsertFormData={setInsertFormData}
              cancelInsertRow={cancelInsertRow}
              insertFormDataSubmitHandler={insertFormDataSubmitHandler}
            />
          )}
        </tbody>
      </table>
      <div className="text-end">
        <InsertTeacherButton setIsInsert={cancelInsertRow} />
      </div>
    </div>
  );
};

export default TeacherTable;
