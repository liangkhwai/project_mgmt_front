import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneLock, AiOutlineUser } from "react-icons/ai";
import AuthContext from "../../../../context/auth";

const FormTeacherLogin = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailPwd, setEmailPwd] = useState({
    email: "",
    pwd: "",
  });

  const setEmailPwdChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmailPwd((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmitHandler = async () => {
    const formData = {
      email: emailPwd.email,
      pwd: emailPwd.pwd,
    };

    const response = await fetch("http://localhost:8080/auth/loginTch", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
        credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.status === 200) {
          ctx.loginHandler();
          console.log(data.userName);
          ctx.usernameHandler(data.userName);
          navigate("/dashboard");
        }
      });
  };

  return (
    <div>
      <div className="text-center font-bold my-3 text-gray-900">
        Login ด้วย Account อาจารย์
      </div>
      <div className="px-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineUser color="#1976D2" />
          </div>
          <input
            type="text"
            name="email"
            className="input pl-10 pr-4 w-full rounded border-gray-400"
            placeholder="อีเมลล์"
            onChange={(e) => setEmailPwdChangeHandler(e)}
          />
        </div>
        <div className="mb-1"></div>
        <div className="relative">
          <input
            type="password"
            name="pwd"
            className="input pl-10 pr-4 w-full rounded border-gray-400"
            placeholder="รหัสผ่าน"
            onChange={(e) => setEmailPwdChangeHandler(e)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiTwotoneLock color="#1976D2" />
          </div>
        </div>
        <div className="mb-2"></div>
        <button
          className="text-white text-center w-full rounded bg-blue-800 h-10 my-2"
          onClick={() => formSubmitHandler()}
        >
          Login
        </button>
        <div className="text-blue-600 text-center mb-5 my-2">
          แจ้งปัญหา Login
        </div>
      </div>
    </div>
  );
};

export default FormTeacherLogin;
