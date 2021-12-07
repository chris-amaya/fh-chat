import {IScocketEmit, ISocketOn} from '@chat/common'
import {Server} from 'socket.io'
import {
  getUsers,
  saveMessage,
  userConnected,
  userDisconnected,
} from '../controllers/sockets'
import {checkJWT} from '../helpers/jwt'

export default class SocketsApp {
  io: Server<ISocketOn, IScocketEmit>

  constructor(io: Server<ISocketOn, IScocketEmit>) {
    this.io = io
    this.init()
  }

  init() {
    this.io.on('connection', async (socket) => {
      const [isValid, uid] = checkJWT(
        socket.handshake.query['x-token'] as string,
      )

      if (!isValid || typeof uid !== 'string') {
        return socket.disconnect()
      }

      await userConnected(uid)
      socket.join(uid)
      this.io.sockets.emit('list-users', await getUsers())
      socket.on('direct-message', async (payload) => {
        const message = await saveMessage(payload)
        if (message) {
          this.io.to(payload.from.toString()).emit('direct-message', message)
          this.io.to(payload.to.toString()).emit('direct-message', message)
        }
      })

      socket.on('disconnect', async () => {
        await userDisconnected(uid)
        this.io.emit('list-users', await getUsers())
      })
    })
  }
}
