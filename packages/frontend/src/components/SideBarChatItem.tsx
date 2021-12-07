import {IUser} from '@chat/common'
import React, {useContext} from 'react'
import {ChatContext} from '../context/chat/chatContext'
import {fetchWithToken} from '../helpers/fetch'
// import {scrollToBottom} from '../helpers/scrollToBottom'

interface IProps {
  user: IUser
}

export default function SideBarChatItem({user}: IProps) {
  console.log(user)

  const {state, dispatch} = useContext(ChatContext)
  const {activeChat} = state

  const onClick = async () => {
    dispatch({
      type: 'Load Chat',
      payload: user.uid,
    })

    const resp = await fetchWithToken(`mensajes/${user.uid}`)

    dispatch({
      type: 'Load Messages',
      payload: resp.mensajes,
    })

    // scrollToBottom('mensajes')
  }

  return (
    <div
      className={`chat_list ${user.uid === activeChat} & 'active_chat`}
      onClick={onClick}>
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  )
}
