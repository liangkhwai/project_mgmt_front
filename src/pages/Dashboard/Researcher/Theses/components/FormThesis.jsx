import React, { useState, useRef, useEffect, Fragment } from "react";
import theseCover from "../../../../../../src/assets/thesis_cover.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import RMUTI_KORAT from "../../../../../../src/assets/RMUTI_KORAT.png";
const FormThesis = ({ groupInfo, groupMember, boards }) => {
  const [haveFiles, setHaveFiles] = useState(false);
  const [fileLists, setFileLists] = useState([]);
  const fileInput = useRef(null);
  const [abstract, setAbstract] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    console.log(event.target);
    const files = event.target.files;
    setFileLists([...fileLists, ...files]);
  };
  const deleteImgHandler = (e) => {
    console.log(e);
    console.log(fileLists);
    const newFileLists = fileLists.filter((item, idx) => {
      return item.lastModified !== parseInt(e.lastModified);
    });
    setFileLists(newFileLists);
  };

  useEffect(() => {
    console.log(fileLists);
  }, [fileLists]);

  const submitFormThesis = async (e) => {
    e.preventDefault();
    if (fileLists.length === 0) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเพิ่มไฟล์เอกสาร!",
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }
    Swal.fire({
      title: "ยืนยันการอัพโหลดปริญญานิพนธ์",
      text: "คุณต้องการอัพโหลดปริญญานิพนธ์ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "อัพโหลด!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("file", fileLists[0]);
        formData.append("abstract", abstract);
        formData.append("title", groupInfo?.title);
        formData.append("years", new Date().getFullYear());
        formData.append("grpId", localStorage.getItem("grpId"));
        console.table(formData);
        const response = await fetch("http://localhost:8080/thesis/upload", {
          method: "post",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "สำเร็จ!",
            text: "อัพโหลดปริญญานิพนธ์สำเร็จ!",
          });
          navigate("/dashboard/group");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "อัพโหลดปริญญานิพนธ์ไม่สำเร็จ!",
          });
        }
      }
    });

    console.log(fileLists);
  };

  return (
    <div>
      <form onSubmit={submitFormThesis}>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 h-auto">
            <div className="h-full">
              {/* <input type="file" name="" id="" /> */}

              {fileLists?.length > 0 ? (
                <Fragment>
                  <div className="">
                    {fileLists.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="group relative w-full border hover:cursor-pointer"
                        >
                          <img
                            src={theseCover}
                            alt=""
                            className="relative h-auto w-full"
                            onClick={() =>
                              window.open(URL.createObjectURL(item, "_blank"))
                            }
                          />
                          <div className="absolute right-0 top-0 z-30">
                            <button
                              className="right-0 top-0  bg-red-500 px-2 text-white hover:bg-red-200"
                              onClick={() => deleteImgHandler(item)}
                            >
                              X
                            </button>
                          </div>
                          <p
                            className="text-center group-hover:text-blue-200 "
                            onClick={() =>
                              window.open(URL.createObjectURL(item, "_blank"))
                            }
                          >
                            {item.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Fragment>
              ) : (
                <div
                  className="relative flex h-full items-center justify-center border-2 border-dashed border-blue-200 hover:cursor-pointer hover:bg-blue-200 hover:text-white"
                  onClick={() => fileInput.current.click()}
                >
                  <img
                    src={RMUTI_KORAT}
                    alt=""
                    className="h-56 w-32 opacity-25"
                  />
                  <div className="absolute">เพิ่มไฟล์</div>
                </div>
              )}

              <input
                ref={fileInput}
                type="file"
                name="file"
                accept="application/pdf"
                id=""
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </div>
          <div className="col-span-4 h-auto">
            <div className="w-full ">
              {/* <div className="mb-5 flex justify-center">
                <img src={RMUTI_KORAT} alt="" className="h-56 w-32" />
              </div> */}

              <div className="rounded-t-xl border border-b-blue-100 ">
                <div className="w-full px-10">
                  <div className="my-5 grid grid-cols-6">
                    <div className="col-span-2 self-center font-bold text-blue-300">
                      ชื่อหัวข้อ
                    </div>
                    <div className="col-span-4">{groupInfo?.title}</div>
                  </div>
                </div>
              </div>
              <div className="border border-b-blue-100 border-t-">
                <div className="w-full px-10">
                  <div className="my-5 grid grid-cols-6">
                    <div className="col-span-2 self-center font-bold text-blue-300">
                      ผู้จัดทำ
                    </div>
                    <div className="col-span-4">
                      {groupMember?.map((item, idx) => {
                        return (
                          <div key={idx}>
                            {item.firstname} {item.lastname}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-b-blue-100 border-t-">
                <div className="w-full px-10">
                  <div className="my-5 grid grid-cols-6">
                    <div className="col-span-2 self-center font-bold text-blue-300">
                      อาจารย์ที่ปรึกษา
                    </div>
                    <div className="col-span-4">
                      {boards
                        .filter((item) => item.role === "advisor")
                        .map(
                          (item, idx) =>
                            "อาจารย์ " +
                            item.prefix +
                            item.firstname +
                            " " +
                            item.lastname,
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 text-end">
          <button
            className="rounded-xl bg-green-400 px-4 py-2 text-white"
            type="submit"
          >
            อัพโหลด
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormThesis;
