import {IMessage} from '@chat/common'

interface socketEmit<T> {
  (data: T): void
}

export type IScocketEmit = {
  'list-users': IListUsers | socketEmit<IListUsers>
  'direct-message': IDirectMessage | socketEmit<IDirectMessage>
}

interface IListUsers extends IMessage {}
interface IDirectMessage extends IMessage {}
