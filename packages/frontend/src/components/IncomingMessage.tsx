import {IMessage} from '@chat/common'
import React from 'react'
// import {horaMes} from '../helpers/horaMes'

interface Props {
  message: IMessage
}

function IncomingMessage({message}: Props) {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message.message}</p>
          {/* <span className="time_date">{horaMes(msg.createdAt)}</span> */}
        </div>
      </div>
    </div>
  )
}

export default IncomingMessage
