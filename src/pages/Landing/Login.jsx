import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai/index";
const Login = () => {
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

  const checkToken = async () => {
    const response = await fetch("http://localhost:8080/auth/check", {
      method: "get",

      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "post",
      body: JSON.stringify({
        email: userPwd.uuid,
        password: userPwd.pwd,
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.status === 200) {
      navigate("/dashboard");
    }
    console.log(data);
  };

  return (
    <div>
      <div className="flex h-28 bg-blue-50">
        <h1 className="flex items-center ml-44 text-2xl">เข้าสู่ระบบ</h1>
      </div>

      <div className="w-full flex justify-center items-center my-10">
        <div className="w-2/5 ">
          <div className="bg-blue-800 text-white w-fit px-3 py-2 rounded-t-md">
            สำหรับผู้วิจัย และอาจารย์
          </div>
          <div className="border border-blue-800 rounded-md rounded-tl-none">
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
                  type="text"
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
                onClick={handleSubmit}
              >
                Login
              </button>
              <div className="text-blue-600 text-center mb-5 my-2">
                แจ้งปัญหา Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
