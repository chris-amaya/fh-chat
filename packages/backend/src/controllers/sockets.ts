import {IMessage} from '@chat/common'
import {Message} from '../models/Messages'
import {IUser, User} from '../models/User'

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

async function getUsers(): Promise<any> {
  const usuarios = await User.find().sort('-online')
  return usuarios
}

async function saveMessage(payload: any): Promise<IMessage | false> {
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
