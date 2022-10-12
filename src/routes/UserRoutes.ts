import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware'

import { addUser, authUser, listUsers } from '../controllers/UserController'

const router: Router = Router()

router.post('/v1/user/signup', addUser, authUser)
router.post('/v1/user/auth/login', authUser)

export default router
