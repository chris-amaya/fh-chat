import React, {useContext, useState} from 'react'
import {useAuthContext} from '../auth/AuthContext'
import {ChatContext} from '../context/chat/chatContext'

import {useSocketContext} from '../context/SocketContext'

export default function SendMessage() {
  const [mensaje, setMensaje] = useState('')

  const {socket} = useSocketContext()
  const {auth} = useAuthContext()
  const {state} = useContext(ChatContext)

  const onChange = ({target}: React.FormEvent) => {
    const value = (target as HTMLInputElement).value
    setMensaje(value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mensaje.length === 0 && !auth.uid) return
    setMensaje('')

    socket?.emit('direct-message', {
      from: auth.uid!,
      to: state.activeChat,
      message: mensaje,
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
