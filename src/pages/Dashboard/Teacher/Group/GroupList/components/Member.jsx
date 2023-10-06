import React, { useContext, useState } from "react";
import AuthContext from "../../../../../../context/auth";
import { RiVipCrown2Fill } from "react-icons/ri/index";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Member = ({
  grpDetail,
  rsh,
  idx,
  deleteFromGroupHandler,
  changeLeaderClick,
  grpId,
  setGroupMember,
  groupMember,
}) => {
  const ctx = useContext(AuthContext);
  const [isTermEdit, setIsTermEdit] = useState(false);
  const [isGradeProjectEdit, setIsGradeProjectEdit] = useState(false);
  const editHandlerClick = async (grpId, rshId) => {
    setIsTermEdit(true);
  };

  const checkBoxRef = React.useRef(null);
  const waitRegisterRef = React.useRef(null);

  useEffect(() => {
    console.log(groupMember);
  }, [groupMember]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setGroupMember((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === rsh.id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return updatedData;
    });
  };

  const updateMemberGroup = async (rsh) => {
    console.log(groupMember);
    console.log(rsh);
    const res = await fetch(`http://localhost:8080/researcher/update`, {
      method: "put",
      body: JSON.stringify({ ...rsh }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    if (name === "term") {
      setIsTermEdit(false);
    } else if (name === "grade_project") {
      if (rsh.isEditGradeProject) {
        Swal.fire({
          title: "ผิดพลาด",
          text: "คุณได้ทำการเปลี่ยนแปลงเกรดโปรเจคไปแล้ว",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        if (rsh.isLate) {
          Swal.fire({
            title: "การเปลี่ยนแปลงเกรดโปรเจค",
            text: "คุณต้องการเปลี่ยนแปลงข้อมูลหรือไม่ <br/>เมื่อผู้วิจัยติด I แล้วจะยังสามารถเปลี่ยนแปลงเกรดโปรเจคได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่",
            html: `<div style="color:red">คุณต้องการเปลี่ยนแปลงข้อมูลหรือไม่ <br/>เมื่อผู้วิจัยติด I แล้วจะยังสามารถเปลี่ยนแปลงเกรดโปรเจคได้</div>`,
            allowOutsideClick: false,
          }).then(async (result) => {
            if (result.isConfirmed) {
              if (rsh.grade_project === "") {
                Swal.fire({
                  title: "ผิดพลาด",
                  text: "กรุณากรอกเกรดโปรเจค",
                  icon: "warning",
                  showConfirmButton: true,
                  confirmButtonText: "ตกลง",
                  timer: 3000,
                  timerProgressBar: true,
                });
                return;
              }

              const response = await fetch(
                "http://localhost:8080/researcher/update",
                {
                  method: "put",
                  body: JSON.stringify({ ...rsh }),
                  headers: { "Content-Type": "application/json" },
                },
              );
              const data = await response.json();
              Swal.fire("เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว", "", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              setGroupMember((prevData) => {
                const updatedData = prevData.map((item) => {
                  if (item.id === rsh.id) {
                    return { ...item, grade_project: "" };
                  }
                  return item;
                });
                return updatedData;
              });

              Swal.fire("ยกเลิกการเปลี่ยนแปลง", "", "error");
            }
          });
        } else {
          if (rsh.grade_project === "") {
            Swal.fire({
              title: "ผิดพลาด",
              text: "กรุณากรอกเกรดโปรเจค",
              icon: "warning",
              showConfirmButton: true,
              confirmButtonText: "ตกลง",
              timer: 3000,
              timerProgressBar: true,
            });
            setIsGradeProjectEdit(false);
            return;
          }
          Swal.fire({
            title: "การเปลี่ยนแปลงเกรดโปรเจค",
            text: "คุณต้องการเปลี่ยนแปลงข้อมูลเกรดโปรเจคหรือไม่ เมื่อเปลี่ยนแล้วจะไม่สามารถเปลี่ยนแปลงได้อีก",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่",
            allowOutsideClick: false,
          }).then(async (result) => {
            if (result.isConfirmed) {
              if (rsh.grade_project !== "F") {
                setGroupMember((prevData) => {
                  const updatedData = prevData.map((item) => {
                    if (item.id === rsh.id) {
                      return { ...item, isEditGradeProject: true };
                    }
                    return item;
                  });
                  return updatedData;
                });
              }
              const response = await fetch(
                "http://localhost:8080/researcher/update",
                {
                  method: "put",
                  body: JSON.stringify({ ...rsh, isEditGradeProject: true }),
                  headers: { "Content-Type": "application/json" },
                },
              );
              Swal.fire("เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว", "", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              setGroupMember((prevData) => {
                const updatedData = prevData.map((item) => {
                  if (item.id === rsh.id) {
                    return { ...item, grade_project: "" };
                  }
                  return item;
                });
                return updatedData;
              });
              Swal.fire("ยกเลิกการเปลี่ยนแปลง", "", "error");
            }
          });
        }
      }
    }
    setIsGradeProjectEdit(false);

    // else if (name === "email") {
    //   setIsEditingEmail(false);
    // } else {
    //   setIsEditingGrade(false);
    // }

    // updateMemberGroup(rsh);
  };

  const testAlert = (check, e) => {
    if (ctx.role !== "admin") {
      return;
    }
    const { name, value } = e.target;

    if (name === "isLate") {
      if (check === false) {
        Swal.fire({
          title: "ยืนยันการเปลี่ยนแปลง",
          text: `<div style="color:red">คุณต้องการเปลี่ยนแปลงข้อมูลหรือไม่ <br/>หากถอน I แล้วเกรดโปรเจคจะถูกให้กรอกใหม่</div>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
          html: `<div style="color:red">คุณต้องการเปลี่ยนแปลงข้อมูลหรือไม่ <br/>หากถอน I แล้วเกรดโปรเจคจะถูกให้กรอกใหม่<br/> ยกเว้นผู้วิจัยที่กรอกเกรดโปรเจคเรียบร้อยแล้ว</div>`,
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log(rsh.isEditGradeProject);
            if (rsh.isEditGradeProject === true) {
              setGroupMember((prevData) => {
                const updatedData = prevData.map((item) => {
                  if (item.id === rsh.id) {
                    return {
                      ...item,
                      isLate: checkBoxRef.current.checked,
                    };
                  }
                  return item;
                });
                return updatedData;
              });
              const response = await fetch(
                "http://localhost:8080/researcher/update",
                {
                  method: "put",
                  body: JSON.stringify({
                    ...rsh,
                    [name]: check,
                  }),
                  headers: { "Content-Type": "application/json" },
                },
              );
              const data = await response.json();
            } else {
              setGroupMember((prevData) => {
                const updatedData = prevData.map((item) => {
                  if (item.id === rsh.id) {
                    return {
                      ...item,
                      isLate: checkBoxRef.current.checked,
                      grade_project: "",
                    };
                  }
                  return item;
                });
                return updatedData;
              });
              const response = await fetch(
                "http://localhost:8080/researcher/update",
                {
                  method: "put",
                  body: JSON.stringify({
                    ...rsh,
                    [name]: check,
                    grade_project: "",
                  }),
                  headers: { "Content-Type": "application/json" },
                },
              );
              const data = await response.json();
            }

            // updateMemberGroup(rsh);
            checkBoxRef.current.checked = check;
            Swal.fire("เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว", "", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            checkBoxRef.current.checked = !check;
            Swal.fire("ยกเลิกการเปลี่ยนแปลง", "", "error");
          }
        });
      } else {
        Swal.fire({
          title: "ยืนยันการเปลี่ยนแปลง",
          text: "คุณต้องการเปลี่ยนแปลงข้อมูลหรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setGroupMember((prevData) => {
              const updatedData = prevData.map((item) => {
                if (item.id === rsh.id) {
                  return { ...item, isLate: checkBoxRef.current.checked };
                }
                return item;
              });
              return updatedData;
            });

            const response = await fetch(
              "http://localhost:8080/researcher/update",
              {
                method: "put",
                body: JSON.stringify({ ...rsh, [name]: check }),
                headers: { "Content-Type": "application/json" },
              },
            );
            const data = await response.json();
            // updateMemberGroup(rsh);
            checkBoxRef.current.checked = check;
            Swal.fire("เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว", "", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            checkBoxRef.current.checked = !check;
            Swal.fire("ยกเลิกการเปลี่ยนแปลง", "", "error");
          }
        });
      }
    } else if (name === "waitRegister") {
      Swal.fire({
        title: "ยืนยันการเปลี่ยนแปลงการรอลงทะเบียน",
        text: "คุณต้องการเปลี่ยนแปลงข้อมูลการรอลงทะเบียนหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setGroupMember((prevData) => {
            const updatedData = prevData.map((item) => {
              if (item.id === rsh.id) {
                return { ...item, [name]: check };
              }
              return item;
            });
            return updatedData;
          });
          console.log(rsh);

          const response = await fetch(
            "http://localhost:8080/researcher/update",
            {
              method: "put",
              body: JSON.stringify({ ...rsh, [name]: check }),
              headers: { "Content-Type": "application/json" },
            },
          );
          const data = await response.json();
          // console.log(data);

          // updateMemberGroup(rsh);
          waitRegisterRef.current.checked = check;
          Swal.fire("เปลี่ยนแปลงข้อมูลเรียบร้อยแล้ว", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          waitRegisterRef.current.checked = !check;
          Swal.fire("ยกเลิกการเปลี่ยนแปลง", "", "error");
        }
      });
    }
  };

  const grade_project_click = () => {
    if (ctx.role !== "admin") {
      return;
    } else {
      rsh.isEditGradeProject && rsh.grade_project !== "F"
        ? editGradeProjectHandler()
        : grpDetail.status !== "สอบป้องกัน" &&
          grpDetail.status !== "ส่งปริญญานิพนธ์แล้ว" &&
          grpDetail.status !== "รอส่งปริญญานิพนธ์"
        ? Swal.fire({
            title: "ผิดพลาด",
            text: "ไม่สามารถแก้ไขเกรดได้เนื่องจากกลุ่มยังไม่ได้สอบป้องกัน",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
            timer: 3000,
            timerProgressBar: true,
          })
        : setIsGradeProjectEdit(true);
    }
  };

  const editGradeProjectHandler = (e) => {
    Swal.fire({
      title: "ผิดพลาด",
      text: "คุณได้ทำการเปลี่ยนแปลงเกรดโปรเจคไปแล้ว",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
      timer: 1000,
    });

    // return <div>{rsh.gradeProject}</div>;
  };

  console.log(rsh);
  console.log(grpDetail);
  return (
    <tr className="text-center">
      <td
        className={
          grpDetail.leaderId === rsh.id
            ? `border-2 border-gray-300 bg-yellow-300 py-2  text-gray-800`
            : `border-2 border-gray-300 py-2  text-gray-800`
        }
      >
        {idx + 1}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.firstname}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.lastname}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.student_id}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.categorie_room.room}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.tel}
      </td>
      <td className="border-2 border-gray-300 py-2  text-gray-800">
        {rsh.grade}
      </td>
      <td
        className={`border-2 border-gray-300 py-2 text-gray-800 ${
          (ctx.role === "admin" && !rsh.isEditGradeProject) ||
          (ctx.role === "admin" &&
            rsh.isLate === true &&
            !rsh.isEditGradeProject) ||
          (ctx.role === "admin" &&
            rsh.isLate === false &&
            rsh.isEditGradeProject &&
            rsh.grade_project === "F")
            ? "cursor-pointer hover:bg-gray-400"
            : ""
        } ${
          rsh.isEditGradeProject && rsh.grade_project !== "F"
            ? "bg-gray-300"
            : ""
        }  `}
        onClick={() => grade_project_click()}
      >
        {isGradeProjectEdit ? (
          <>
            <input
              className="input rounded-xl border-none bg-gray-300 text-center"
              type="text"
              name="grade_project"
              id=""
              autoFocus
              value={rsh.grade_project}
              disabled={rsh.isEditGradeProject}
              onBlur={(e) => handleOnBlur(e)}
              onChange={(e) => handleChangeValue(e)}
            />
          </>
        ) : (
          <div>{rsh.grade_project}</div>
        )}
      </td>
      <td className="border-2 border-gray-300 py-2 text-gray-800">
        <input
          type="checkbox"
          name="isLate"
          id=""
          defaultChecked={rsh.isLate}
          onChange={(e) => testAlert(e.target.checked, e)}
          ref={checkBoxRef}
          disabled={ctx.role !== "admin"}
        />
      </td>
      <td className="border-2 border-gray-300 py-2 text-gray-800">
        <input
          type="checkbox"
          name="waitRegister"
          id=""
          defaultChecked={rsh.waitRegister}
          onChange={(e) => testAlert(e.target.checked, e)}
          ref={waitRegisterRef}
          disabled={ctx.role !== "admin"}
        />
      </td>
      <td
        className={`border-2 border-gray-300 py-2 text-gray-800 ${
          ctx.role === "admin" ? "cursor-pointer hover:bg-gray-400" : ""
        }`}
        onClick={() => ctx.role === "admin" && setIsTermEdit(true)}
      >
        {isTermEdit ? (
          <input
            className="input rounded-xl border-none bg-gray-300 text-center"
            type="text"
            name="term"
            id=""
            autoFocus
            value={rsh.term}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleChangeValue(e)}
          />
        ) : (
          <>{rsh.term}</>
        )}
      </td>
      {ctx.role === "admin" && (
        <>
          <td className="border-2 border-gray-300 py-2 text-center  text-white">
            {grpDetail.leaderId === rsh.id ? (
              <button
                className="rounded-lg bg-gray-400 px-5  py-1  shadow-lg disabled:cursor-not-allowed"
                onClick={() => deleteFromGroupHandler(rsh.id)}
                disabled
              >
                <RiVipCrown2Fill color="yellow" />
              </button>
            ) : (
              <button
                className="rounded-lg bg-green-400  px-5 py-1 shadow-lg hover:bg-green-600"
                onClick={() => changeLeaderClick(grpDetail.id, rsh.id)}
              >
                <RiVipCrown2Fill color="yellow" />
              </button>
            )}
          </td>
          <td className="border-2 border-gray-300 py-2 text-center  text-white">
            <button
              className="rounded-lg bg-red-600  px-5 py-1 shadow-lg hover:bg-red-500"
              onClick={() => deleteFromGroupHandler(rsh.id)}
            >
              ลบ
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
export default Member;
