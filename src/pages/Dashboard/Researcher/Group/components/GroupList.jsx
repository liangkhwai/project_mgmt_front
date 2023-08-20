import React, { useState, useEffect, Fragment, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi/";
import { BsPencilSquare } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import TitleGroup from "./TitleGroup";
import EditResearcherRow from "./EditResearcherRow";
import ResearcherRow from "./ResearcherRow";
const GroupList = ({ groupList, setGroupList }) => {
  const [isInsert, setIsInsert] = useState(false);
  const [group, setGroup] = useState();
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  // useEffect(() => {
  //   async function getGroup() {
  //     const res = await fetch("http://localhost:8080/group/getGroup", {
  //       method: "get",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     // console.log(data);
  //     setGroup(data);
  //   }
  //   getGroup();
  // }, []);

  const { isLoading, err, data, status } = useQuery(
    "getGroupData",
    async () => {
      const res = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setGroup(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newTitle) => {
      return await fetch("http://localhost:8080/group/createTitleGroup", {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      setTitle(inputRef.current.value);
      setIsInsert(!isInsert);
    },
  });

  const updateTitleSubmitHandler = async () => {
    mutation.mutate(inputRef.current.value);
  };

  const sortLeader = groupList.sort((a,b)=>{
    if(a.id === group.leaderId){
      return -1;
    }else if(b.id === group.leaderId){
      return 1
    }
    return 0


  })


  return (
    <div className="w-full border border-black p-5 rounded-md ">
      <TitleGroup />
      <div className="rounded-md border border-black">
        <table className="table-auto w-full text-center  ">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทร</th>
              <th>Email</th>
              <th>เกรดเฉลี่ย</th>
            </tr>
          </thead>
          <tbody>
            {sortLeader.map((item, idx) => (
              <ResearcherRow
                rsh={item}
                idx={idx}
                setIsEditing={setIsEditing}
                setGroupList={setGroupList}
                key={item.id}
                group={group}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupList;
