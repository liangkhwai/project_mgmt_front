import React, { useContext, useEffect } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai/index";
import { redirect, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import Swal from "sweetalert2";
const Header = ({ openHandler }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = React.useRef(null);

  const logoutHandler = () => {
    Swal.fire({
      title: "คุณต้องการออกจากระบบใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        ctx.logoutHandler().then(() => navigate("/"));
      }
    });
  };

  const lineNotify = async () => {
    window.open("http://localhost:1234/auth", "_self");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="item-center flex h-14 justify-between shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={openHandler} className="ml-5">
          <AiOutlineMenuUnfold size="2em" color="grey" />
        </button>
        {/* <div className="">Search input</div> */}
      </div>
      <div className="flex items-center gap-4">
        {/* <div>NotificationsMenu</div> */}
        {ctx.role === "teacher" && (
          <div>
            <button
              className="rounded-xl bg-green-500 px-4 py-2 text-white"
              onClick={lineNotify}
            >
              เปิดแจ้งเตือนขึ้นสอบ
            </button>
          </div>
        )}
        <div className="relative">
          <div
            className="relative flex items-center gap-2 px-2 py-2 transition-colors delay-75 ease-in-out hover:cursor-pointer hover:text-light-blue-400"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>{ctx.getUsername()} </div>
            <div className="">
              <div className="">
                {isDropdownOpen ? <CaretUp /> : <CaretDown />}
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className="absolute  -translate-x-1/2 transform rounded-b-xl rounded-t-xl border border-gray-300 shadow-md"
              ref={menuRef}
            >
              <div className="w-max rounded-xl bg-white">
                {ctx.role !== "admin" && (
                  <>
                    <div
                      className="cursor-pointer rounded-t-xl px-2 py-2 hover:bg-light-blue-300 hover:text-white"
                      onClick={() => {
                        navigate("/dashboard/personal");
                        setIsDropdownOpen(false);
                      }}
                    >
                      ข้อมูลส่วนตัว
                    </div>
                  </>
                )}
                <div
                  className={`${
                    ctx.role === "admin" && "rounded-t-xl hover:rounded-t-xl"
                  } cursor-pointer px-2 py-2 hover:bg-light-blue-300  hover:text-white`}
                  onClick={() => {
                    navigate("/dashboard/profile/edit");
                    setIsDropdownOpen(false);
                  }}
                >
                  แก้ไขรหัสผ่าน
                </div>
                <div
                  className="cursor-pointer rounded-b-xl px-2 py-2 hover:bg-light-blue-300 hover:text-white"
                  onClick={logoutHandler}
                >
                  ออกจากระบบ
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <button
          className="mr-5 rounded-xl bg-gray-300 p-2 "
          onClick={logoutHandler}
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Header;
