import {IMessage, IUser} from '@chat/common'
import {Message} from '../models/Messages'
import {User} from '../models/User'

async function userConnected(uid: string): Promise<IUser | false> {
  const user = await User.findById(uid)

  if (!user) {
    return false
  }

  user.online = true
  await user.save()

  return user
}

async function userDisconnected(uid: string) {
  const usuario = await User.findById(uid)

  if (!usuario) {
    return false
  }

  usuario.online = false
  await usuario.save()

  return usuario
}

async function getUsers() {
  const users = await User.find().sort('-online')
  return users
}

async function saveMessage(payload: IMessage): Promise<IMessage | false> {
  try {
    const mensaje = new Message(payload)
    await mensaje.save()

    return mensaje
  } catch (error) {
    console.log(error)
    return false
  }
}

export {userConnected, userDisconnected, getUsers, saveMessage}
