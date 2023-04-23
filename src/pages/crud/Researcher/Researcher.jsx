import React from "react";
import { useLoaderData } from "react-router-dom";
import ResearcherList from "./components/ResearcherList";
const Researcher = () => {
  const loaderData = useLoaderData();

  return (
    <div className="mx-10">
      <h1 className="text-3xl my-10">ผู้วิจัย</h1>

      <div className="bg-white rounded-md ">
        <div className="pt-10 mx-10">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                {/* <th>เบอร์โทร</th> */}
                <th>อีเมลล์</th>
                <th>เบอร์โทร</th>
                <th>เกรดเฉลี่ย</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              <ResearcherList list={loaderData} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Researcher;
// export async function getList() {
//   const response = await fetch("http://localhost:8080/researcher/list", {
//     method: "get",
//   });

//   const data = await response.json();
//   console.log(data);

//   if (response.status === 200) {
//     return data;
//   }
//   return { message: "error" };
// }
