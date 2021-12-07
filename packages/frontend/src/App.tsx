import React from 'react'
import moment from 'moment'
import {AuthProvider} from './auth/AuthContext'
import {ChatProvider} from './context/chat/chatContext'
import {SocketProvider} from './context/SocketContext'
import AppRouter from './router/AppRouter'
import 'moment/locale/es'
moment.locale('es')

export default function ChatApp() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}
