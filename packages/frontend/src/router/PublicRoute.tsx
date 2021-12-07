import React from 'react'
import {Redirect, Route} from 'react-router'

interface Props {
  isAuthenticated: boolean
  component: React.ComponentType<unknown>
  [k: string]: unknown
}

export default function PublicRoute({
  isAuthenticated,
  component: Component,
  ...rest
}: Props) {
  return (
    <Route
      {...rest}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component={(props: any) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }></Route>
  )
}
