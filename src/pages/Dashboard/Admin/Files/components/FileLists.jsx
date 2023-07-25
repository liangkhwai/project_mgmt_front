import React from 'react'
import { Fragment } from 'react'

const FileLists = ({fileLists,removeFileList}) => {
  return (
    <div>

        {fileLists.map((item,idx)=>{
            return (
                <Fragment key={idx}>
                <div className='flex justify-between items-center my-1 hover:bg-light-blue-200'>
                    <div>

                    {item.originalname}
                    </div>
                    <div>
                        <button className='bg-red-300 px-4 py-2' onClick={()=>removeFileList(item.id)}>ลบ</button>
                    </div>
                </div>
                </Fragment>
            )
        })}


    </div>
  )
}

export default FileLists