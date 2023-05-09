import React, { useState } from "react";
import HeaderButton from "./HeaderButton";
import HeaderFilter from "./HeaderFilter";
import TableCategorieResearcher from "./TableCategorieResearcher";

const HeaderResearcher = ({
  setMenu,
  menu,
  roomData,
  filterTypeHandler,
  filterRoom,
  filterRoomRef,
}) => {
  return (
    <div className="">
      <HeaderButton setMenu={setMenu} menu={menu} />
      {menu === "filter" ? (
        <HeaderFilter
          dataRoomList={roomData}
          filteredHandler={filterTypeHandler}
          filterRoom={filterRoom}
          filterRoomRef={filterRoomRef}
        />
      ) : (
        <TableCategorieResearcher dataRoomList={roomData} />
      )}
    </div>
  );
};

export default HeaderResearcher;
