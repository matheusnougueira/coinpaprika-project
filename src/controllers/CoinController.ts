import { Request, Response } from 'express'
import { ICoin } from '../interfaces/ICoin'
import Coin from '../models/Coin'
import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client'

// Salvar no banco as coins da API
const saveCoins = async (request: Request, response: Response): Promise<void> => {
    try {
        const client = new CoinpaprikaAPI()

        client.getCoins().then((el) => {
            console.log('entrou no then')
            console.log('el', el)
            el.map(element => {

                const coin: ICoin = new Coin({
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

const listCoins = async (request: Request, response: Response): Promise<void> => {
    try {
        const listAllCoins = await Coin.find({ Coin })

        if (listAllCoins.length >= 1) {
            response.status(200).json({ coins: listAllCoins })
        } else {
            response.status(401).json({ message: 'Coins not found' })
        }

    } catch (error) {
        throw error
    }
}

const getCoinByIdCoin = async (request: Request, response: Response): Promise<void> => {
    try {

        let { idCoin } = request.body as Pick<ICoin, 'notes' | 'description' | 'favorite' | 'idCoin'>

        const getCoin = await Coin.find({ idCoin: idCoin })

        getCoin ? response.status(200).json({ coin: getCoin }) : response.status(401).json({ message: 'Coin not found' })

    } catch (error) {
        throw error
    }
}

const listFavoriteCoins = async (request: Request, response: Response): Promise<void> => {
    try {
        const listAllFavoriteCoins = await Coin.find({ favorite: true })

        if (listAllFavoriteCoins.length >= 1) {
            response.status(200).json({ favoriteCoins: listAllFavoriteCoins })
        } else {
            response.status(401).json({ message: 'Favorites Coin not found' })
        }

    } catch (error) {
        throw error
    }
}

// Favoritar, editar favorito, remover favorito
const writeCoins = async (request: Request, response: Response): Promise<void> => {
    try {

        let { idCoin, notes, favorite } = request.body as Pick<ICoin, 'notes' | 'description' | 'favorite' | 'idCoin'>

        const coinExists = await Coin.findOne({ idCoin: idCoin })

        if (!coinExists) {

            response.status(401).json({ message: 'Coin not found' })
        } else {

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);

            today.toDateString()

            const coin: ICoin = new Coin({
                notes,
                favorite,
                favoriteCreated: today,
                favoriteUpdated: today
            })

            await Coin.updateOne({ idCoin: idCoin }, {
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

export { listCoins, writeCoins, saveCoins, getCoinByIdCoin, listFavoriteCoins }
