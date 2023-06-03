import React, { useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";
// import { Autocomplete, TextField } from "@mui/material";
// import { makeStyles } from "@mui/styles";

const InputForm = ({ setRshList }) => {
  const [loadedResearcherList, setLoadedResearcherList] = useState([]);

  useEffect(() => {
    async function fetchRshList() {
      const res = await fetch("http://localhost:8080/researcher/list", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      // console.log(typeof data);
      setLoadedResearcherList(data);
    }
    fetchRshList();
  }, []);

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

  const inputFormSubmitHandler = () => {
    console.log(inputValue);
    setRshList((prev) => [...prev, { ...inputValue }]);
  };

  console.log(loadedResearcherList);

  const rshTemp = loadedResearcherList;
  const optionsResearcherId = rshTemp.map((item) => item.student_id);

  // const useStyles = makeStyles((theme) => ({
  //   inputRoot: {
  //     "& .MuiInputBase-input": {
  //       "&:focus": {
  //         boxShadow: "none",
  //       },
  //     },
  //   },
  // }));
  // const classes = useStyles();

  return (
    <div>
      <div>เพิ่มผู้วิจัยในกลุ่ม</div>
      <table>
        <tbody>
          <tr>
            <td>
              {/* <Autocomplete
                disablePortal
                classes={{ inputRoot: classes.inputRoot }}
                id="combo-box-demo"
                // sx={{ width: 300 }}
                sx={{ width: "150px" }}
                options={optionsResearcherId}
                renderInput={(rsh) => (
                  <TextField {...rsh} label="รหัสนักศึกษา" />
                )}
              /> */}
              {/* <input
                type="text"
                className="input w-full"
                name="student_id"
                id=""
                placeholder="รหัสนักศึกษา"
                onChange={(e) => inputFormChangeHandler(e)}
              /> */}
            </td>
            <td>
              {/* <TextField disabled label="ชื่อ" />
              <TextField
                label="ชื่อ"
                className="focus:border-white focus:ring-0 "
                autoFocus={false}
              />
              <TextField
                label="ชื่อ"
                className="focus:border-white focus:ring-0 "
                autoFocus={false}
              />
              <TextField
                label="ชื่อ"
                className="focus:border-white focus:ring-0 "
                autoFocus={false}
              /> */}

              <input
                type="text"
                className="input w-full"
                name="firstname"
                id=""
                placeholder="ชื่อ"
                // disabled
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full "
                name="lastname"
                id=""
                placeholder="นามสกุล"
                // disabled
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full"
                name="tel"
                id=""
                placeholder="เบอร์โทร"
                disabled
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full"
                name="email"
                id=""
                placeholder="E-mail"
                disabled
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full"
                name="grade"
                id=""
                placeholder="เกรดเฉลี่ยเทอมล่าสุด"
                disabled
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
