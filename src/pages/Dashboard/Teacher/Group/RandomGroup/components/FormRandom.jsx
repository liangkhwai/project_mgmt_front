import React, { Fragment } from "react";

const FormRandom = () => {
  const teacher = [
    {
      name: "อ.เก๋",
      limit: 0,
    },
    {
      name: "อ.ปุ๋ย",
      limit: 0,
    },
    {
      name: "อ.ทัศ",
      limit: 0,
    },
    {
      name: "อ.หนุ่ม",
      limit: 0,
    },
    {
      name: "อ.โย",
      limit: 0,
    },
    {
      name: "อ.พิศ",
      limit: 0,
    },
    {
      name: "อ.สุ",
      limit: 0,
    },
  ];

  const changeLimitHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  return (
    <div className="my-1">
      <div className="grid grid-cols-2 gap-y-1">
        <div>รายชื่ออาจารย์</div>
        <div>โควต้าต่อกลุ่ม</div>

        {teacher.map((item, idx) => {
          return (
            <Fragment>
              <div>{item.name}</div>
              <div>
                {" "}
                <select
                  name={item.name}
                  id=""
                  className="w-14"
                  onChange={(e) => changeLimitHandler(e)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </Fragment>
          );
        })}
      </div>

      <button className="px-4 py-1 bg-green-300 rounded-md my-2 hover:bg-green-500">
        สุ่ม
      </button>
    </div>
  );
};

export default FormRandom;
