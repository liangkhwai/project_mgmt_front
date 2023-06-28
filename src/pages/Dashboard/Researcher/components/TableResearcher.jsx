import React, { Fragment, useEffect, useState } from "react";
import EditRshRow from "./EditRshRow";
import ResearcherList from "./ResearcherList";
import InsertResearcherRow from "./InsertResearcherRow";
import ReactPaginate from "react-paginate";
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
  itemOffset,
  setItemOffSet,
  nowPage,
  setNowPage,
}) => {
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
  const pageCount = Math.ceil(rshList.length / ItemPerPage);

  const handlePageClick = (event) => {
    const newOffSet = (event.selected * ItemPerPage) % rshList.length;
    // const newOffSet = event.selected;
    // console.log(event.selected);
    // // console.log(ItemPerPage);
    // // console.log(rshList.length);
    // // console.log(newOffSet);
    setItemOffSet(newOffSet);
    setNowPage(event.selected);
  };

  // end Paginate

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
          {currentItems.map((rsh, idx) => (
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
      <div className="">
        <div>{`Showing ${startIndex + 1} - ${Math.min(
          endIndex,
          rshList.length
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
          // pageClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          pageLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          activeClassName="font-medium text-blue-700"
          activeLinkClassName="!bg-blue-100"
          breakLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          // activeLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          previousLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          // previousClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          nextLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
          // nextClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default TableResearcher;
