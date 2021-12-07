import React from 'react'
import {Redirect, Route} from 'react-router'

interface Props {
  isAuthenticated: boolean
  component: React.ComponentType<any>
  [k: string]: any
}

export default function PublicRoute({
  isAuthenticated,
  component: Component,
  ...rest
}: Props) {
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }></Route>
  )
}
