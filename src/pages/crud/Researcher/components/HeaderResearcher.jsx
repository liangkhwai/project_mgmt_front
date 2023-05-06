import React, { useState } from "react";
import HeaderButton from "./HeaderButton";
import HeaderFilter from "./HeaderFilter";
import TableCategorieResearcher from "./TableCategorieResearcher";

const HeaderResearcher = ({ setMenu, menu, roomData,filterTypeHandler,filterRoom }) => {
 


  const test = "BIS3N1"
  const result = test.substring(0,-3)
  console.log(result)


  return (
    <div className="">
      <HeaderButton setMenu={setMenu} menu={menu} />
      {menu === "filter" ? (
        <HeaderFilter
          dataRoomList={roomData}
          filteredHandler={filterTypeHandler}
          filterRoom={filterRoom}
        />
      ) : (
        <TableCategorieResearcher dataRoomList={roomData} />
      )}
    </div>
  );
};

export default HeaderResearcher;
