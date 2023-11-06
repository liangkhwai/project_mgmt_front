import React from "react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/auth";
import { useNavigate } from "react-router-dom";
const PasswordForm = ({ setInformation, information }) => {
  const [pwd, SetPwd] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const ctx = React.useContext(AuthContext);

  const onChangeInputHandler = (e) => {
    SetPwd({
      ...pwd,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    // e.preventDefault();
    console.log(information);
    Swal.fire({
      title: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (pwd.newPassword !== pwd.confirmPassword) {
          Swal.fire({
            title: "รหัสผ่านไม่ตรงกัน",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
          return;
        } else {
          await fetch("http://34.124.162.203:8080/auth/change/password", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: information.data.id,
              oldPassword: pwd.oldPassword,
              newPassword: pwd.newPassword,
              role: information.role,
            }),
          }).then(async (res) => {
            await res.json();

            if (res.status === 200) {
              Swal.fire({
                title: "บันทึกข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then((res) => {
                ctx.logoutHandler();
                navigate("/");
              });
            } else {
              Swal.fire({
                title: "รหัสปัจจุบันไม่ถูกต้อง กรุณากรอกใหม่",
                icon: "error",
                confirmButtonText: "ตกลง",
              });
            }
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex w-7/12 justify-center rounded-xl border py-10">
          <table className="text-right">
            <tr>
              <td>
                {" "}
                <label htmlFor="" className="mr-5">
                  รหัสผ่านปัจจุบัน
                </label>
              </td>
              <td>
                <input
                  type="password"
                  name="oldPassword"
                  id=""
                  className="rounded-xl border-light-blue-400"
                  onChange={(e) => onChangeInputHandler(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label htmlFor="" className="mr-5">
                  รหัสผ่านใหม่
                </label>
              </td>
              <td>
                <input
                  type="password"
                  name="newPassword"
                  id=""
                  className="rounded-xl border-light-blue-400"
                  onChange={(e) => onChangeInputHandler(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label htmlFor="" className="mr-5">
                  ยืนยันรหัสผ่านใหม่
                </label>
              </td>
              <td>
                <input
                  type="password"
                  name="confirmPassword"
                  id=""
                  className="rounded-xl border-light-blue-400"
                  onChange={(e) => onChangeInputHandler(e)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="">
                <div className="pt-7 text-center">
                  <button
                    className="rounded-xl bg-green-300 px-4 py-2 text-white hover:bg-green-500"
                    onClick={onSubmitHandler}
                  >
                    ยืนยัน
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
