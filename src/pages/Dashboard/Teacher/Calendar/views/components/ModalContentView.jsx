import React from 'react'
import dayjs from 'dayjs'
const ModalContentView = ({selectedEvent}) => {
  return (
    <div>
        <div>{selectedEvent.title}</div>
        <div>{dayjs(selectedEvent.start).$d.toString()}</div>
        <div>{dayjs(selectedEvent.end).$d.toString()}</div>
    </div>
    )
}

export default ModalContentView