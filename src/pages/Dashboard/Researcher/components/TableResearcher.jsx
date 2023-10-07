import React, { Fragment, useEffect, useState, useContext } from "react";
import EditRshRow from "./EditRshRow";
import ResearcherList from "./ResearcherList";
import InsertResearcherRow from "./InsertResearcherRow";
import ReactPaginate from "react-paginate";
import FileDetail from "./FileDetail";
import ReactModal from "react-modal";
import AuthContext from "../../../../context/auth";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

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
  itemOffset,
  setItemOffSet,
  nowPage,
  setNowPage,
}) => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    setRshList(loadedResearcher);
  }, []);

  // start Paginate

  const ItemPerPage = 10;
  // const [itemOffset, setItemOffSet] = useState(0);
  const startIndex = nowPage * ItemPerPage;
  const endIndex = startIndex + ItemPerPage;
  const endOffSet = itemOffset + ItemPerPage;
  const currentItems = rshList.slice(itemOffset, endOffSet);
  const [key, SetKey] = useState(0);
  const [isLateSortOrder, setIsLateSortOrder] = useState("desc");
  const [waitRegisterSortOrder, setWaitRegisterSortOrder] = useState("desc");
  // const [currentItems, setCurrentItems] = useState(rshList.slice(itemOffset, endOffSet))
  const pageCount = Math.ceil(rshList.length / ItemPerPage);

  const handlePageClick = (event) => {
    const newOffSet = (event.selected * ItemPerPage) % rshList.length;
    // const newOffSet = event.selected;
    // console.log(event.selected);

    setItemOffSet(newOffSet);
    setNowPage(event.selected);
  };
  console.log(rshList);
  const customStyles = {
    content: {
      width: "30%",
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
    <div className="mx-10 mb-10 pt-10">
      <table className="table-responsive table w-full border" key={key}>
        <thead>
          <tr>
            <th className="border  py-2">ลำดับ</th>

            <th className="border  py-2">รหัสนักศึกษา</th>
            <th className="border  py-2">ชื่อ</th>
            <th className="border  py-2">นามสกุล</th>
            <th className="border  py-2">ห้อง</th>
            {/* <th className="py-2 border ">อีเมลล์</th> */}
            <th className="border  py-2">เบอร์โทร</th>
            <th className="border  py-2">เกรดเฉลี่ย</th>

            <th className="border  py-2">สถานะโปรเจค</th>
            <th className="border  py-2">
              เกรด
              <br />
              โปรเจค
            </th>
            <th
              className="border py-2 cursor-pointer"
              // onClick={() =>
              //   setRshList((prev) => prev.sort((a, b) => b.isLate - a.isLate))
              // }
              onClick={() => {
                const sortedList = rshList.slice().sort((a, b) => {
                  if (isLateSortOrder === "asc") {
                    return a.isLate - b.isLate;
                  } else {
                    return b.isLate - a.isLate;
                  }
                });

                setRshList(sortedList);
                setIsLateSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                // const newOffset = nowPage * ItemPerPage;
                // const newEndOffset = newOffset + ItemPerPage;
                // setRshList(sortedList.slice(newOffset, newEndOffset));

                // setIsLateSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              }}
            >
              <div className="flex h-full w-full items-center justify-center gap-1 font-bold">
                ติด I {isLateSortOrder === "desc" ? <CaretUp /> : <CaretDown />}
              </div>
            </th>
            <th
              className="border  py-2 cursor-pointer"
              onClick={() => {
                const sortedList = rshList.slice().sort((a, b) => {
                  if (waitRegisterSortOrder === "asc") {
                    return a.waitRegister - b.waitRegister;
                  } else {
                    return b.waitRegister - a.waitRegister;
                  }
                });

                setRshList(sortedList);
                setWaitRegisterSortOrder((prev) =>
                  prev === "asc" ? "desc" : "asc",
                );
              }}
            >
              <div className="flex h-full w-full items-center justify-center gap-1 font-bold">
                รอลงทะเบียน{" "}
                {waitRegisterSortOrder === "desc" ? <CaretUp /> : <CaretDown />}
              </div>
            </th>
            <th className="border  py-2">
              สถานะ
              <br />
              การใช้งาน
            </th>
            {ctx.role === "admin" && (
              <Fragment>
                <th className="border  py-2">แก้ไข</th>
                <th className="border  py-2">ลบ</th>
              </Fragment>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((rsh, idx) => (
            <Fragment key={idx}>
              {editRshId === rsh.id ? (
                <EditRshRow
                  grpDetail={rsh.group}
                  rsh={editFormData}
                  editFormHandler={editFormHandler}
                  cancelEditFormHandler={cancelEditFormHandler}
                  editFormSubmitHandler={editFormSubmitHandler}
                  editSelectedRoom={editSelectedRoom}
                  roomData={roomData}
                  idx={idx}
                />
              ) : (
                <ResearcherList
                  rsh={rsh}
                  idx={idx}
                  startIndex={startIndex}
                  setEditRshIdHandler={setEditRshIdHandler}
                  deleteHandler={deleteHandler}
                  setRshList={setRshList}
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
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
      {ctx.role === "admin" && (
        <div className="my-5 flex justify-end ">
          <button
            className="mx-5 rounded-lg bg-green-600  px-3 py-2 text-white shadow-lg hover:bg-green-500"
            onClick={() => fileInputHandler()}
          >
            นำเข้าข้อมูล (Excel)
          </button>
          <button
            className="rounded-lg bg-green-600   px-3 py-2 text-white shadow-lg hover:bg-green-500"
            onClick={() => isInsertHandler()}
          >
            เพิ่มนักวิจัย
          </button>
        </div>
      )}
      <div className="pb-5">
        <div>{`Showing ${startIndex + 1} - ${Math.min(
          endIndex,
          rshList.length,
        )} of ${rshList.length} results`}</div>
        <ReactPaginate
          forcePage={nowPage}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center mt-4"
          // pageClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          pageLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          activeClassName="font-medium text-blue-700"
          activeLinkClassName="!bg-blue-100"
          breakLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          // activeLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          previousLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          // previousClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          nextLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
          // nextClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border  rounded-md shadow-sm hover:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default TableResearcher;
