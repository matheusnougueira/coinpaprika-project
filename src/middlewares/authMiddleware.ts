require('dotenv').config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers

    if (!authorization) return response.status(401).json({ error: 'Unauthorized' })

    const token = authorization?.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, `${process.env.SECRET_KEY}`)

        if (!data) return response.status(401).json({ error: 'Unauthorized' })

        return next()

    } catch {
        return response.status(401)
    }
}