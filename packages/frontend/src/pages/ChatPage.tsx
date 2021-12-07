import React, {useContext} from 'react'
import ChatSelect from '../components/ChatSelect'
import InboxPeople from '../components/InboxPeople'
import Messages from '../components/Messages'
import {ChatContext} from '../context/chat/chatReducer'

import '../css/chat.css'

export default function ChatPage() {
  const {state} = useContext(ChatContext)

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {state.activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  )
}
