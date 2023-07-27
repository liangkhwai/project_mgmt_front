import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import RequestLists from "./components/RequestLists";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import RequestLogLists from "./components/RequestLogLists";

const ExamRequest = () => {
  const [requestList, setRequestList] = useState([]);
  const [requestStatusAssign, setRequestStatusAssign] = useState([]);
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8080/requestExam/getRequest",
        {
          method: "post",
          body: JSON.stringify({
            tchId: parseInt(localStorage.getItem("id")),
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      const assgin = data.filter((item) => item.isApprove !== null);
      const notAssign = data.filter((item) => item.isApprove === null);
      console.log(assgin);
      console.log(notAssign);
      setRequestList(notAssign);
      setRequestStatusAssign(assgin);

      //   console.log(data);
      //   setRequestList(data);
    }
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <div className="mx-10">
      <Title>รายการขอสอบ</Title>

      <Body>
        {data && (
          <div>
            <RequestLists requestList={requestList} />
            <RequestLogLists requestStatusAssign={requestStatusAssign} />
          </div>
        )}
      </Body>
    </div>
  );
};

export default ExamRequest;
