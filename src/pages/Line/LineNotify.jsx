import React, { useEffect } from "react";
import Body from "../../UI/Body";
import { useNavigate, useSearchParams } from "react-router-dom";
const LineNotify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParams.get("userId"));

  useEffect(() => {
    if (searchParams.keys("userId")) {
      console.log(searchParams.get("userId"));

      const updateLineTeacher = async () => {
        const response = await fetch(
          "http://127.0.0.1:8080/teachers/update/line",
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: localStorage.getItem("id"),
              line_id: searchParams.get("userId"),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
      };

      updateLineTeacher();
    }
  }, []);

  return (
    <div className="mx-10">
      <Body>
        <iframe
          src="https://line.me/R/ti/p/@124mwdzz?from=page&accountId=124mwdzz"
          title="qrcode"
          className="w-full h-[60vh]"
        ></iframe>
        {/* {searchParams.get("userId")} */}
        <div className="text-center mt-5">
          <button
            className="px-4 py-2 rounded-xl bg-green-500 text-white"
            onClick={() => navigate("/dashboard")}
          >
            กลับ
          </button>
        </div>
      </Body>
    </div>
  );
};

export default LineNotify;
