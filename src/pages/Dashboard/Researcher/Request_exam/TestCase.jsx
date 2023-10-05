import React from "react";

const TestCase = () => {
  const grpInfo = {
    id: 1,
    title: "หัวข้อ 1",
    status: "สอบหัวข้อ",
    isApproveTitle: true,
    createdAt: "2023-10-05T05:54:31.000Z",
    updatedAt: "2023-10-05T06:06:02.000Z",
    leaderId: 3,
  };

  const isResult = false;
  const lastRequest = {
    id: 2,
    status: "อนุมัติการยื่นสอบ",
    isApprove: 1,
    categories: "สอบหัวข้อ",
    description: "",
    createdAt: "2023-10-05T06:05:40.000Z",
    updatedAt: "2023-10-05T06:06:02.000Z",
    groupId: 1,
    examAnnouncementId: null,
  };

  const isBooked = false;

  if(grpInfo){
    if(grpInfo && grpInfo.leaderId === 1){
        if(grpInfo.title !== ""){
            if(lastRequest){
                if(lastRequest.isApprove === 0){
                    return <div>รอผลการอนุมัติขึ้นสอบ</div>
                }else if(!isBooked?.isResult === null && lastRequest.isApprove === 1){
                    return <div>รอผลการอนุมัติ</div>
                }else if(isBooked?.isResult && lastRequest.isApprove === 1){
                    return <div>รอผลการอนุมัติ</div>
                }else if(isBooked?.isResult && lastRequest.isApprove === 1 && isResult?.isResult === 0){
                    return <div>รอผลการอนุมัติ</div>
                }else{
                    return <div>show form</div>
                }
            }else{
                return <div>show form</div>;
            }
        }else{
            return <div>กรุณาสร้างหัวข้อกลุ่ม</div>
        }




    }else{
        return <div>ติดต่อหัวหน้ากลุ่มเพื่อทำการขอสอบ</div>
    }

  }else{
    return <div>กรุณาสร้างกลุ่ม</div>
  }




  return <div>









  </div>;
};

export default TestCase;
