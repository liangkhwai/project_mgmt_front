import React, { Fragment, useState, useEffect } from "react";
import TableCategorieRow from "./TableCategorieRow";
import { AddButton } from "../../../../UI/button";
import EditCategorieRoom from "./EditCategorieRoom";
import InsertCategorieRow from "./InsertCategorieRow";
import Swal from "sweetalert2";
const TableCategorieResearcher = ({
  dataRoomList,
  setRoomData,
  setRshList,
  rshList,
  loadedResearcher,
  setLoadedResearcher,
  setCategories,
}) => {
  useEffect(() => {
    setRshList(loadedResearcher);
  }, []);

  // console.log(dataRoomList);
  const [roomList, setRoomList] = useState(dataRoomList);

  const [editRoomId, setEditRoomId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    room: "",
    type: "",
    year: "",
  });

  const [isInsert, setIsInsert] = useState(false);

  const [insertFormData, setInsertFormData] = useState({
    room: "",
    type: "N",
    year: "",
  });

  const isInsertButtonHandler = () => {
    setIsInsert(!isInsert);
  };

  const insertFormDataHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    console.log(name, val);
    setInsertFormData((prev) => ({ ...prev, [name]: val }));
  };

  const insertFormDataSubmitHandler = async () => {
    Swal.fire({
      title: "เพิ่มข้อมูล?",
      text: "คุณต้องการเพิ่มหมวดหมู่ห้องหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const insertData = {
          room: insertFormData.room,
          type: insertFormData.type,
          year: insertFormData.year,
        };

        const response = await fetch(
          "http://127.0.0.1:8080/categories/insert",
          {
            method: "post",
            body: JSON.stringify(insertData),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);

            const roomListTmp = roomList;

            setRoomList((prev) => [...prev, data]);
            setRoomData((prev) => [...prev, data]);
            setCategories((prev) => [...prev, data]);
            setIsInsert(false);
            Swal.fire(
              "เพิ่มข้อมูลสำเร็จ!",
              "หมวดหมู่ห้องได้ถูกเพิ่มเรียบร้อย",
              "success"
            );
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const getRoomId = (data) => {
    console.log(data.id);
    setEditRoomId(data.id);
    setEditFormData(data);
  };

  const cancelEditForm = () => {
    setEditRoomId(null);
  };

  const editFormDataChangeHandler = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    console.log(val);
    setEditFormData((prev) => ({ ...prev, [name]: val }));
  };
  const editFormSubmitHandler = async () => {
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
        const editData = {
          id: editRoomId,
          room: editFormData.room,
          type: editFormData.type,
          year: editFormData.year,
        };
        // console.log(editData);
        console.log(editData);
        const response = await fetch("http://127.0.0.1:8080/categories/update", {
          method: "put",
          body: JSON.stringify(editData),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => {

            if(response.status !== 200){
              Swal.fire("Error","เกิดข้อผิดผลาด","error")
              throw new Error("เกิดข้อผิดพลาด");
            }

            return response.json();
          })
          .then((data) => {
            const roomListTmp = roomList;
            const loadedRoomTmp = dataRoomList;
            const loadedRshTmp = [...loadedResearcher];
            const index = roomListTmp.findIndex((room) => room.id === editRoomId);
            const indexLoaded = loadedRoomTmp.findIndex(
              (room) => room.id === editRoomId
            );
            const indexLoadedRsh = loadedRshTmp.findIndex(
              (rsh) => rsh.categorieRoomId === editRoomId
            );
            console.log(indexLoadedRsh);
    
            roomListTmp[index] = data;
            loadedRoomTmp[indexLoaded] = data;
    
            const filterEditRshRoom = rshList.filter(
              (rsh) => rsh.categorieRoomId === editRoomId
            );
    
            const filterEditLoadedRshRoom = loadedRshTmp.filter(
              (rsh) => rsh.categorieRoomId === editRoomId
            );
            const filterNotEditLoadedRshRoom = loadedRshTmp.filter(
              (rsh) => rsh.categorieRoomId !== editRoomId
            );
    
            console.log(filterEditLoadedRshRoom);
            // const setEditRoomRsh = filterEditRshRoom.map(
            //   (dataRsh) => dataRsh.categorie_room = data
            // );
            const setEditRoomRsh = filterEditRshRoom.map((dataRsh) => {
              return {
                ...dataRsh,
                categorie_room: data,
              };
            });
    
            const setEditRoomLoadedRsh = filterEditLoadedRshRoom.map((dataRsh) => {
              return {
                ...dataRsh,
                categorie_room: data,
              };
            });
            console.log(setEditRoomLoadedRsh);
            console.log(filterNotEditLoadedRshRoom);
            const res = filterNotEditLoadedRshRoom.concat(setEditRoomLoadedRsh);
            console.log(res);
    
            // const res = loadedResearcher.map((rsh=> rsh.id === ))
    
            console.log(loadedRshTmp);
            // console.log(filterEditLoadedRshRoom)
    
            // console.log(data);
            // console.log(filterEditRshRoom);
            // console.log(rshList);
            // console.log(setEditRoomRsh);
    
            setLoadedResearcher(res);
            setRshList(setEditRoomRsh);
            setRoomList(roomListTmp);
            setRoomData(loadedRoomTmp);
            setEditRoomId(null);
            Swal.fire(
              'แก้ไขข้อมูลสำเร็จ!',
              'แก้ไขข้อมูลหมวดหมู่สำเร็จ',
              'success'
            )
          })
          .catch((err) => console.log(err));
      }
    })
   
  };

  const deleteFormDataHandler = async (id) => {
    Swal.fire({
      title: "ลบข้อมูล?",
      text: "คุณต้องการลบหมวดหมู่นี้หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(id);

        const response = await fetch(
          "http://127.0.0.1:8080/categories/delete",
          {
            method: "post",
            body: JSON.stringify({ id: id }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        )
          .then((res) => {
            if (res.status !== 200) {
              Swal.fire("ไม่สำเร็จ", "เกิดข้อผิดพลาด", "error");
              throw new Error("เกิดข้อผิดพลาด");
            }

            return res.json();
          })
          .then((data) => {
            console.log(data);

            setRoomList((prev) => {
              return prev.filter((room) => room.id !== id);
            });
            setCategories((prev) => {
              return prev.filter((room) => room.id !== id);
            });
            setRoomData((prev) => {
              return prev.filter((room) => room.id !== id);
            });

            Swal.fire("ลบสำเร็จ!", "หมวดหมู่ห้องได้ถูกลบเรียบร้อย", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg py-5 px-5 rounded-tl-none">
      <table className="table w-full border">
        <thead>
          <tr>
            <th className="py-2 border-2 border-gray-300">ห้อง</th>
            <th className="py-2 border-2 border-gray-300">หลักสูตร</th>
            <th className="py-2 border-2 border-gray-300">ปีที่เข้าศึกษา</th>
            <th className="py-2 border-2 border-gray-300">แก้ไข</th>
            <th className="py-2 border-2 border-gray-300">ลบ</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {roomList.map((data, idx) => (
            <Fragment key={idx}>
              {data.id === editRoomId ? (
                <EditCategorieRoom
                  data={editFormData}
                  cancelEditForm={cancelEditForm}
                  editFormDataChangeHandler={editFormDataChangeHandler}
                  editFormSubmitHandler={editFormSubmitHandler}
                />
              ) : (
                <TableCategorieRow
                  key={idx}
                  data={data}
                  getRoomId={getRoomId}
                  deleteFormDataHandler={deleteFormDataHandler}
                />
              )}
            </Fragment>
          ))}
          {isInsert && (
            <InsertCategorieRow
              isInsertButtonHandler={isInsertButtonHandler}
              insertFormDataHandler={insertFormDataHandler}
              insertFormDataSubmitHandler={insertFormDataSubmitHandler}
            />
          )}
        </tbody>
      </table>
      <div className="flex justify-end my-5 ">
        <AddButton onClick={isInsertButtonHandler}>เพิ่มหมวดหมู่</AddButton>
      </div>
    </div>
  );
};

export default TableCategorieResearcher;
