import React, { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditGroupTitle = (props) => {
  const [titleInputHandler, setTitleInputHandler] = useState(props.title);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(props.title);
  const { grpId } = useParams();

  const mutation = useMutation({
    mutationFn: async (titleInputHandler) => {
      const reponse = await fetch(
        "http://localhost:8080/group/changeGroupTitle",
        {
          method: "put",
          body: JSON.stringify({ groupId: grpId, title: titleInputHandler }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    onSuccess: () => {
      setTitle(titleInputHandler);
      setIsEditing(!isEditing);
      Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        text: "แก้ไขข้อมูลสำเร็จ",
      });
    },
    onError:()=>{
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถแก้ไขได้",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  });

  const clickSubmitFormHandler = () => {
    console.log(grpId);
    Swal.fire({
      title: 'แก้ไขข้อมูล?',
      text: "คุณต้องการแก้ไขข้อมูลชื่อหัวข้อหรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'แก้ไข!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
       
        mutation.mutate(titleInputHandler);
      }
    })
  };

  const inputChangeHandler = (value) => {
    setTitleInputHandler(value);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <div className="text-xl mr-2">

          ชื่อหัวข้อ
          </div>
          <input
            className="focus:bg-blue-50 text-xl"
            type="text"
            name=""
            id=""
            value={titleInputHandler}
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          <button
            className="py-1 px-4  mx-3 text-sm  text-blue-800 bg-white  rounded-full shadow-md "
            onClick={() => clickSubmitFormHandler()}
          >
            ยืนยัน
          </button>
        </div>
      ) : (
        <div className="text-2xl flex items-center">
          <div className="text-xl">ชื่อหัวข้อ : {title} </div>
          <button
            className="py-1 px-4  mx-3 text-sm  text-blue-800 bg-white  rounded-full shadow-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            แก้ไข
          </button>
        </div>
      )}
    </div>
  );
};

export default EditGroupTitle;
