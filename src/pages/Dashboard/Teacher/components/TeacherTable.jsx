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

  const editFormDataSubmitHandler = () => {
    console.log(data);
    const dataTeacherTmp = [...data];

    const findIndexData = dataTeacherTmp.findIndex(
      (item) => item.id === editTchId
    );
    dataTeacherTmp[findIndexData] = editFormData;

    setData(dataTeacherTmp);
    setEditTchId(null);
  };

  const deleteFormDataHandler = (id) => {
    const dataTeacherTmp = [...data];

    const filterDataNotInclude = dataTeacherTmp.filter(
      (item) => item.id !== id
    );
    console.log(filterDataNotInclude);
    setData(filterDataNotInclude);
  };

  return (
    <div className="pt-10 mx-10">
      <table className="table w-full table-responsive border text-center">
        <thead>
          <tr>
            <td>Prefix</td>
            <td>ชื่อ</td>
            <td>นามสกุล</td>
            <td>อีเมลล์</td>
            <td>เบอร์โทร</td>
            <td>Line Id</td>
            <td>แก้ไข</td>
            <td>ลบ</td>
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
