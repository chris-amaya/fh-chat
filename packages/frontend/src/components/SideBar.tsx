import React, {useContext} from 'react'
import SideBarChatItem from './SideBarChatItem'

import {ChatContext} from '../context/chat/chatReducer'
import {useAuthContext} from '../auth/AuthContext'

export default function SideBar() {
  const {state} = useContext(ChatContext)
  const {auth} = useAuthContext()
  const uid = auth.uid

  return (
    <div className="inbox_chat">
      {state.users
        .filter((user: any) => user.uid !== uid)
        .map((user: any) => (
          <SideBarChatItem key={user.uid} usuario={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  )
}
