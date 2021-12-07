/**
 * this function is used to create a context where is being used a reducer
 */

import React from 'react'
export default function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
  })
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initialState)
    return <ctx.Provider value={{state, dispatch}} {...props} />
  }
  return [ctx, Provider] as const
}
