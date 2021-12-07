import {Schema, model} from 'mongoose'
import {IMessage} from '@chat/common'

const MessageSchema = new Schema<IMessage>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

MessageSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {__v, ...object} = this.toObject()
  return object
})

export const Message = model<IMessage>('Mensaje', MessageSchema)
