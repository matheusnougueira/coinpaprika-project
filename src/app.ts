require('dotenv').config()
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/UserRoutes'
import coinRoutes from './routes/CoinRoutes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(coinRoutes)

const uri: string = `${process.env.DB_HOST}`

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })