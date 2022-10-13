import { Schema, model } from 'mongoose'
import { ICoin } from '../interfaces/ICoin'

const CoinSchema: Schema = new Schema({
    idCoin: {
        type: String,
    },
    typeCoin: {
        type: String,
    },
    symbol: {
        type: String,
    },
    coinName: {
        type: String,
    },
    description: {
        type: String,
    },
    notes: {
        type: String,
    },
    favorite: {
        type: Boolean,
    },
    favoriteCreated: {
        type: String,
    },
    favoriteUpdated: {
        type: String,
    }
}, {
    timestamps: true
})

export default model<ICoin>('Coin', CoinSchema)