import React from 'react'

const TitleGroup = ({groupInfo}) => {
  return (
    <div className="my-5">
    <div className="">
      <label htmlFor="title" className="">
        ชื่อหัวข้อ
      </label>
    </div>
    <input
      type="text"
      name=""
      id="title"
      value={groupInfo?.title ? groupInfo.title : ""}
      className="w-full rounded-md"
      disabled
    />
  </div>
  )
}

export default TitleGroup