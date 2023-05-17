import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai/index";
import AuthContext from "../../../context/auth";
import HeaderButtonChange from "./components/HeaderButtonChange";
import FormResearcherLogin from "./components/FormResearcherLogin";
import FormTeacherLogin from "./components/FormTeacherLogin";
const Login = () => {
  const [headSelected, setHeadSelected] = useState("researcher");

  return (
    <div>
      <div className="flex h-28 bg-blue-50">
        <h1 className="flex items-center ml-44 text-2xl">เข้าสู่ระบบ</h1>
      </div>

      <div className="w-full flex justify-center items-center my-10">
        <div className="w-2/5 ">
          <HeaderButtonChange
            setHeadSelected={setHeadSelected}
            headSelected={headSelected}
          />
          <div className="border border-blue-800 rounded-md rounded-tl-none">
            {headSelected === "researcher" ? (
              <FormResearcherLogin />
            ) : (
              <FormTeacherLogin />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
