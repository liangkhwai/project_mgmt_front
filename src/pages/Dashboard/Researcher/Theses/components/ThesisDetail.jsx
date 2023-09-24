import React from "react";

const ThesisDetail = () => {
  return (
    <div>
      <div className="w-full">
        <div className="border rounded-t-xl border-b-blue-100 ">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                ชื่อหัวข้อ
              </div>
              <div className="col-span-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quaerat totam adipisci error voluptate magni. Nihil
                beatae consequatur esse corrupti, ducimus mollitia quod
                voluptates ab inventore odio unde molestias! Neque.
              </div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                ผู้จัดทำ
              </div>
              <div className="col-span-4">
                lorem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quaerat totam adipisci error voluptate magni. Nihil
                beatae consequatur esse corrupti, ducimus mollitia quod
              </div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                Abstract
              </div>
              <div className="col-span-4">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="w-full px-2 rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-t-transparent border-b-blue-100">
          <div className="px-10 w-full">
            <div className="grid grid-cols-6 my-5">
              <div className="font-bold text-blue-300 col-span-2 self-center">
                อาจารย์ที่ปรึกษา
              </div>
              <div className="col-span-4">
                lorem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quaerat totam adipisci error voluptate magni. Nihil
                beatae consequatur esse corrupti, ducimus mollitia quod
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThesisDetail;
