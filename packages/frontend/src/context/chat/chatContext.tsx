import createCtx from '../../utils/createCtx.useReducer'
import {reducer} from './chatReducer'

const initialState = {
  uid: '',
  activeChat: '',
  users: [],
  messages: [],
}

const [Context, Provider] = createCtx(reducer, initialState)

export {Context as ChatContext, Provider as ChatProvider}
