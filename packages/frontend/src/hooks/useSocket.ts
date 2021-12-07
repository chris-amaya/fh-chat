import {useCallback, useEffect, useState} from 'react'
import {io, Socket} from 'socket.io-client'

import {ISocketOn, IScocketEmit} from '@chat/common'

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<
    Socket<IScocketEmit, ISocketOn> | undefined
  >()
  const [online, setOnline] = useState(false)

  const handleConnect = useCallback(() => {
    const token = localStorage.getItem('token')

    const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {'x-token': token},
    })

    setSocket(socketTemp)
  }, [serverPath])

  const handleDisconnect = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setOnline(socket?.connected || false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    handleConnect,
    handleDisconnect,
  }
}
