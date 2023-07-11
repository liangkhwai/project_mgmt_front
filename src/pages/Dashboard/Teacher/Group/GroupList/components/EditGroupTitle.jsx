import React, { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

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
    },
  });

  const clickSubmitFormHandler = () => {
    console.log(grpId);
    mutation.mutate(titleInputHandler);
  };

  const inputChangeHandler = (value) => {
    setTitleInputHandler(value);
  };

  return (
    <div>
      {isEditing ? (
        <div className="">
          <input
            type="text"
            name=""
            id=""
            value={titleInputHandler}
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          <button
            className="py-1 px-4"
            onClick={() => clickSubmitFormHandler()}
          >
            ยืนยัน
          </button>
        </div>
      ) : (
        <div className=" ">
          {title}{" "}
          <button
            className="py-1 px-4 bg-green-500 rounded-full"
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
