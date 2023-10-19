import React, { Fragment, useContext, useEffect, useState } from "react";
import Title from "../../../../UI/Title";
import Body from "../../../../UI/Body";
import FormRequestExam from "./components/FormRequestExam";
import { Form } from "react-router-dom";

export const TemplateBody = ({ children }) => {
  return (
    <div className="mx-10">
      <Title>ขอยื่นสอบปริญญานิพนธ์</Title>

      <Body>
        <div>{children}</div>
      </Body>
    </div>
  );
};

const RequestExam = () => {
  const [groupInfo, setGroupInfo] = useState(null);
  const [lastEvent, setLastEvent] = useState(null);
  const [isBooked, setIsBooked] = useState();
  const [isResult, setIsResult] = useState();
  const [isRandomBoard, setIsRandomBoard] = useState(false);
  useEffect(() => {
    const getGroup = async () => {
      const response = await fetch("http://34.126.100.66:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });

      const data = await response.json();
      if (data) {
        console.log("hey");
        console.log(data);
        setGroupInfo(data);
      }
    };
    const getLastRequest = async () => {
      const checkEvent = await fetch(
        `http://34.126.100.66:8080/requestExam/getLastRequest/${localStorage.getItem(
          "grpId",
        )}`,
        {
          method: "get",
          credentials: "include",
        },
      );

      const data = await checkEvent.json();
      console.log(data);
      setLastEvent(data ? data : null);

      const checkBooked = await fetch(
        `http://34.126.100.66:8080/exam_booking/checkBooked/${data.id}`,
        {
          method: "get",
          credentials: "include",
        },
      );

      const resultChecked = await checkBooked.json();

      console.log(resultChecked);
      setIsBooked(resultChecked);
      const checkResulted = await fetch(
        `http://34.126.100.66:8080/exam_booking/checkResulted/${data.id}`,
        {
          method: "get",
          credentials: "include",
        },
      );

      const resultedChecked = await checkResulted.json();
      console.log(resultedChecked);
      setIsResult(resultedChecked);
    };

    const checkBoardList = async () => {
      const response = await fetch(
        `http://34.126.100.66:8080/boards/get/${localStorage.getItem("grpId")}`,
        {
          method: "get",
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);
      if (data.length <= 0 || data.length === null) {
        setIsRandomBoard(false);
      } else {
        setIsRandomBoard(true);
      }
    };
    checkBoardList();
    getLastRequest();
    getGroup();
  }, []);

  if (!isRandomBoard) {
    return (
      <div className="mx-10">
        <Title>ใบแจ้งนัดหมายการสอบ</Title>
        <Body>
          <div>กรุณาสร้างกรรมการสอบก่อน</div>
        </Body>
      </div>
    );
  }
  if (groupInfo) {
    if (
      groupInfo &&
      groupInfo.leaderId === parseInt(localStorage.getItem("id"))
    ) {
      if (groupInfo.title !== "") {
        if (lastEvent) {
          if (lastEvent.isApprove === null) {
            return <TemplateBody> รอผลการอนุมัติยื่นสอบ</TemplateBody>;
          } else if (!isBooked && lastEvent.isApprove === 1) {
            return <TemplateBody>รอจองการขึ้นสอบ</TemplateBody>;
          } else if (isBooked?.isResult === null && lastEvent.isApprove === 1) {
            return <TemplateBody>รอขึ้นสอบ</TemplateBody>;
          } else if (
            isBooked?.isResult &&
            lastEvent.isApprove === 1 &&
            isResult?.isResult === 0
          ) {
            return <TemplateBody>รอผลการอนุมัติ</TemplateBody>;
          } else {
            return <FormRequestExam groupInfo={groupInfo} />;
          }
        } else {
          return <FormRequestExam groupInfo={groupInfo} />;
        }
      } else {
        return <TemplateBody>กรุณาสร้างหัวข้อกลุ่ม</TemplateBody>;
      }
    } else {
      return <TemplateBody>ติดต่อหัวหน้ากลุ่มเพื่อทำการขอสอบ</TemplateBody>;
    }
  } else {
    return <TemplateBody>กรุณาสร้างกลุ่ม</TemplateBody>;
  }

  // return (
  //   <div className="mx-10">
  //     <Title>ใบแจ้งนัดหมายการสอบ</Title>
  //     <Body>
  //       {groupInfo ? (
  //         groupInfo &&
  //         groupInfo.leaderId === parseInt(localStorage.getItem("id")) ? (
  //           groupInfo.title !== "" ? (
  //             <>
  //               {lastEvent ? (
  //                 lastEvent.isApprove === 0 ? (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 ) : !isBooked?.isResult === null &&
  //                   lastEvent.isApprove === 1 ? (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 ) : isBooked?.isResult && lastEvent.isApprove === 1 ? (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 ) : isBooked?.isResult &&
  //                   lastEvent.isApprove === 1 &&
  //                   isResult?.isResult === 0 ? (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 ) : (
  //                   <div>รอผลการอนุมัติ</div>
  //                 )
  //               ) : (
  //                 <>
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 </>
  //               )}
  //             </>
  //           ) : (
  //             <div>กรุณาสร้างหัวข้อกลุ่ม</div>
  //           )
  //         ) : (
  //           <div>ติดต่อหัวหน้ากลุ่มเพื่อทำการขอสอบ</div>
  //         )
  //       ) : (
  //         <div>กรุณาสร้างกลุ่ม</div>
  //       )}

  //       {/* {groupInfo ? (
  //         groupInfo &&
  //         groupInfo?.leaderId === parseInt(localStorage.getItem("id")) ? (
  //           <>
  //             {lastEvent === null ? (
  //               <FormRequestExam groupInfo={groupInfo} />
  //             ) : lastEvent.isApprove ? (
  //               lastEvent.isResult ? (
  //                 lastEvent.result ? (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 ) : (
  //                   <FormRequestExam groupInfo={groupInfo} />
  //                 )
  //               ) : (
  //                 <div>รอผลการสอบ</div>
  //               )
  //             ) : (
  //               <FormRequestExam groupInfo={groupInfo} />
  //             )}
  //           </>
  //         ) : (
  //           <div>ติดต่อหัวหน้ากลุ่มเพื่อทำการขอสอบ</div>
  //         )
  //       ) : (
  //         <div>กรุณาสร้างกลุ่ม</div>
  //       )} */}
  //     </Body>
  //   </div>
  // );
};

export default RequestExam;
