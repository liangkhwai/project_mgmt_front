import React, { useState } from "react";
import HeaderButton from "./HeaderButton";
import HeaderFilter from "./HeaderFilter";
import TableCategorieResearcher from "./TableCategorieResearcher";

const HeaderResearcher = ({
  setMenu,
  menu,
  roomData,
  setRoomData,
  filterTypeHandler,
  filterRoom,
  filterRoomRef,
  setRshList,
  rshList,
  loadedResearcher,
  defaultRoomData,
  setLoadedResearcher,
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
        <TableCategorieResearcher
          dataRoomList={defaultRoomData}
          setRoomData={setRoomData}
          setRshList={setRshList}
          rshList={rshList}
          loadedResearcher={loadedResearcher}
          setLoadedResearcher={setLoadedResearcher}
        />
      )}
    </div>
  );
};

export default HeaderResearcher;
