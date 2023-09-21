import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import RequestLists from "./components/RequestLists";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import RequestLogLists from "./components/RequestLogLists";
const ExamRequest = () => {
  const [requestData, setRequestData] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [requestStatusAssign, setRequestStatusAssign] = useState([]);
  const [selectMenu, setSelectMenu] = useState("List");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getExamRequest = async () => {
      const res = await fetch("http://localhost:8080/requestExam/getRequest", {
        method: "post",
        body: JSON.stringify({
          tchId: parseInt(localStorage.getItem("id")),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const assgin = data.filter((item) => item.isApprove !== null);
      const notAssign = data.filter((item) => item.isApprove === null);
      console.log(assgin);
      console.log(notAssign);
      setRequestData(data);
      setRequestList(notAssign);
      setRequestStatusAssign(assgin);
      setIsLoading(true);
    };
    getExamRequest();
    setIsLoading(false);
  }, []);

  const requestListLog = requestData.filter((item) => item.isApprove !== null);
  const requestListFilter = requestData.filter(
    (item) => item.isApprove == null
  );

  return (
    <div className="mx-10">
      <Title>รายการอนุมัติการขอสอบ</Title>

      <Body>
        <div className="">
          <button
            className="px-3 py-1 bg-light-blue-600 rounded-xl mx-1 text-white"
            onClick={() => setSelectMenu("List")}
          >
            รายการขอสอบ
          </button>
          <button
            className="px-3 py-1 bg-light-blue-600 rounded-xl mx-1 text-white"
            onClick={() => setSelectMenu("Log")}
          >
            ประวัติการขอสอบ
          </button>
        </div>

        {selectMenu === "List" && requestData ? (
          <RequestLists
            requestList={requestListFilter}
            setRequestData={setRequestData}
            isLoading={isLoading}
          />
        ) : (
          <RequestLogLists requestStatusAssign={requestListLog} />
        )}

        {/* {requestData && (
          <div>
            <RequestLists requestList={requestList} />
            <RequestLogLists requestStatusAssign={requestStatusAssign} />
          </div>
        )} */}
      </Body>
    </div>
  );
};

export default ExamRequest;
