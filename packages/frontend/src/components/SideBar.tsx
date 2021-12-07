import React, {useContext} from 'react'
import SideBarChatItem from './SideBarChatItem'

import {ChatContext} from '../context/chat/chatContext'
import {useAuthContext} from '../auth/AuthContext'

export default function SideBar() {
  const {state} = useContext(ChatContext)
  const {auth} = useAuthContext()
  const uid = auth.uid

  return (
    <div className="inbox_chat">
      {state.users
        .filter((user) => user.uid !== uid)
        .map((user) => (
          // console.log(user)

          <SideBarChatItem key={user.uid} user={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  )
}
