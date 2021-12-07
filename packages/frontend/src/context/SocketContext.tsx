import React, {useContext, useEffect} from 'react'
import createCtx from '../utils/createCtx'

import {Socket} from 'socket.io-client'
import {useAuthContext} from '../auth/AuthContext'
import {ChatContext} from './chat/chatContext'
import {useSocket} from '../hooks/useSocket'
import {IScocketEmit, ISocketOn} from '@chat/common'

interface Context {
  socket: Socket<IScocketEmit, ISocketOn> | undefined
  online: boolean
}

const [useSocketContext, Provider] = createCtx<Context>()

function SocketProvider({children}: {children: React.ReactNode}) {
  const {socket, handleConnect, handleDisconnect, online} = useSocket(
    'http://localhost:8000',
  )
  const {auth} = useAuthContext()
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    if (auth.logged) {
      handleConnect()
    }
  }, [auth, handleConnect])

  useEffect(() => {
    if (!auth.logged) {
      handleDisconnect()
    }
  }, [auth, handleDisconnect])

  useEffect(() => {
    socket?.on('list-users', (users) => {
      dispatch({
        type: 'Load Users',
        payload: users,
      })
    })
  }, [socket, dispatch])

  useEffect(() => {
    socket?.on('direct-message', (message) => {
      dispatch({
        type: 'New Message',
        payload: message,
      })

      // scrollToBottomAnimated("mensajes");
    })
  }, [socket, dispatch])

  return <Provider value={{socket, online}}>{children}</Provider>
}

export {useSocketContext, SocketProvider}
