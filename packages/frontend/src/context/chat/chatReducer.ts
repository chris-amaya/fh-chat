import createCtx from '../../utils/createCtx.useReducer'
// import { IMessage } from '../../../../common/src/types/Messages';

import {IMessage} from '@chat/common'

const initialState = {
  uid: '',
  activeChat: '',
  users: [],
  messages: [],
}

type State = {
  uid: string
  activeChat: string
  users: string[]
  messages: IMessage[]
}

type Action =
  | {type: 'LogOut'}
  | {type: 'Users'; payload: any}
  | {type: 'Chat Is Focus'; payload: any}
  | {type: 'New Message'; payload: any}
  | {type: 'Load Messages'; payload: any}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LogOut':
      return initialState

    case 'Users':
      return {
        ...state,
        users: action.payload,
      }

    case 'Chat Is Focus':
      if (state.activeChat === action.payload) return state
      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      }

    case 'New Message':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      }

    case 'Load Messages':
      return {
        ...state,
        messages: [...action.payload],
      }

    default:
      throw new Error('Action not found')
  }
}

const [Context, Provider] = createCtx(reducer, initialState)

export {Context as ChatContext, Provider as ChatProvider}
