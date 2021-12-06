import express from 'express'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

import connectDB from '../db/config'
import AuthRouter from '../router/auth'
import MessageRouter from '../router/messages'
import {ISocketOn, IScocketEmit} from '@chat/common'

export default class App {
  public app: express.Application
  public port: number
  public httpServer
  public io: Server<ISocketOn, IScocketEmit>

  constructor(port: number) {
    this.port = port
    this.app = express()
    connectDB()
    this.httpServer = http.createServer(this.app)
    this.middlewares()
    this.io = new Server<ISocketOn, IScocketEmit>(this.httpServer, {
      cors: {
        origin: '*',
      },
    })

    this.sockets()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())

    this.app.use('/api/login', AuthRouter)
    this.app.use('/api/mensajes', MessageRouter)
  }

  sockets() {}

  start(callback: () => void) {
    this.httpServer.listen(this.port, () => callback())
  }
}
