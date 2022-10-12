import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware'

import { listAllCoins, listFavoriteCoins, editCoins } from '../controllers/CoinController'

const router: Router = Router()

router.put('/v1/coins', authMiddleware, editCoins)
router.get('/v1/coins/list', authMiddleware, listAllCoins)
router.get('/v1/coins/list/favorites', authMiddleware, listFavoriteCoins)


export default router
