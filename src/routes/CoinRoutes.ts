import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware'

import { listCoins, listFavoriteCoins, writeCoins, saveCoins, getCoinByIdCoin} from '../controllers/CoinController'

const router: Router = Router()

router.post('/v1/coins/write', authMiddleware, writeCoins)
router.get('/v1/coins/list', authMiddleware, listCoins)
router.get('/v1/coins/list/favorites', authMiddleware, listFavoriteCoins)
router.get('/v1/coins/save', authMiddleware, saveCoins)
router.get('/v1/coin/get', authMiddleware, getCoinByIdCoin)

export default router
