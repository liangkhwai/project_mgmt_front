import React, { Fragment, useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ResearcherList from "./components/ResearcherList";
import EditRshRow from "./components/EditRshRow";
import { nanoid } from "nanoid";
import InsertResearcherRow from "./components/InsertResearcherRow";
import FileDetail from "./components/FileDetail";
import Swal from "sweetalert2";
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
    Swal.fire({
      title: "เพิ่มข้อมูล?",
      text: "คุณต้องการเพิ่มข้อมูลนี้หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
        const response = await fetch(
          "http://localhost:8080/researcher/insert",
          {
            method: "post",
            body: JSON.stringify(insertData),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        )
          .then((response) => {
            if (response.status !== 201) {
              Swal.fire(
                "ไม่สำเร็จ",
                "มีข้อมูลผู้ใช้นี้อยู่ในระบบแล้ว",
                "error"
              );
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
            Swal.fire("เพิ่มสำเร็จ!", "เพิ่มข้อมูลสำเร็จ", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const editFormSubmitHandler = async () => {
    Swal.fire({
      title: "คุณต้องการแก้ไขหรือไม่?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "แก้ไข",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
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

        const response = await fetch(
          "http://localhost:8080/researcher/update",
          {
            method: "put",
            body: JSON.stringify(editData),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("it's now ");
            console.log(rshList);
            console.log(loadedResearcher);
            const rshTemp = rshList;
            const loadedResearcherTmpp = loadedResearcher;
            console.log("clone now");
            console.log(rshTemp);

            const index = rshTemp.findIndex((rsh) => rsh.id === editRshId);
            const indexLoaded = loadedResearcherTmpp.findIndex(
              (rsh) => rsh.id === editRshId
            );

            rshTemp[index] = data;

            loadedResearcherTmpp[indexLoaded] = data;

            console.log(rshTemp[index]);
            setRshList(rshTemp);
            setLoadedResearcher(loadedResearcherTmpp);

            setEditRshId(null);
          })
          .catch((err) => console.log(err));

        Swal.fire("แก้ไข!", "แก้ไขข้อมูลเสร็จสิ้น", "success");
      }
    });
  };
  const isInsertHandler = () => {
    setIsInsert(!isInsert);
  };
  const cancelInsertHadnler = () => {
    setIsInsert(false);
  };

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "ลบข้อมูลนี้หรือไม่?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const rshTemp = [...rshList];
        const dataTemp = rshTemp.filter((i) => i.id !== id);
        console.log(dataTemp);
        const response = await fetch(
          "http://localhost:8080/researcher/delete",
          {
            method: "post",
            body: JSON.stringify({ id: id }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        )
          .then((data) => {
            if (data.status === 500) {
              Swal.fire(
                "ไม่สำเร็จ!",
                "ไม่สามารถลบได้เนื่องจากผู้วิจัยอยู่ในกลุ่ม",
                "error"
              );
              // window.alert("ไม่สามารถลบได้เนื่องผู้วิจัยอยู่ในกลุ่ม");
              throw new Error("ไม่สามารถลบได้");
            }

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
            Swal.fire("ลบ!", "ข้อมูลของคุณถูกลบเรียบร้อย", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

    Swal.fire({
      title: 'เพิ่มข้อมูล?',
      text: "คุณต้องการเพิ่มข้อมูลด้วยไฟล์ Excel หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'เพิ่ม!',
      cancelButtonText: 'ยกเลิก',

    }).then(async(result) => {
      if (result.isConfirmed) {
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
        
        Swal.fire(
          'เพิ่มข้อมูลสำเร็จ!',
          'ข้อมูลของนักวิจัยได้ถูกเพิ่มเรียบร้อย',
          'success'
        )
        // console.table(data.data);
      });
      }
    })



    
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
    setItemOffSet(0);
    setNowPage(0);
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
    setNowPage(0);
    setItemOffSet(0);
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
  const [nowPage, setNowPage] = useState(0);

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
            nowPage={nowPage}
            setNowPage={setNowPage}
            itemOffset={itemOffset}
            setItemOffSet={setItemOffSet}
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
