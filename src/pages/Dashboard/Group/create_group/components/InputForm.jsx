import React, { useEffect, useState } from "react";
import { AddButton } from "../../../../../UI/button";

const InputForm = ({ setRshList }) => {
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
    setRshList((prev) =>  [...prev, {...inputValue}] );
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="input w-full"
                name="student_id"
                id=""
                placeholder="รหัสนักศึกษา"
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full"
                name="firstname"
                id=""
                placeholder="ชื่อ"
                disabled
                onChange={(e) => inputFormChangeHandler(e)}
              />
            </td>
            <td>
              <input
                type="text"
                className="input w-full"
                name="lastname"
                id=""
                placeholder="นามสกุล"
                disabled
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
