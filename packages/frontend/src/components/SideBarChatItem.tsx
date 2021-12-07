import React, {useContext} from 'react'
import {ChatContext} from '../context/chat/chatReducer'
import {fetchWithToken} from '../helpers/fetch'
// import {scrollToBottom} from '../helpers/scrollToBottom'

export default function SideBarChatItem({usuario}: any) {
  const {state, dispatch} = useContext(ChatContext)
  const {activeChat} = state

  const onClick = async () => {
    dispatch({
      type: 'Chat Is Focus',
      payload: usuario.uid,
    })

    const resp = await fetchWithToken(`mensajes/${usuario.uid}`)

    dispatch({
      type: 'Load Messages',
      payload: resp.mensajes,
    })

    // scrollToBottom('mensajes')
  }

  return (
    <div
      className={`chat_list ${usuario.uid === activeChat} & 'active_chat`}
      onClick={onClick}>
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.name}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  )
}
