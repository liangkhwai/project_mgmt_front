import React, { useState, useEffect, Fragment, useContext } from "react";
import Title from "../../../../../../UI/Title";
import Body from "../../../../../../UI/Body";
import { useMutation, useQuery } from "react-query";
import TitleGroup from "../../../../Researcher/Group/components/TitleGroup";
import EditGroupTitle from "./EditGroupTitle";
import ComboBox from "../../../../Researcher/Group/create_group/components/ComboBoxSearcherRsh";
import { useRef } from "react";
import AuthContext from "../../../../../../context/auth";

const GroupMemberList = ({ grpId, grpDetail }) => {
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
      console.log(await response);
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
    return data;
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
    mutation.mutate(rshId);
    console.log(rshId);
  };

  const addResearcherToGroup = () => {
    addMember.mutate(selectedItem.id);
  };
  return (
    <div className="mx-10">
      {/* <Title>{groupDetail && groupDetail.title}</Title> */}

      {ctx.role === "admin" ? (
          <EditGroupTitle title={groupDetail.title} />
      ) : (
          <span>ชื่อหัวข้อ {groupDetail ? groupDetail.title : ""}</span>
      )}

      <div className="text-center font-bold text-lg ">รายชื่อสมาชิก</div>
      <br />
      <table className="table table-auto w-full border-collapse border-gray-400">
        <thead>
          <tr className="w-full ">
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
              <td className=" py-2 text-center border-2 border-gray-300 font-semibold  text-black">
                ลบ
              </td>
            )}
          </tr>
        </thead>

        <tbody>
          {groupMember.map((item, idx) => {
            return (
              <Fragment key={item.student_id}>
                <tr>
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
                  เกรดโปรเจค
                  </td>
                  {ctx.role === "admin" && (
                    <td className="border-2 py-2 border-gray-300 text-center  text-white">
                      <button
                        className="px-5 py-1  bg-red-600 hover:bg-red-500 rounded-lg shadow-lg"
                        onClick={() => deleteFromGroupHandler(item.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  )}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {ctx.role === "admin" && (
        <Fragment>
          <div className="flex py-1  border-b-2  border-r-2 border-l-2 border-gray-300">
            <ComboBox
              loadedResearcherList={loadedResearcherList}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <input
              className="input "
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.firstname : ""}
            />
            <input
              className="input "
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.lastname : ""}
            />
            <input
              className="input "
              type="text"
              name=""
              id=""
              disabled
              value={selectedItem ? selectedItem.categorie_room.room : ""}
            />
          </div>
          <div className="text-end mt-6">
            <button
              className="px-4 py-1 bg-green-600 rounded-md text-white hover:bg-green-500  shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
