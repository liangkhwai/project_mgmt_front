import React, { Fragment, useEffect, useState } from "react";
import EditRshRow from "./EditRshRow";
import ResearcherList from "./ResearcherList";
import InsertResearcherRow from "./InsertResearcherRow";
// import { Modal, Box } from "@mui/material";
import FileDetail from "./FileDetail";
import ReactModal from "react-modal";
const TableResearcher = ({
  rshList,
  editRshId,
  editFormData,
  editFormHandler,
  cancelEditFormHandler,
  editFormSubmitHandler,
  setEditRshIdHandler,
  deleteHandler,
  isInsert,
  cancelInsertHadnler,
  insertFormHandler,
  insertFormSubmitHandler,
  fileRef,
  fileChangeHandler,
  modalOpen,
  closeModalHandler,
  file,
  fileSubmitHandler,
  fileInputHandler,
  isInsertHandler,
  roomSelected,
  roomData,
  selectorHandler,
  editSelectedRoom,
  insertSelectedRoom,
  insertSelectorRoom,
  insertMenuRoom,
  setRshList,
  loadedResearcher,
}) => {
  useEffect(() => {
    setRshList(loadedResearcher);
  }, []);

  const customStyles = {

    content: {
      width:"30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  ReactModal.setAppElement("#root");

  return (
    <div className="pt-10 mx-10">
      <table className="table table-responsive w-full border">
        <thead>
          <tr>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ห้อง</th>
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
                  editSelectedRoom={editSelectedRoom}
                  roomData={roomData}
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
              insertSelectedRoom={insertSelectedRoom}
              roomData={roomData}
              roomSelected={roomSelected}
              insertSelectorRoom={insertSelectorRoom}
              insertMenuRoom={insertMenuRoom}
            />
          ) : null}
        </tbody>
      </table>
      <input
        type="file"
        ref={fileRef}
        onChangeCapture={(e) => fileChangeHandler(e)}
        className="hidden"
      />
      {/* <Modal open={modalOpen} onClose={closeModalHandler}>
        <Box sx={style}>
          <FileDetail
            file={file}
            onClose={closeModalHandler}
            submit={fileSubmitHandler}
            roomSelected={roomSelected}
            roomData={roomData}
            selectorHandler={selectorHandler}
          />
        </Box>
      </Modal> */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModalHandler}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FileDetail
          file={file}
          onClose={closeModalHandler}
          submit={fileSubmitHandler}
          roomSelected={roomSelected}
          roomData={roomData}
          selectorHandler={selectorHandler}
        />
      </ReactModal>
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
    </div>
  );
};

export default TableResearcher;
