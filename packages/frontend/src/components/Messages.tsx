import React, {useContext} from 'react'
import {useAuthContext} from '../auth/AuthContext'
import {ChatContext} from '../context/chat/chatContext'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import SendMessage from './SendMessage'

export default function Messages() {
  const {state} = useContext(ChatContext)
  const {auth} = useAuthContext()

  return (
    <div className="mesgs">
      <div id="mensajes" className="msg_history">
        {state.messages.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage key={msg.from.toString()} message={msg} />
          ) : (
            <OutgoingMessage key={msg.from.toString()} message={msg} />
          ),
        )}
      </div>

      <SendMessage />
    </div>
  )
}
