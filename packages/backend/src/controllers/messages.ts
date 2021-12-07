import {Request, Response} from 'express'
import {Message} from '../models/Messages'

const getMessages = async (req: Request, res: Response) => {
  const miId = (req as any).uid
  const mensajesDe = req.params.de

  const last30 = await Message.find({
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
