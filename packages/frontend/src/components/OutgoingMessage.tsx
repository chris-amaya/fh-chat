import React from 'react'

function OutgoingMessage({msg}: any) {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.mensaje}</p>
        <span className="time_date"> 11:01 AM | June 9</span>
      </div>
    </div>
  )
}

export default OutgoingMessage
