import {Request, Response} from 'express'
import {User} from '../models/User'

// const Usuario = require('../models/usuario')
// UserModel
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

async function crearUsuario(req: Request, res: Response) {
  try {
    const {email, password} = req.body

    const existeEmail = await User.findOne({email})

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe',
      })
    }

    // guardar usuario en BD
    const usuario = new User(req.body)

    const salt = await bcrypt.genSaltSync()
    usuario.password = await bcrypt.hashSync(password, salt)

    await usuario.save()

    const token = await generarJWT(usuario.id)

    res.json({
      email,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }

  res.json({ok: true, usuario: '1234'})
}

async function login(req: Request, res: Response) {
  const {email, password} = req.body

  try {
    // verificar si el correo existe
    const usuarioDB = await User.findOne({email})
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo no existe',
      })
    }

    // validar password
    const validarPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El password es incorrecto',
      })
    }

    // generar token
    const token = await generarJWT(usuarioDB.id)

    res.json({ok: true, usuario: usuarioDB, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

async function renewToken(req: Request, res: Response) {
  const uid = req.uid
  const token = await generarJWT(uid)

  const usuario = await User.findById(uid)

  res.json({ok: true, usuario, token})
}

export {crearUsuario, login, renewToken}
