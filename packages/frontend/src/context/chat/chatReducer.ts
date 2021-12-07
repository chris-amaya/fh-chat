import {IUser, IMessage} from '@chat/common'

const initialState = {
  uid: '',
  activeChat: '',
  users: [],
  messages: [],
}

type State = {
  uid: string
  activeChat: string
  users: IUser[]
  messages: IMessage[]
}

type Action =
  | {type: 'LogOut'}
  | {type: 'New Message'; payload: IMessage}
  | {type: 'Load Users'; payload: IUser[]}
  | {type: 'Load Chat'; payload: string}
  | {type: 'Load Messages'; payload: IMessage[]}

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LogOut':
      return initialState

    case 'Load Users':
      return {
        ...state,
        users: [...action.payload],
      }

    case 'Load Chat':
      if (state.activeChat === action.payload) return state
      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      }

    case 'New Message':
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        }
      } else {
        return state
      }

    case 'Load Messages':
      return {
        ...state,
        messages: [...action.payload],
      }

    default:
      return state
  }
}
