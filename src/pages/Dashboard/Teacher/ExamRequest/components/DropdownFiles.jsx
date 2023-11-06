import React from "react";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { ImFilePdf } from "react-icons/im";

const DropdownFiles = ({ files }) => {
  const handleClickFile = (filename) => {
    window.open(`http://34.124.162.203:8080/files/request/${filename}`, "_blank");
  };
  const menuItem = files.map((file, idx) => (
    <MenuItem
      key={file.id}
      className="cursor-pointer !p-3 hover:bg-gray-100"
      onClick={() => handleClickFile(file.originalname)}
    >
      {file.originalname}
    </MenuItem>
  ));

  const menu = <Menu>{menuItem}</Menu>;
  return (
    <div>
      <Dropdown overlay={menu}>
        <button>
          <ImFilePdf />
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownFiles;
