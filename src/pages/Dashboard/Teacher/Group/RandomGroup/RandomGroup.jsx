import React, { useEffect, useState } from "react";
import Title from "../../../../../UI/Title";
import Body from "../../../../../UI/Body";
import FormRandom from "./components/FormRandom";
import ResultRandom from "./components/ResultRandom";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
const RandomGroup = () => {
  const [teacher, setTeacher] = useState([]);
  const [group, setGroup] = useState([]);
  const [isRandom, setIsRamdom] = useState(false);
  const getTeacherList = useQuery({
    queryKey: "getTeacher",
    queryFn: async () => {
      const response = await fetch("http://34.126.100.66:8080/teachers/list", {
        method: "get",
        credentials: "include",
      });

      return response.json();
    },
  });

  const getGroupList = useQuery({
    queryKey: "getGroups",
    queryFn: async () => {
      const response = await fetch(
        "http://34.126.100.66:8080/group/getAllGroup/random",
        {
          method: "get",
          credentials: "include",
        }
      );
      return response.json();
    },
  });
  useEffect(() => {
    if (getTeacherList.data) {
      let addLimitTeacher = getTeacherList.data.map((obj) => {
        return { ...obj, limit: 0, limitBoard: 0 };
      });
      setTeacher(addLimitTeacher);
    }
  }, [getTeacherList.data]);

  useEffect(() => {
    if (getGroupList.data) {
      // console.log(getGroupList.data);
      let addTchGroup = getGroupList.data.map((obj) => {
        return {
          ...obj,
          boards: {
            advisor: { role: "advisor" },
            board1: { role: "board1" },
            board2: { role: "board2" },
          },
        };
      });
      // console.log(addTchGroup);
      setGroup(addTchGroup);
    }
  }, [getGroupList.data]);

  return (
    <div className="mx-10">
      <Title>สุ่มกรรมการสอบ</Title>
      <Body>
        <div className="grid gap-4">
          <div className="border rounded-md text-center border-black">
            <FormRandom
              teacher={teacher}
              setTeacher={setTeacher}
              group={group}
              setGroup={setGroup}
              setIsRamdom={setIsRamdom}
              isRandom={isRandom}
            />
          </div>
          <div className="border rounded-md text-center border-black">
            <ResultRandom
              group={group}
              setGroup={setGroup}
              isRandom={isRandom}
            />
          </div>
        </div>
      </Body>
    </div>
  );
};

export default RandomGroup;
