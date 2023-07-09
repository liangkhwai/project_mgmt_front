import React, { useState, useEffect, Fragment } from "react";
import Title from "../../../../../../UI/Title";
import Body from "../../../../../../UI/Body";
import { useMutation, useQuery } from "react-query";

const GroupMemberList = ({ grpId, grpDetail }) => {
    console.log(grpId);
  const [groupDetail, setGroupDetail] = useState(grpDetail);
  const [groupMember, setGroupMember] = useState([]);

  const mutation = useMutation({
    mutationFn: async (userId) => {
      return await fetch("http://localhost:8080/group/removeFromGroup", {
        method: "patch",
        body: JSON.stringify({ userId:userId }),
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
    },
    onSuccess: (data) => {
        console.log(data);
      setGroupMember(
        groupMember.filter((item) => item.id !== data.id)
      );
    },
  });



  const GroupMember = useQuery("getGroupMember", async () => {
    // let userId = localStorage.getItem("id");
    const response = await fetch(
      "http://localhost:8080/group/getGroupMember",
      {
        method: "post",
        body: JSON.stringify({ grpId:parseInt(grpId) }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  });

  useEffect(() => {
    if (GroupMember.data) {
        console.log(GroupMember.data);
      setGroupMember(GroupMember.data);
    }
    console.log(GroupMember.data);
  }, [GroupMember.data]);

  if (GroupMember.isLoading) return "...Loading member";



  const deleteFromGroupHandler = (rshId) => {
    mutation.mutate(rshId);
    console.log(rshId);
  };

console.log(groupMember)
  return (
    <div className="mx-10">
      <Title>{groupDetail && groupDetail.title}</Title>
      <Body>
        <table className="table table-auto w-full">
          <thead>
            <tr className="w-full">
              <td className="text-center" colSpan={3}>
                สมาชิก
              </td>
            </tr>
          </thead>

          <tbody>
            {groupMember.map((item, idx) => {
              return (
                <Fragment key={item.student_id}>
                  <tr>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.student_id}</td>
                    <td>{item.categorie_room.room}</td>
                    <td>
                      <button
                        className="px-4 py-1 bg-red-200 hover:bg-red-400"
                        onClick={() => deleteFromGroupHandler(item.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </Body>
    </div>
  );
};

export default GroupMemberList;
