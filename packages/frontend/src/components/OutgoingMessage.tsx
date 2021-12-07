import {IMessage} from '@chat/common'
import React from 'react'

interface Props {
  message: IMessage
}

function OutgoingMessage({message}: Props) {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date"> 11:01 AM | June 9</span>
      </div>
    </div>
  )
}

export default OutgoingMessage
