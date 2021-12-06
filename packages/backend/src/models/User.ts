import {Schema, model} from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  online: boolean
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
})

UserSchema.method('toJSON', function () {
  const {__v, _id, password, ...object} = this.toObject()
  object.uid = _id
  return object
})

export const User = model<IUser>('User', UserSchema)
