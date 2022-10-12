import { Request, Response } from 'express'
import { ICoin } from '../interfaces/ICoin'
import Coin from '../models/Coin'


const listAllCoins = async (request: Request, response: Response): Promise<void> => {
    try {
        const listAllCoins = await Coin.find({ Coin })

        if (listAllCoins.length >= 1) {
            response.status(200).json({ users: listAllCoins })
        } else {
            response.status(401).json({ message: 'Coins not found' })
        }

    } catch (error) {
        throw error
    }
}

const listFavoriteCoins = async (request: Request, response: Response): Promise<void> => {
    try {
        const listFavoriteCoins = await Coin.find({ Coin })

        if (listFavoriteCoins.length >= 1) {
            response.status(200).json({ users: listFavoriteCoins })
        } else {
            response.status(401).json({ message: 'Coins not found' })
        }

    } catch (error) {
        throw error
    }
}

// Favoritar, editar favorito, remover favorito
const editCoins = async (request: Request, response: Response): Promise<void> => {
    try {

        let { notes, description, favorite } = request.body as Pick<ICoin, 'notes' | 'description' | 'favorite'>
        let { idCoin } = request.query as Pick<ICoin, 'idCoin'>

        const coinExists = await Coin.findOne({ idCoin: idCoin })

        if (!coinExists) {
            response.status(401).json({ message: 'Coins does not exists' })
        } else {

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);

            today.toDateString()

            const coin: ICoin = new Coin({
                notes,
                description,
                favorite,
                favoriteCreated: today,
                favoriteUpdated: today
            })

            await coin.save()

            response.status(201).json({ message: 'Coin updated', coin: coin })
        }
    } catch (error) {
        throw error
    }
}

export { listAllCoins, listFavoriteCoins, editCoins }
