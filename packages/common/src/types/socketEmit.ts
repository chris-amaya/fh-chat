import {IMessage, IUser} from '@chat/common'

interface socketEmit<T> {
  (data: T): void
}

export type IScocketEmit = {
  'list-users': IUser[] | socketEmit<IUser[]>
  'direct-message': IMessage | socketEmit<IMessage>
}
