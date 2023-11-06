import React, { useState, useEffect, Fragment, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi/";
import { BsPencilSquare } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

const TitleGroup = ({ setGroup }) => {
  const [isInsert, setIsInsert] = useState(false);
  const [groupDetail, setGroupDetail] = useState();
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const { isLoading, err, data, status } = useQuery(
    "getGroupData",
    async () => {
      const res = await fetch("http://34.124.162.203:8080/group/getGroup", {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setGroupDetail(data);
      setTitle(data.title);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newTitle) => {
      return await fetch("http://34.124.162.203:8080/group/createTitleGroup", {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      setTitle(inputRef.current.value);
      setIsInsert(false);
    },
  });

  const updateTitleSubmitHandler = async () => {
    mutation.mutate(inputRef.current.value);
  };

  const submitRequestGroupTitle = async () => {
    Swal.fire({
      title: "คุณแน่ใจที่จะส่งคำขอใช่หรือไม่?",
      text: "หากส่งคำขอแล้วจะไม่สามารถแก้ไขได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("http://34.124.162.203:8080/group/requestTitle", {
          method: "put",
          body: JSON.stringify({
            title: inputRef.current.value,
            groupId: groupDetail.id,
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          setTitle(inputRef.current.value);
          setIsInsert(false);

          setGroup({ ...groupDetail, status: "ยื่นเสนอหัวข้อ" });
          setGroupDetail({ ...groupDetail, status: "ยื่นเสนอหัวข้อ" });

          Swal.fire({
            title: "ส่งคำขอสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
        }
      }
    });
  };

  return (
    <Fragment>
      <div className="mb-3 flex items-center">
        <div className="w-20">ชื่อหัวข้อ</div>
        {isInsert ? (
          <Fragment>
            <div className="mr-3 w-full">
              <input
                ref={inputRef}
                type="text"
                className="w-full rounded-md border-black"
                placeholder="ใส่ชื่อหัวข้อ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              className="rounded-sm px-3 py-2 transition hover:bg-green-200"
              onClick={() => {
                updateTitleSubmitHandler();
              }}
            >
              <FiCheck color="green" size="25px" />
            </button>
            <button
              className="rounded-sm px-3 py-2 transition hover:bg-green-200"
              onClick={() => {
                setIsInsert(!isInsert);
                setTitle(groupDetail.title);
              }}
            >
              <FiX color="red" size="25px" />
            </button>
          </Fragment>
        ) : (
          <Fragment>
            {groupDetail?.isApproveTitle &&
            groupDetail?.status !== "ยังไม่ยื่นเสนอหัวข้อ" ? (
              <Fragment>
                <div>{title}</div>
                <button
                  className="px-3 py-2"
                  onClick={() => setIsInsert(!isInsert)}
                >
                  <BsPencilSquare color="" size="20px" />
                </button>
              </Fragment>
            ) : (
              <Fragment>
                {groupDetail?.status === "ยังไม่ยื่นเสนอหัวข้อ" ? (
                  <>
                    <div className="mr-3 w-full">
                      <input
                        ref={inputRef}
                        type="text"
                        className="w-full rounded-md border-black"
                        placeholder="ใส่ชื่อหัวข้อ"
                        // value={title}
                      />
                    </div>
                    <button
                      className="rounded-sm px-3 py-2 transition hover:bg-green-200"
                      onClick={() => submitRequestGroupTitle()}
                    >
                      <FiCheck color="green" size="25px" />
                    </button>
                  </>
                ) : (
                  <div>{title} (รอการอนุมัติ)</div>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>

      {/* {group?.title === null ? (
        <div className="flex items-center mb-3">
          <div className="w-40 text-center ">ชื่อหัวข้อ</div>
          {!isInsert ? (
            <Fragment>
              <div className="w-full mr-3">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full rounded-md border-black"
                  placeholder="ใส่ชื่อหัวข้อ"
                  // value={title}
                />
              </div>
              <button
                className="px-3 py-2 hover:bg-green-200 rounded-sm transition"
                onClick={() => updateTitleSubmitHandler()}
              >
                <FiCheck color="green" size="25px" />
              </button>
              {title.length > 0 && (
                <button
                  className="px-3 py-2 hover:bg-green-200 rounded-sm transition"
                  onClick={() => setIsInsert(!isInsert)}
                >
                  <FiX color="red" size="25px" />
                </button>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <div>{group.title}</div>
              <button
                className="px-3 py-2"
                onClick={() => setIsInsert(!isInsert)}
              >
                <BsPencilSquare color="" size="20px" />
              </button>
            </Fragment>
          )}
        </div>
      ) : (
        // <button
        //   className="w-full text-center rounded-md border border-black p-5 mb-3 hover:bg-gray-100 hover:text-gray-800 "
        //   onClick={() => setIsInsert(!isInsert)}
        // >
        //   ใส่ชื่อหัวข้อ
        // </button>
        <Fragment>
          <div>{group?.title}</div>
          <button className="px-3 py-2" onClick={() => setIsInsert(!isInsert)}>
            <BsPencilSquare color="" size="20px" />
          </button>
        </Fragment>
      )} */}
    </Fragment>
  );
};

export default TitleGroup;
