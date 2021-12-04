import express from 'express'
import cors from 'cors'
import http from 'http'

export default class AppServer {
  public app: express.Application
  public port: number
  public httpServer

  constructor(port: number) {
    this.port = port
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.middlewares()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, () => callback())
  }
}
