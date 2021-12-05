import express from 'express'
import cors from 'cors'
import http from 'http'
import connectDB from '../db/config'

export default class App {
  public app: express.Application
  public port: number
  public httpServer

  constructor(port: number) {
    this.port = port
    this.app = express()
    connectDB()
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
