import React, { useState, useContext } from "react";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai/index";
import AuthContext from "../../../../context/auth";
import { useNavigate } from "react-router-dom";
const FormResearcherLogin = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [userPwd, setUserpwd] = useState({
    uuid: "",
    pwd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserpwd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "post",
      body: JSON.stringify({
        id: userPwd.uuid,
        password: userPwd.pwd,
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.status === 200) {
      ctx.loginHandler();
      console.log(data.userName);
      ctx.usernameHandler(data.userName);
      navigate("/dashboard");
    }
    console.log(data);
  };
  return (
    <div>
      <div className="text-center font-bold my-3 text-gray-900">
        Login ด้วย Account ผู้วิจัย
      </div>
      <div className="px-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineUser color="#1976D2" />
          </div>
          <input
            type="text"
            name="uuid"
            className="input pl-10 pr-4 w-full rounded border-gray-400"
            placeholder="รหัสนักศึกษา"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-1"></div>
        <div className="relative">
          <input
            type="password"
            name="pwd"
            className="input pl-10 pr-4 w-full rounded border-gray-400"
            placeholder="รหัสผ่าน"
            onChange={(e) => handleInputChange(e)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiTwotoneLock color="#1976D2" />
          </div>
        </div>
        <div className="mb-2"></div>
        <button
          className="text-white text-center w-full rounded bg-blue-800 h-10 my-2"
          onClick={() => handleSubmit()}
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

export default FormResearcherLogin;
