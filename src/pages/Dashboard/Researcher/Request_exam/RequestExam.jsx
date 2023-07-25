import React, { useEffect, useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import FormRequestExam from "./components/FormRequestExam";
import { useQuery } from "react-query";
const RequestExam = () => {
  const [groupInfo, setGroupInfo] = useState();
  const { isLoading, data, status } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });

      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      console.log("ข้อมูลมาแล้ว");
      console.log(data);
      setGroupInfo(data);
    }
  }, [data]);

  if (isLoading) return "Loading....";

  return (
    <div className="mx-10">
      <Title>ขอสอบ</Title>
      <Body>
      {groupInfo ? ( 
          <FormRequestExam groupInfo={groupInfo} />
        ) : (
          <p>Loading...</p> 
        )}
      </Body>
    </div>
  );
};

export default RequestExam;
