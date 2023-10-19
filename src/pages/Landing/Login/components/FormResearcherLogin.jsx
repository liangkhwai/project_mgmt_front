import React, { useState, useContext } from "react";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai/index";
import AuthContext from "../../../../context/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const FormResearcherLogin = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [userPwd, setUserpwd] = useState({
    uuid: "",
    pwd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUserpwd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://34.126.100.66:8080/auth/login", {
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
      console.log(data);
      ctx.setGrpId(data.grpId);
      localStorage.setItem("grpId", data.grpId);
      ctx.loginHandler(data.userId);
      console.log(data.userName);
      ctx.usernameHandler(data.userName);
      ctx.setRole(data.role);
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: "กรุณาตรวจสอบรหัสนักศึกษากับรหัสผ่าน",
      });
    }
  };
  return (
    <div>
      <div className="my-3 text-center font-bold text-gray-900">
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
            className="input w-full rounded border-gray-400 pl-10 pr-4"
            placeholder="รหัสนักศึกษา"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-1"></div>
        <div className="relative">
          <input
            type="password"
            name="pwd"
            className="input w-full rounded border-gray-400 pl-10 pr-4"
            placeholder="รหัสผ่าน"
            onChange={(e) => handleInputChange(e)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiTwotoneLock color="#1976D2" />
          </div>
        </div>
        <div className="mb-2"></div>
        <button
          className="my-2 h-10 w-full rounded bg-blue-800 text-center text-white"
          onClick={() => handleSubmit()}
        >
          Login
        </button>
        <div className="pb-5"></div>
      </div>
    </div>
  );
};

export default FormResearcherLogin;
