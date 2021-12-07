import {IUser} from '@chat/common'
import jwt from 'jsonwebtoken'

const getJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = {uid}

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          reject('Error generando el token')
        } else {
          if (token) {
            resolve(token)
          }
        }
      },
    )
  })
}

const checkJWT = (token = '') => {
  try {
    const {uid} = jwt.verify(token, process.env.JWT_KEY) as IUser
    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}

export {getJWT as generarJWT, checkJWT}
