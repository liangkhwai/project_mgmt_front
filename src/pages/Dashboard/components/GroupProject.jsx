import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const GroupProject = ({
  group,
  itemOffset,
  nowPage,
  setNowPage,
  setItemOffSet,
}) => {
  if (!group || !group.groupWithBoards) {
    return <div>loading...</div>;
  }

  const ItemPerPage = 5;
  const startIndex = nowPage * ItemPerPage;
  const endIndex = startIndex + ItemPerPage;
  const endOffSet = itemOffset + ItemPerPage;

  // Ensure that group.groupWithBoards is an array before using slice()
  const currentItems = Array.isArray(group.groupWithBoards)
    ? group.groupWithBoards.slice(itemOffset, endOffSet)
    : [];

  const pageCount = Math.ceil(
    Array.isArray(group.groupWithBoards)
      ? group.groupWithBoards.length / ItemPerPage
      : 0
  );

  const handlePageClick = (event) => {
    const newOffSet =
      (event.selected * ItemPerPage) % group.groupWithBoards.length;

    setItemOffSet(newOffSet);
    setNowPage(event.selected);
  };

  return (
    <div className="w-full border rounded-xl shadow-xl">
      <div className="my-5 mx-10 font-bold text-xl">กลุ่มโปรเจค</div>
      <table className="table w-full">
        <thead>
          <tr style={{ backgroundColor: "#F1F5F9" }} className="">
            <th className="text-start pl-5">ชื่อหัวข้อ</th>
            <th className="">สมาชิก</th>
            <th className="">อาจารย์ที่ปรึกษา</th>
            <th className="">ประธานกรรมการสอบ</th>
            <th className="">กรรมการสอบ</th>
            <th className="">สถานะปัจจุบัน</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, idx) => (
            <tr key={idx}>
              <td className="pl-5">{item.title}</td>
              <td className="text-center">{item.researcher_count}</td>
              <td className="text-center">{item.advisor_name}</td>
              <td className="text-center">{item.board1_name}</td>
              <td className="text-center">{item.board2_name}</td>
              <td className="text-center">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mx-5">
        <div>{`Showing ${startIndex + 1} - ${Math.min(
          endIndex,
          Array.isArray(group.groupWithBoards)
            ? group.groupWithBoards.length
            : 0
        )} of ${
          Array.isArray(group.groupWithBoards)
            ? group.groupWithBoards.length
            : 0
        } results`}</div>
        <div className="my-5">
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
            pageLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover-bg-blue-100"
            activeClassName="font-medium text-blue-700"
            activeLinkClassName="bg-blue-100"
            breakLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover-bg-blue-100"
            previousLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover-bg-blue-100"
            nextLinkClassName="mx-1 px-2 py-1 text-center text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover-bg-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupProject;
