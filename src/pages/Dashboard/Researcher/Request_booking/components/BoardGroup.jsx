import React from 'react'

const BoardGroup = ({boards}) => {
    const findRole = (role) => {
        if (role === "advisor") {
          return "อาจารย์ที่ปรึกษา";
        } else if (role === "board1") {
          return "ประธานกรรมการสอบ";
        } else {
          return "กรรมการสอบ";
        }
      };
  return (
    <div className="w-full text-center border rounded-md  border-gray-700">
          <div className="flex flex-row justify-around py-5">
            {boards.map((item, idx) => (
              <div key={item.id}>
                <div>
                  {findRole(item.role)} {item.firstname} {item.lastname}
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default BoardGroup