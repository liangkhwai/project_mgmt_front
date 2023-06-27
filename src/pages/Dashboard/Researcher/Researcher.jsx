import React, { Fragment, useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ResearcherList from "./components/ResearcherList";
import EditRshRow from "./components/EditRshRow";
import { nanoid } from "nanoid";
import InsertResearcherRow from "./components/InsertResearcherRow";
import FileDetail from "./components/FileDetail";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
import HeaderResearcher from "./components/HeaderResearcher";
import TableResearcher from "./components/TableResearcher";
const Researcher = () => {
  const loaderData = useLoaderData();
  const [isInsert, setIsInsert] = useState(false);
  const [loadedResearcher, setLoadedResearcher] = useState(
    loaderData.dataResearcherList
  );
  const [rshList, setRshList] = useState(loadedResearcher);
  const [roomData, setRoomData] = useState(loaderData.dataRoomList);

  const [editFormData, setEditFormData] = useState({
    student_id: "",
    firstname: "",
    categorieRoomId: 1,
    lastname: "",
    email: "",
    tel: "",
    grade: "",
  });

  const editSelectedRoom = (e) => {
    const val = e.target.value;

    setEditFormData((prev) => ({ ...prev, categorieRoomId: Number(val) }));
  };

  const [insertSelectorRoom, setInsertSelectorRoom] = useState();
  const [insertMenuRoom, setInsertMenuRoom] = useState(roomData);

  const insertSelectedRoom = (e) => {
    const val = e.target.value;
    setInsertSelectorRoom(val);
    setInsertFormData((prev) => ({ ...prev, categorieRoomId: val }));
  };

  const [insertFormData, setInsertFormData] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    categorieRoomId: 1,
    email: "",
    tel: "",
    grade: "",
  });

  const filterRoomRef = useRef();

  const [editRshId, setEditRshId] = useState(null);
  // console.log(rshList);
  const setEditRshIdHandler = (id, rsh) => {
    console.log(id);
    console.log(rsh);
    setEditRshId(id);

    const editValues = {
      student_id: rsh.student_id,
      firstname: rsh.firstname,
      lastname: rsh.lastname,
      categorieRoomId: rsh.categorieRoomId,
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
      categorieRoomId: insertFormData.categorieRoomId,
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
        // insertData.id = data.id;
        console.log("data = " + data);
        setRshList((prev) => [...prev, data]);
        setLoadedResearcher((prev) => [...prev, data]);
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
      categorieRoomId: editFormData.categorieRoomId,
      email: editFormData.email,
      tel: editFormData.tel,
      grade: editFormData.grade,
    };
    // console.log(editData);

    const response = await fetch("http://localhost:8080/researcher/update", {
      method: "put",
      body: JSON.stringify(editData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        console.log("it's now ");
        console.log(rshList);
        console.log(loadedResearcher);
        const rshTemp = rshList;
        const loadedResearcherTmpp = loadedResearcher;
        console.log("clone now");
        console.log(rshTemp);
        // console.log(loadedResearcherTmpp);
        // console.log(editRshId);
        const index = rshTemp.findIndex((rsh) => rsh.id === editRshId);
        const indexLoaded = loadedResearcherTmpp.findIndex(
          (rsh) => rsh.id === editRshId
        );

        // console.table(
        //   rshTemp[index].categorieRoomId,
        //   editFormData.categorieRoomId
        // );

        // if (
        //   rshTemp[index].categorieRoomId ===
        //   Number(editFormData.categorieRoomId)
        // ) {
        //   rshTemp[index] = data;
        //   loadedResearcherTmp[index] = data;
        //   setRshList(rshTemp);
        // setLoadedResearcher(loadedResearcherTmp);

        //   console.log(true);
        // } else {
        //   console.log(false);
        //   const editRoomChangeFilter = rshTemp.filter(
        //     (item, idx) => item.id !== editRshId
        //   );
        //   setRshList(editRoomChangeFilter)
        //   setLoadedResearcher(editRoomChangeFilter);

        // }
        rshTemp[index] = data;
        // console.log(loadedResearcherTmpp);

        loadedResearcherTmpp[indexLoaded] = data;
        // console.log(loadedResearcherTmpp);
        // console.log(index);
        // console.log(rshTemp);
        console.log(rshTemp[index]);
        // console.log(loadedResearcherTmpp[index]);
        setRshList(rshTemp);
        setLoadedResearcher(loadedResearcherTmpp);

        setEditRshId(null);
      })
      .catch((err) => console.log(err));
  };
  const isInsertHandler = () => {
    setIsInsert(!isInsert);
  };
  const cancelInsertHadnler = () => {
    setIsInsert(false);
  };

  const deleteHandler = async (id) => {
    const rshTemp = [...rshList];
    const dataTemp = rshTemp.filter((i) => i.id !== id);
    console.log(dataTemp);
    const response = await fetch("http://localhost:8080/researcher/delete", {
      method: "post",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => {
        const res = data.json();
        return res;
      })
      .then((res) => {
        const rshTemp = [...rshList];
        const loadedTemp = [...loadedResearcher];
        const dataTemp = rshTemp.filter((i) => i.id !== id);
        const loadedDataTemp = loadedTemp.filter((i) => i.id !== id);
        console.log(dataTemp);
        setLoadedResearcher(loadedDataTemp);
        setRshList(dataTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [file, setFile] = useState(null);
  const fileRef = React.useRef();

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
    formData.append("file", file);
    formData.append("selector", roomSelector);
    console.log(Object.fromEntries(formData));
    const response = await fetch(
      "http://localhost:8080/researcher/insertXlsx",
      {
        method: "post",
        body: formData,
        // { formData: formData, roomSelector: roomSelector },
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
        console.log(data);
        fileRef.current.value = null;

        setModalOpen(false);
        setRshList((prev) => [...prev, ...data.data]);
        setLoadedResearcher((prev) => [...prev, ...data.data]);
        // console.table(data.data);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => setModalOpen(true);
  const closeModalHandler = () => {
    fileRef.current.value = null;
    setFile(null);
    setModalOpen(false);
  };

  const [menu, setMenu] = useState("filter");
  const HeaderMenuChangeHandler = (val) => {
    val === "filter" ? setMenu("filter") : setMenu("addcategories");
    // val === "addcategories" && setRshList(loadedResearcher)
    // console.log(menu);
  };

  const [categories, setCategories] = useState(roomData);
  const [typeFilter, setTypeFilter] = useState("all");
  const [roomSelector, setRoomSelector] = useState(1);

  const filterTypeRoom = (filterVal) => {
    // const room = [...roomData];
    // const filteredRoom = room.filter((room) => room.type === filterVal);

    const researcherList = [...loadedResearcher];
    console.log(researcherList);
    setTypeFilter(filterVal);

    console.log(filterVal);
    const type = filterVal;
    const categorie = [...roomData];
    const filteredRoom = categorie.filter(
      (categorie) => categorie.type === type
    );

    // setCategories(type === "all" ? loaderData.dataRoomList : filteredRoom);
    setCategories(type === "all" ? categorie : filteredRoom);

    const filteredRshList = researcherList.filter(
      (rsh) => rsh.categorie_room.type === filterVal
    );
    console.log("filted " + filteredRshList);
    setRshList(filterVal === "all" ? researcherList : filteredRshList);
    filterRoomRef.current.value = "all";

    // setInsertMenuRoom(type === "all" ? loaderData.dataRoomList : filteredRoom);
    setInsertMenuRoom(type === "all" ? categorie : filteredRoom);
    setItemOffSet(0)
  };

  const filterRoomList = (room) => {
    console.log(room);
    const parseRoom = parseInt(room);

    const researcherList = [...loadedResearcher];
    const roomDataTmp = [...roomData];
    // console.log(roomDataTmp);
    // console.log(typeFilter);
    // console.log(researcherList);
    // console.log(rshList);

    const filteredRoomScope = researcherList.filter(
      (researcherList) => researcherList.categorieRoomId === Number(room)
    );

    const filteredAllListTypeScope = researcherList.filter(
      (rsh) => rsh.categorie_room.type === typeFilter
    );

    // const insertFilteredRoom= roomData.filter((room,idx) =>  )

    const insertFilteredRoomType = roomDataTmp.filter(
      (room, idx) => room.type === typeFilter
    );
    console.log(roomDataTmp);
    const insertFilteredRoomScope = roomDataTmp.filter(
      (room, idx) => Number(room.id) === parseRoom
    );

    console.log(typeof parseRoom);
    roomDataTmp.map((room, idx) => console.log(typeof room.id));

    // console.log(filteredRoomScope);
    console.log(insertFilteredRoomType);
    console.log(insertFilteredRoomScope);
    setRshList(
      room === "all"
        ? typeFilter === "all"
          ? researcherList
          : filteredAllListTypeScope
        : filteredRoomScope
    );

    // ยังไม่เสร็จ

    setInsertMenuRoom(
      room === "all"
        ? typeFilter === "all"
          ? roomDataTmp
          : insertFilteredRoomType
        : insertFilteredRoomScope
    );

    setRoomSelector(room);
    setItemOffSet(0)
  };

  const selectorChangeHandler = (e) => {
    let selected = e.target.value;
    if (selected === null || selected === "") {
      selected = 1;
    }
    setRoomSelector(selected);
  };

  // itemOffset Paginate in TableResearcher
  const [itemOffset, setItemOffSet] = useState(0);

  return (
    <div className="mx-10">
      <h1 className="text-3xl my-10">ผู้วิจัย</h1>

      <HeaderResearcher
        rshList={rshList}
        setRshList={setRshList}
        setMenu={HeaderMenuChangeHandler}
        menu={menu}
        categories={categories}
        setCategories={setCategories}
        defaultRoomData={roomData}
        setRoomData={setRoomData}
        filterTypeHandler={filterTypeRoom}
        filterRoom={filterRoomList}
        filterRoomRef={filterRoomRef}
        loadedResearcher={loadedResearcher}
        setLoadedResearcher={setLoadedResearcher}
      />

      <div className="pb-20"></div>

      <div className="bg-white rounded-md ">
        {menu === "filter" && (
          <TableResearcher
            itemOffset={itemOffset}
            setItemOffSet = {setItemOffSet}
            loadedResearcher={loadedResearcher}
            rshList={rshList}
            setRshList={setRshList}
            editRshId={editRshId}
            editFormData={editFormData}
            editFormHandler={editFormHandler}
            cancelEditFormHandler={cancelEditFormHandler}
            editFormSubmitHandler={editFormSubmitHandler}
            setEditRshIdHandler={setEditRshIdHandler}
            deleteHandler={deleteHandler}
            isInsert={isInsert}
            cancelInsertHadnler={cancelInsertHadnler}
            insertFormHandler={insertFormHandler}
            insertFormSubmitHandler={insertFormSubmitHandler}
            fileRef={fileRef}
            fileChangeHandler={fileChangeHandler}
            modalOpen={modalOpen}
            closeModalHandler={closeModalHandler}
            file={file}
            fileSubmitHandler={fileSubmitHandler}
            fileInputHandler={fileInputHandler}
            isInsertHandler={isInsertHandler}
            roomSelected={roomSelector}
            roomData={roomData}
            selectorHandler={selectorChangeHandler}
            editSelectedRoom={editSelectedRoom}
            insertSelectedRoom={insertSelectedRoom}
            insertSelectorRoom={insertSelectorRoom}
            insertMenuRoom={insertMenuRoom}
          />
        )}
      </div>
    </div>
  );
};

export default Researcher;
