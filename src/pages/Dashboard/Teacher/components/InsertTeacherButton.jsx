import React from 'react'
import { AddButton } from '../../../../UI/button'

const InsertTeacherButton = ({setIsInsert}) => {
  return (
    <div>
        <AddButton onClick={()=>setIsInsert()}>เพิ่มรายชื่ออาจารย์</AddButton>
    </div>
    )
}

export default InsertTeacherButton