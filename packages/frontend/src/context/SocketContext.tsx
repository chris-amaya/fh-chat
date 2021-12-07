import React, {useContext, useEffect} from 'react'
import createCtx from '../utils/createCtx'

import {io, Socket} from 'socket.io-client'
import {useAuthContext} from '../auth/AuthContext'
import {ChatContext} from './chat/chatReducer'
import {useSocket} from '../hooks/useSocket'
import {IScocketEmit, ISocketOn} from '@chat/common'

const initialState = {}

interface Context {
  socket: Socket<IScocketEmit, ISocketOn> | undefined
  online: boolean
}

const [useSocketContext, Provider] = createCtx<Context>()

function SocketProvider({children}: {children: React.ReactNode}) {
  const {socket, handleConnect, handleDisconnect, online} = useSocket(
    'http://localhost:8080',
  )
  const {auth} = useAuthContext()
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    if (auth.logged) {
      handleConnect()
    }
  }, [auth, handleConnect])

  useEffect(() => {
    socket?.on('list-users', (usuarios) => {
      dispatch({
        type: 'Users',
        payload: usuarios,
      })
    })
  }, [socket, dispatch])

  useEffect(() => {
    if (!auth.logged) {
      handleDisconnect()
    }
  }, [auth, handleDisconnect])

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
