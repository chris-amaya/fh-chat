import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'

export default function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('x-token')

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición',
      })
    }

    interface Decoded extends jwt.JwtPayload {
      uid: string
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as jwt.Secret,
    ) as unknown as Decoded
    ;(req as any).uid = payload.uid

    next()
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }
}
