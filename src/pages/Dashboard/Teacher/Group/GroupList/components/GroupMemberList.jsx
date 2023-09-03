import React, { useState, useEffect, Fragment, useContext } from "react";
import Title from "../../../../../../UI/Title";
import Body from "../../../../../../UI/Body";
import { useMutation, useQuery } from "react-query";
import TitleGroup from "../../../../Researcher/Group/components/TitleGroup";
import EditGroupTitle from "./EditGroupTitle";
import ComboBox from "../../../../Researcher/Group/create_group/components/ComboBoxSearcherRsh";
import { useRef } from "react";
import { RiVipCrown2Fill } from "react-icons/ri/index";
import AuthContext from "../../../../../../context/auth";
import Swal from "sweetalert2";
const GroupMemberList = ({ grpId, grpDetail, setGrpDetail }) => {
  console.log(grpId);
  const ctx = useContext(AuthContext);
  const [groupDetail, setGroupDetail] = useState(grpDetail);
  const [groupMember, setGroupMember] = useState([]);
  const [loadedResearcherList, setLoadedResearcherList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const buttonRef = useRef();
  const [isDisable, setIsDisable] = useState(true);
  const mutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(
        "http://localhost:8080/group/removeFromGroup",
        {
          method: "put",
          body: JSON.stringify({ userId: userId }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      return await response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setGroupMember(groupMember.filter((item) => item.id !== data.id));
      Swal.fire({
        icon: "success",
        title: "ลบ",
        text: "ลบผู้วิจัยออกจากกลุ่มสำเร็จ",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบได้",
      });
    },
  });

  const addMember = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(
        "http://localhost:8080/group/addGroupMember",
        {
          method: "put",
          body: JSON.stringify({ userId: userId, grpId: parseInt(grpId) }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return await response.json();
    },
    onSuccess: () => {
      setGroupMember((prev) => [...prev, selectedItem]);
      setSelectedItem(null);
      setLoadedResearcherList((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      );
      const allInput = document.querySelectorAll("input.input");
      allInput.forEach((item) => (item.value = ""));
      Swal.fire({
        icon: "success",
        title: "เพิ่ม",
        text: "เพิ่มผู้วิจัยเข้ากลุ่มสำเร็จ",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มได้",
      });
    },
  });

  const researcherList = useQuery("getResearcherList", async () => {
    const response = await fetch("http://localhost:8080/researcher/list", {
      method: "get",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  });

  const GroupMember = useQuery("getGroupMember", async () => {
    // let userId = localStorage.getItem("id");
    const response = await fetch("http://localhost:8080/group/getGroupMember", {
      method: "post",
      body: JSON.stringify({ grpId: parseInt(grpId) }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    const sortLeader = data.sort((a, b) => {
      if (a.id === grpDetail.leaderId) {
        return -1;
      } else if (b.id === grpDetail.leaderId) {
        return 1;
      }
      return 0;
    });

    return sortLeader;
  });

  useEffect(() => {
    if (GroupMember.data) {
      console.log(GroupMember.data);
      setGroupMember(GroupMember.data);
    }
    console.log(GroupMember.data);

    if (researcherList.data) {
      setLoadedResearcherList(
        researcherList.data.filter((item, idx) => item.groupId === null)
      );
    }
  }, [GroupMember.data, researcherList.data]);

  useEffect(() => {
    console.log("button render");
    if (selectedItem) {
      // buttonRef.current.disabled = false;
      setIsDisable(false);
    }
  }, [selectedItem]);

  if (GroupMember.isLoading) return "...Loading member";
  if (researcherList.isLoading) return "...Loading member";

  const deleteFromGroupHandler = (rshId) => {
    Swal.fire({
      title: "ลบ?",
      text: "คุณต้องการลบผู้วิจัยออกจากกลุ่มหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(rshId);
      }
    });
  };

  const addResearcherToGroup = () => {
    Swal.fire({
      title: "เพิ่ม?",
      text: "คุณต้องการเพิ่มผู้วิจัยเข้ากลุ่มหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        addMember.mutate(selectedItem.id);
      }
    });
  };

  // const sortLeader = groupMember.sort((a, b) => {
  //   if (a.id === groupDetail.leaderId) {
  //     return -1;
  //   } else if (b.id === groupDetail.leaderId) {
  //     return 1;
  //   }
  //   return 0;
  // });

  const changeLeaderClick = async (grpId, rshId) => {
    console.log(grpId, rshId);
    Swal.fire({
      title: 'เปลี่ยนหัวหน้ากลุ่ม?',
      text: "คุณต้องการเปลี่ยนหัวหน้ากลุ่มหรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'เปลี่ยน!',
      cancelButtonText: 'ยกเลิก'
    }).then(async(result) => {
      const response = await fetch(
        "http://localhost:8080/group/changeLeaderGroup",
        {
          method: "post",
          body: JSON.stringify({ grpId: grpId, rshId: rshId }),
          headers: { "Content-Type": "application/json" },
        }
      );
        if(response.status === 500){
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถเปลี่ยนหัวหน้ากลุ่มได้',
          })
          throw new Error("Error")
        }
      const data = await response.json();
      console.log(data);
  
      setGrpDetail(data.updatedGroup);
      const sortLeader = data.refreshGroupMember.sort((a, b) => {
        if (a.id === data.updatedGroup.leaderId) {
          return -1;
        } else if (b.id === data.updatedGroup.leaderId) {
          return 1;
        }
        return 0;
      });
  
      setGroupMember(sortLeader);
      if (result.isConfirmed) {
        Swal.fire(
          'สำเร็จ!',
          'เปลี่ยนหัวหน้ากลุ่มสำเร็จ',
          'success'
        )
      }
    })


   
  };

  return (
    <div className="mx-10">
      {/* <Title>{groupDetail && groupDetail.title}</Title> */}

      {ctx.role === "admin" ? (
        <EditGroupTitle title={grpDetail.title} />
      ) : (
        <span>ชื่อหัวข้อ {grpDetail ? grpDetail.title : ""}</span>
      )}

      <div className="text-center font-bold text-lg ">รายชื่อสมาชิก</div>
      <br />
      <table className="table table-auto w-full border-collapse border-gray-400">
        <thead>
          <tr className="w-full ">
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold text-black">
              ลำดับ
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold text-black">
              ชื่อ
            </td>
            <td className=" py-2 text-start border-2  border-gray-300 font-semibold  text-black">
              นามสกุล
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              เลขนักศึกษา
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              ห้อง
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              เบอร์โทร
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              Email
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              เกรดเฉลี่ย
            </td>
            <td className=" py-2 text-start border-2 border-gray-300 font-semibold  text-black">
              เกรดโปรเจค
            </td>
            {ctx.role === "admin" && (
              <>
                <td className=" py-2 text-center border-2 border-gray-300 font-semibold  text-black">
                  หัวหน้ากลุ่ม
                </td>
                <td className=" py-2 text-center border-2 border-gray-300 font-semibold  text-black">
                  ลบ
                </td>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {groupMember.map((item, idx) => {
            return (
              <Fragment key={item.student_id}>
                <tr>
                  <td
                    className={
                      grpDetail.leaderId === item.id
                        ? `bg-yellow-300 border-2 py-2 border-gray-300  text-gray-800`
                        : `border-2 py-2 border-gray-300  text-gray-800`
                    }
                  >
                    {idx + 1}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.firstname}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.lastname}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.student_id}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.categorie_room.room}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.tel}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.email}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.grade}
                  </td>
                  <td className="border-2 py-2 border-gray-300  text-gray-800">
                    {item.gradeProject}
                  </td>
                  {ctx.role === "admin" && (
                    <>
                      <td className="border-2 py-2 border-gray-300 text-center  text-white">
                        {grpDetail.leaderId === item.id ? (
                          <button
                            className="px-5 py-1 disabled:cursor-not-allowed  bg-gray-400  rounded-lg shadow-lg"
                            onClick={() => deleteFromGroupHandler(item.id)}
                            disabled
                          >
                            <RiVipCrown2Fill color="yellow" />
                          </button>
                        ) : (
                          <button
                            className="px-5 py-1  bg-green-400 hover:bg-green-600 rounded-lg shadow-lg"
                            onClick={() =>
                              changeLeaderClick(grpDetail.id, item.id)
                            }
                          >
                            <RiVipCrown2Fill color="yellow" />
                          </button>
                        )}
                      </td>
                      <td className="border-2 py-2 border-gray-300 text-center  text-white">
                        <button
                          className="px-5 py-1  bg-red-600 hover:bg-red-500 rounded-lg shadow-lg"
                          onClick={() => deleteFromGroupHandler(item.id)}
                        >
                          ลบ
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {ctx.role === "admin" && (
        <Fragment>
          <div className="flex justify-around items-center py-3  border-2  border-gray-300 my-5">
            <ComboBox
              loadedResearcherList={loadedResearcherList}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <input
              className="input bg-gray-300 rounded-xl border-none text-center"
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.firstname : ""}
            />
            <input
              className="input bg-gray-300 rounded-xl border-none text-center"
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.lastname : ""}
            />
            <input
              className="input bg-gray-300 rounded-xl border-none text-center"
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.categorie_room.room : ""}
            />

            <button
              className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-500  shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => addResearcherToGroup()}
              ref={buttonRef}
              disabled={isDisable}
            >
              เพิ่มนักวิจัย
            </button>
          </div>
        </Fragment>
      )}
      <div></div>
    </div>
  );
};

export default GroupMemberList;
