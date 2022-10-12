import { Request, Response, NextFunction } from 'express'
import { ITokenPayLoad } from '../interfaces/ITokenPayLoad'
import jwt from 'jsonwebtoken'

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers

    if (!authorization) return response.status(401).json({ error: 'Unauthorized' })

    const token = authorization?.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, 'secret')

        // const { id } = data as ITokenPayLoad

        return next()

    } catch {
        return response.status(401)
    }
}