import React, { Fragment, useState, useEffect } from "react";
import TableCategorieRow from "./TableCategorieRow";
import { AddButton } from "../../../../UI/button";
import EditCategorieRoom from "./EditCategorieRoom";
import InsertCategorieRow from "./InsertCategorieRow";

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
    const insertData = {
      room: insertFormData.room,
      type: insertFormData.type,
      year: insertFormData.year,
    };

    const response = await fetch("http://localhost:8080/categories/insert", {
      method: "post",
      body: JSON.stringify(insertData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
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
      })
      .catch((err) => console.log(err));
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
    const editData = {
      id: editRoomId,
      room: editFormData.room,
      type: editFormData.type,
      year: editFormData.year,
    };
    // console.log(editData);
    console.log(editData);
    const response = await fetch("http://localhost:8080/categories/update", {
      method: "put",
      body: JSON.stringify(editData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg py-5 px-5 rounded-tl-none">
      <table className="table w-full border">
        <thead>
          <tr>
            <th>ห้อง</th>
            <th>หลักสูตร</th>
            <th>ปีการศึกษา</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody className="text-center">
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
      <div className="flex justify-end">
        <AddButton onClick={isInsertButtonHandler}>เพิ่มหมวดหมู่</AddButton>
      </div>
    </div>
  );
};

export default TableCategorieResearcher;
