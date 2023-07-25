import React from 'react'


const FileDropArea = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        console.log(event);
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])

        // upload file
       
        
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <button>
                        <i>
                            X
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>
        </>
    )
}

export default FileDropArea