"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _CoinController = require('../controllers/CoinController');

const router = _express.Router.call(void 0, )

router.post('/v1/coins', _authMiddleware2.default, _CoinController.writeCoins)
router.get('/v1/coins/list', _authMiddleware2.default, _CoinController.listCoins)
router.get('/v1/coins/list/favorites', _authMiddleware2.default, _CoinController.listFavoriteCoins)
router.get('/v1/coins/save', _authMiddleware2.default, _CoinController.saveCoins)
router.get('/v1/coin/get', _authMiddleware2.default, _CoinController.getCoinByIdCoin)

exports. default = router
