import React, { useEffect, useRef, useState } from "react";
import { AddButton } from "../../../../../../UI/button";
import { useCombobox } from "downshift";
import ComboBox from "./ComboBoxSearcherRsh";
// import { Autocomplete, TextField } from "@mui/material";
// import { makeStyles } from "@mui/styles";

const InputForm = ({
  setRshList,
  loadedResearcherList,
  setLoadedResearcherList,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // const [loadedResearcherList, setLoadedResearcherList] = useState([]);
  // const [items, setItems] = useState(loadedResearcherList);
  // const [selectedItem, setSelectedItem] = useState(null);
  // useEffect(() => {
  //   async function fetchRshList() {
  //     const res = await fetch("http://localhost:8080/researcher/list", {
  //       method: "get",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     // console.log(typeof data);
  //     setLoadedResearcherList(data);
  //   }
  //   fetchRshList();
  // }, []);

  const [inputValue, setInputValue] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    grade: "",
  });
  const inputFormChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const inputRef = useRef([]);

  const inputFormSubmitHandler = () => {
    console.log(inputValue);
    setRshList((prev) => [...prev, { ...selectedItem }]);
    setLoadedResearcherList((prev) =>
      prev.filter((item) => item.id !== selectedItem.id)
    );
    setSelectedItem(null);
    // inputRef.current.value = "";
    console.log(inputRef.current);
    const allInput = document.querySelectorAll("input.input.w-full");
    console.log(allInput);
    console.log(allInput.forEach((item) => (item.value = "")));
  };

  console.log(loadedResearcherList);

  return (
    <div>
      <div>เพิ่มผู้วิจัยในกลุ่ม</div>
      <table>
        <tbody>
          <tr className="">
            <td>
              {loadedResearcherList && (
                <ComboBox
                  loadedResearcherList={loadedResearcherList}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              )}
            </td>
            <td>
              <input
                ref={inputRef}
                type="text"
                className="input w-full"
                name="firstname"
                id=""
                placeholder="ชื่อ"
                disabled
                value={selectedItem?.firstname}
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                ref={inputRef}
                type="text"
                className="input w-full "
                name="lastname"
                id=""
                placeholder="นามสกุล"
                disabled
                value={selectedItem?.lastname}
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                ref={inputRef}
                type="text"
                className="input w-full"
                name="tel"
                id=""
                placeholder="เบอร์โทร"
                disabled
                value={selectedItem?.tel === null ? "" : selectedItem?.tel}
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                ref={inputRef}
                type="text"
                className="input w-full"
                name="email"
                id=""
                placeholder="E-mail"
                disabled
                value={selectedItem?.email === null ? "" : selectedItem?.email}
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                ref={inputRef}
                type="text"
                className="input w-full"
                name="grade"
                id=""
                placeholder="เกรดเฉลี่ยเทอมล่าสุด"
                disabled
                value={selectedItem?.grade === null ? "" : selectedItem?.grade}
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <AddButton onClick={() => inputFormSubmitHandler()}>
                เพิ่ม
              </AddButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InputForm;
