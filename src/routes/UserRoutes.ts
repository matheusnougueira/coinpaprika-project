import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware'

import { addUser, authUser, listUsers } from '../controllers/UserController'

const router: Router = Router()

router.post('/user', addUser)
router.post('/user/auth', authUser)

// Rota autenticada que vai listar informações da API do coinpaprika
router.get('/users', authMiddleware, listUsers)

export default router

