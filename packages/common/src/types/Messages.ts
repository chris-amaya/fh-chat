import {ObjectId} from 'mongoose'

export interface IMessage {
  from: string | ObjectId
  to: string | ObjectId
  message: string
  online?: boolean
}
