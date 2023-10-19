import React, { Fragment, useEffect, useState } from "react";
import TeacherRow from "./TeacherRow";
import EditTeacherRow from "./EditTeacherRow";
import InsertTeacherButton from "./InsertTeacherButton";
import InsertTeacherRow from "./InsertTeacherRow";
import Swal from "sweetalert2";
const TeacherTable = ({ data, setData }) => {
  const [editTchId, setEditTchId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    color_calendar: "",
    line_id: "",
    isAdmin:""
  });

  const [insertFormData, setInsertFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    color_calendar: "", 
    line_id: "",
  });

  const [isInsert, setIsInsert] = useState(false);

  const cancelInsertRow = () => {
    setIsInsert(!isInsert);
  };

  const insertFormDataSubmitHandler = async () => {
    console.log(insertFormData);
    Swal.fire({
      title: "เพิ่มข้อมูล?",
      text: "คุณต้องการเพิ่มข้อมูลหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const insertForm = {
          prefix: insertFormData.prefix,
          firstname: insertFormData.firstname,
          lastname: insertFormData.lastname,
          email: insertFormData.email,
          color_calendar: insertFormData.color_calendar,
          tel: insertFormData.tel,
          line_id: insertFormData.line_id,
        };

        const response = await fetch("http://34.126.100.66:8080/teachers/insert", {
          method: "post",
          body: JSON.stringify(insertForm),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setData((prev) => [...prev, data]);
            setIsInsert(false);
            Swal.fire("สำเร็จ!", "เพิ่มข้อมูลอาจารย์เรียบร้อยแล้ว.", "success");
          });
      }
    });
  };

  const editFormDataSubmitHandler = async () => {
    Swal.fire({
      title: 'แก้ไขข้อมูล?',
      text: "คุณต้องการแก้ไขข้อมูลนี้หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'แก้ไข!',
      cancelButtonText: 'ยกเลิก'
    }).then(async(result) => {
      if (result.isConfirmed) {
        const editForm = {
          id: editTchId,
          prefix: editFormData.prefix,
          firstname: editFormData.firstname,
          lastname: editFormData.lastname,
          email: editFormData.email,
          tel: editFormData.tel,
          color_calendar: editFormData.color_calendar,
          line_id: editFormData.line_id,
          isAdmin: editFormData.isAdmin,
        };
    
        const response = await fetch("http://34.126.100.66:8080/teachers/update", {
          method: "put",
          body: JSON.stringify(editForm),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((res) => {
            if (res.status !== 200) {
              Swal.fire("Error", "เกิดข้อผิดพลาด", "error");
              throw new Error("Error");
            }
    
            return res.json();
          })
          .then((result) => {
            const dataTeacherTmp = [...data];
    
            const findIndexData = dataTeacherTmp.findIndex(
              (item) => item.id === editTchId
            );
            dataTeacherTmp[findIndexData] = result;
    
            setData(dataTeacherTmp);
            setEditTchId(null);
            Swal.fire(
              'สำเร็จ!',
              'แก้ไขข้อมูลสำเร็จ.',
              'success'
            )
          });
      }
    })
    
  };

  const deleteFormDataHandler = async (id) => {
    Swal.fire({
      title: "ลบข้อมูล?",
      text: "คุณต้องการลบข้อมูลหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("http://34.126.100.66:8080/teachers/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
          credentials: "include",
        })
          .then((res) => {
            if (res.status !== 200) {
              Swal.fire("Error", "เกิดข้อผิดพลาด", "error");
              throw new Error("Error");
            }

            return res.json();
          })
          .then((result) => {
            const dataTeacherTmp = [...data];

            const filterDataNotInclude = dataTeacherTmp.filter(
              (item) => item.id !== id
            );
            console.log(filterDataNotInclude);
            setData(filterDataNotInclude);
            Swal.fire("สำเร็จ!", "ข้อมูลอาจารย์ถูกลบเรียบร้อยแล้ว", "success");
          });
      }
    });
  };

  return (
    <div className="pt-5 mx-5">
      <table className="table w-full table-responsive border text-center">
        <thead>
          <tr className="">
            <td className="border py-1  font-semibold border-gray-300">
              คำนำหน้า
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              {" "}
              ชื่อ
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              นามสกุล
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              Email
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              เบอร์โทร
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              Line Id
            </td>
            <td className="border py-1 font-semibold border-gray-300">
              สีในปฏิทิน
            </td>
            <td className="border py-1 font-semibold border-gray-300">
              ผู้ดูแล
            </td>
            <td className="border py-1  font-semibold border-gray-300">
              แก้ไข
            </td>
            <td className="border py-1  font-semibold border-gray-300">ลบ</td>
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
