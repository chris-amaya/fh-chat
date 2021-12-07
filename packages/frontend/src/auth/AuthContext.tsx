import createCtx from '../utils/createCtx'
import {ReactNode, useCallback, useState} from 'react'
import {fetchWithoutToken, fetchWithToken} from '../helpers/fetch'

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
}

interface AuthContext {
  login: (email: string, password: string) => Promise<void>
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<string | true>
  verifyToken: () => void
  logout: () => void
  auth: {
    uid: string | null
    checking: boolean
    logged: boolean
    name: string | null
    email: string | null
  }
}

const [useAuthContext, Provider] = createCtx<AuthContext>()

function AuthProvider({children}: {children: ReactNode}) {
  const [auth, setAuth] = useState(initialState)

  async function login(email: string, password: string) {
    const resp = await fetchWithoutToken('login', {email, password}, 'POST')
    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const {usuario} = resp

      setAuth({
        uid: usuario.uid,
        name: usuario.nombre,
        email: usuario.email,
        checking: false,
        logged: true,
      })
    }
  }

  async function signup(name: string, email: string, password: string) {
    const resp = await fetchWithoutToken(
      'login/new',
      {email, password, name},
      'POST',
    )
    if (resp.ok) {
      localStorage.setItem('token', resp.token)

      const {usuario} = resp

      setAuth({
        uid: usuario.uid,
        name: usuario.nombre,
        email: usuario.email,
        checking: false,
        logged: true,
      })

      return true
    }

    return resp.msg
  }

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })

      return false
    }

    const resp = await fetchWithToken('login/renew')
    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const {usuario} = resp

      setAuth({
        uid: usuario.uid,
        name: usuario.nombre,
        email: usuario.email,
        checking: false,
        logged: true,
      })

      return true
    } else {
      setAuth({
        uid: null,
        logged: true,
        checking: false,
        email: null,
        name: null,
      })

      return false
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    // dispatch({type: 'LogOut'})
    setAuth({
      ...auth,
      checking: false,
      logged: false,
    })
  }

  return (
    <Provider value={{login, signup, verifyToken, logout, auth}}>
      {children}
    </Provider>
  )
}

export {useAuthContext, AuthProvider}
