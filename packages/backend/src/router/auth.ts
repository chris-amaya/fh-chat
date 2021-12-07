import {Router} from 'express'
import {check} from 'express-validator'
import {crearUsuario, login, renewToken} from '../controllers/auth'
import validateFields from '../middlewares/validate-fields'
import validateJWT from '../middlewares/validate-jwt'
const router = Router()

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validateFields,
  ],
  crearUsuario,
)
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio'),
    validateFields,
  ],
  login,
)
router.get('/renew', validateJWT, renewToken)

export default router
