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
    if (selectedItem) {
      buttonRef.current.disabled = false;
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
        <Title>
          <EditGroupTitle title={groupDetail.title} />
        </Title>
      ) : (
        <Title>
          <span>{groupDetail ? groupDetail.title : ""}</span>
        </Title>
      )}

      <Body>
        <div className="text-center font-bold">สมาชิก</div>
        <br />
        <table className="table table-auto w-full border-collapse border-gray-400">
          <thead>
            <tr className="w-full ">
              <td className="border p-4 border-gray-400 font-bold bg-blue-gray-400 text-gray-300">
                ชื่อ
              </td>
              <td className="border p-4 border-gray-400 font-bold bg-blue-gray-400 text-gray-300">
                นามสกุล
              </td>
              <td className="border p-4 border-gray-400 font-bold bg-blue-gray-400 text-gray-300">
                เลขนักศึกษา
              </td>
              <td className="border p-4 border-gray-400 font-bold bg-blue-gray-400 text-gray-300">
                ห้อง
              </td>
              {ctx.role === "admin" && (
                <td className="border p-4 border-gray-400 font-bold bg-blue-gray-400 text-gray-300">
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
                    <td className="border p-4 border-gray-400 bg-blue-gray-600 text-gray-300">
                      {item.firstname}
                    </td>
                    <td className="border p-4 border-gray-400 bg-blue-gray-600 text-gray-300">
                      {item.lastname}
                    </td>
                    <td className="border p-4 border-gray-400 bg-blue-gray-600 text-gray-300">
                      {item.student_id}
                    </td>
                    <td className="border p-4 border-gray-400 bg-blue-gray-600 text-gray-300">
                      {item.categorie_room.room}
                    </td>
                    {ctx.role === "admin" && (
                      <td className="border p-4 border-gray-400 text-center bg-blue-gray-600 text-gray-300">
                        <button
                          className="px-4 py-1 bg-red-200 hover:bg-red-400"
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
            <div className="flex">
              <ComboBox
                loadedResearcherList={loadedResearcherList}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />

              <input
                className="input"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem.firstname : ""}
              />
              <input
                className="input"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem.lastname : ""}
              />
              <input
                className="input"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem.categorie_room.room : ""}
              />
            </div>
            <div className="text-end mt-6">
              <button
                className="px-4 py-1 bg-green-600 rounded-md hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => addResearcherToGroup()}
                ref={buttonRef}
                disabled
              >
                เพิ่มนักวิจัย
              </button>
            </div>
          </Fragment>
        )}
      </Body>
    </div>
  );
};

export default GroupMemberList;
