"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Coin = require('../models/Coin'); var _Coin2 = _interopRequireDefault(_Coin);
var _apinodejsclient = require('@coinpaprika/api-nodejs-client'); var _apinodejsclient2 = _interopRequireDefault(_apinodejsclient);

const saveCoins = async (request, response) => {
    try {
        const client = new (0, _apinodejsclient2.default)()

        client.getCoins().then((el) => {
            console.log('entrou no then')
            console.log('el', el)
            el.map(element => {

                const coin = new (0, _Coin2.default)({
                    idCoin: element.id,
                    notes: element.name,
                    symbol: element.symbol,
                    type: element.type
                })
                coin.save()
                response.status(200).json({ message: 'Coins saveds', coins: coin })
            })
        });
    } catch (error) {
        throw error
    }
}

const listCoins = async (request, response) => {
    try {
        const listAllCoins = await _Coin2.default.find({ Coin: _Coin2.default })

        if (listAllCoins.length >= 1) {
            response.status(200).json({ coins: listAllCoins })
        } else {
            response.status(401).json({ message: 'Coins not found' })
        }

    } catch (error) {
        throw error
    }
}

const getCoinByIdCoin = async (request, response) => {
    try {

        let { idCoin } = request.body 

        const getCoin = await _Coin2.default.find({ idCoin: idCoin })

        getCoin ? response.status(200).json({ coin: getCoin }) : response.status(401).json({ message: 'Coin not found' })

    } catch (error) {
        throw error
    }
}

const listFavoriteCoins = async (request, response) => {
    try {
        const listAllFavoriteCoins = await _Coin2.default.find({ favorite: true })

        if (listAllFavoriteCoins.length >= 1) {
            response.status(200).json({ favoriteCoins: listAllFavoriteCoins })
        } else {
            response.status(401).json({ message: 'Favorites Coin not found' })
        }

    } catch (error) {
        throw error
    }
}

const writeCoins = async (request, response) => {
    try {

        let { idCoin, notes, favorite } = request.body 

        const coinExists = await _Coin2.default.findOne({ idCoin: idCoin })

        if (!coinExists) {

            response.status(401).json({ message: 'Coin not found' })
        } else {

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);

            today.toDateString()

            const coin = new (0, _Coin2.default)({
                notes,
                favorite,
                favoriteCreated: today,
                favoriteUpdated: today
            })

            await _Coin2.default.updateOne({ idCoin: idCoin }, {
                notes: coin.notes,
                favorite: coin.favorite,
                favoriteCreated: coin.favoriteCreated,
                favoriteUpdated: coin.favoriteUpdated
            })

            response.status(201).json({ message: 'Coin updated', coin: coin })
        }
    } catch (error) {
        throw error
    }
}

exports.listCoins = listCoins; exports.writeCoins = writeCoins; exports.saveCoins = saveCoins; exports.getCoinByIdCoin = getCoinByIdCoin; exports.listFavoriteCoins = listFavoriteCoins;
