import React from 'react'
import { AddButton } from '../../../../UI/button'

const InsertTeacherButton = ({setIsInsert}) => {
  return (
    <div className='my-5 '>
        <button className='py-2 px-4 rounded-xl bg-green-600 text-white  hover:bg-green-500 shadow-lg'onClick={()=>setIsInsert()}>เพิ่มรายชื่ออาจารย์</button>
    </div>
    )
}

export default InsertTeacherButton