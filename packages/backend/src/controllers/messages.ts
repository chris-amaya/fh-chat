import {Request, Response} from 'express'

const Mensaje = require('../models/mensaje')

const getMessages = async (req: Request, res: Response) => {
  const miId = req.uid
  const mensajesDe = req.params.de

  const last30 = await Mensaje.find({
    $or: [
      {de: miId, para: mensajesDe},
      {de: mensajesDe, para: miId},
    ],
  })
    .sort({createdAt: 'asc'})
    .limit(30)

  res.json({
    ok: true,
    mensajes: last30,
  })
}

export {getMessages}
