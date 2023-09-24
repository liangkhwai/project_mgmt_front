import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import theseCover from "../../../../../../src/assets/thesis_cover.png";
const ThesisImg = () => {
  const [haveFiles, setHaveFiles] = useState(false);
  const [fileLists, setFileLists] = useState([]);
  const fileInput = useRef(null);

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

  return (
    <div className="">
      {/* <input type="file" name="" id="" /> */}

      {fileLists?.length > 0 ? (
        <Fragment>
          <div className="">
            {fileLists.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="border w-full relative group hover:cursor-pointer"
                >
                  <img
                    src={theseCover}
                    alt=""
                    className="relative h-auto w-full"
                    onClick={() =>
                      window.open(URL.createObjectURL(item, "_blank"))
                    }
                  />
                  <div className="absolute top-0 right-0 z-30">
                    <button
                      className="px-2 bg-red-500  top-0 right-0 text-white hover:bg-red-200"
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
          className="h-80 border-2 border-dashed border-blue-200 flex justify-center items-center hover:text-white hover:bg-blue-200 hover:cursor-pointer"
          onClick={() => fileInput.current.click()}
        >
          <div className="">เพิ่มไฟล์</div>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        name="files"
        accept="application/pdf"
        id=""
        required
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
};

export default ThesisImg;
