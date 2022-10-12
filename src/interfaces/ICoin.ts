import { Document } from "mongoose"

export interface ICoin extends Document {
    idCoin: string
    symbol: string
    notes: string
    description: string
    favorite: boolean | null 
    favoriteCreated: string
    favoriteUpdated: string
}