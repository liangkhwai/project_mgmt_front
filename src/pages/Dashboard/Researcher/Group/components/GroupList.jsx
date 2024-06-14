import React, { useState, useEffect, Fragment, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi/";
import { BsPencilSquare } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import TitleGroup from "./TitleGroup";
import EditResearcherRow from "./EditResearcherRow";
import ResearcherRow from "./ResearcherRow";
import ComboBox from "../../../Researcher/Group/create_group/components/ComboBoxSearcherRsh";
import Swal from "sweetalert2";
const GroupList = ({ groupList, setGroupList }) => {
  const [isInsert, setIsInsert] = useState(false);
  const [group, setGroup] = useState();
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [researcherList, setResearcherList] = useState([]);

  const buttonRef = useRef();

  useEffect(() => {
    if (selectedItem) {
      setIsDisable(false);
    }
  }, [selectedItem]);

  const addResearcherToGroup = async () => {
    Swal.fire({
      title: "เพิ่ม?",
      text: "คุณต้องการเพิ่มผู้วิจัยเข้ากลุ่มหรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "เพิ่ม!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://127.0.0.1:8080/group/addGroupMember`, {
          method: "put",
          credentials: "include",
          body: JSON.stringify({
            userId: selectedItem.id,
            grpId: parseInt(group.id),
          }),
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
           },
        });
        const data = await res.json();
        if (data) {
          Swal.fire({
            icon: "success",
            title: "เพิ่มนักวิจัยเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsDisable(true);
          setGroupList((prev) => [...prev, selectedItem]);
          setSelectedItem(null);
          setResearcherList((prev) =>
            prev.filter((item) => item.id !== selectedItem.id)
          );
        }
      }
    });
  };

  const { isLoading, err, data, status } = useQuery(
    "getGroupData",
    async () => {
      const res = await fetch("http://127.0.0.1:8080/group/getGroup", {
        method: "get",
        credentials: "include",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
         },
      });
      const data = await res.json();
      console.log(data);
      return data;
    }
  );
  useEffect(() => {
    async function fetchResearcher() {
      const res = await fetch("http://127.0.0.1:8080/researcher/list", {
        method: "get",
        credentials: "include",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
         },
      });
      const data = await res.json();
      console.log(data);
      setResearcherList(data.filter((item, idx) => item.groupId === null));
    }
    fetchResearcher();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setGroup(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newTitle) => {
      return await fetch("http://127.0.0.1:8080/group/createTitleGroup", {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
        credentials: "include",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
         },
      });
    },
    onSuccess: () => {
      setTitle(inputRef.current.value);
      setIsInsert(!isInsert);
    },
  });

  // const updateTitleSubmitHandler = async () => {
  //   mutation.mutate(inputRef.current.value);
  // };

  const sortLeader = groupList?.sort((a, b) => {
    if (a.id === group?.leaderId) {
      return -1;
    } else if (b.id === group?.leaderId) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="w-full rounded-md border border-black p-5 ">
      <TitleGroup setGroup ={setGroup}/>
      <div>สถานะกลุ่ม : {group?.status}</div>
      <div className="rounded-md border border-black">
        <table className="w-full table-auto text-center  ">
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
            {sortLeader?.map((item, idx) => (
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

      <div>
        {sortLeader?.length < 3 && (
          <Fragment>
            <div className="my-5 flex items-center justify-around  border-2  border-gray-300 py-3">
              <ComboBox
                loadedResearcherList={researcherList}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />

              <input
                className="input rounded-xl border-none bg-gray-300 text-center"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem?.firstname : ""}
              />
              <input
                className="input rounded-xl border-none bg-gray-300 text-center"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem?.lastname : ""}
              />
              <input
                className="input rounded-xl border-none bg-gray-300 text-center"
                type="text"
                name=""
                id=""
                disabled
                value={selectedItem ? selectedItem?.categorie_room.room : ""}
              />

              <button
                className="rounded-md bg-green-600 px-4 py-2 text-white shadow-lg  disabled:cursor-not-allowed disabled:opacity-50 hover:bg-green-500"
                onClick={() => addResearcherToGroup()}
                ref={buttonRef}
                disabled={isDisable}
              >
                เพิ่มนักวิจัย
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default GroupList;
