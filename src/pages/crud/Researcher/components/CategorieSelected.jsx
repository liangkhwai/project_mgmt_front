import React from "react";

const CategorieSelected = ({ roomSelected, roomData, selectorHandler }) => {
  console.log(roomSelected);
  return (
    <div className="flex gap-5 justify-center">
      <div>ห้อง</div>
      <div>
        <select value={roomSelected} onChange={(e) => selectorHandler(e)}>
          {roomData.map((item, idx) => (
            <option key={item.id} value={item.id}>
               {`${item.room} (${item.year.substring(2)})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorieSelected;
