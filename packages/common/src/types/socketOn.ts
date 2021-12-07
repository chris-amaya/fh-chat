import {IMessage} from '@chat/common'

interface socketOn<T> {
  (data: T): void
}

export interface ISocketOn {
  'direct-message': socketOn<IDirectMessage>
}

export type IDirectMessage = IMessage
