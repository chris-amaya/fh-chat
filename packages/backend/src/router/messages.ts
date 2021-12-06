import {Router} from 'express'
import {getMessages} from '../controllers/messages'
import validateJWT from '../middlewares/validate-jwt'

const router = Router()

router.get('/:de', validateJWT, getMessages)

export default router
