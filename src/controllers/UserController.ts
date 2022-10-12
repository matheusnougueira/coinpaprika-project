import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const listUsers = async (request: Request, response: Response): Promise<void> => {
    try {
        const listAllUsers = await User.find({ User })

        if (listAllUsers.length >= 1) {
            response.status(200).json({ users: listAllUsers })
        } else {
            response.status(401).json({ message: 'Users not found' })
        }

    } catch (error) {
        throw error
    }
}

const addUser = async (request: Request, response: Response): Promise<void> => {
    try {
        let { nickName, password } = request.body as Pick<IUser, 'nickName' | 'password'>

        nickName = nickName.toLowerCase()

        const userExists = await User.findOne({ nickName: nickName })

        if (userExists) {
            response.status(409).json({ message: 'User already exists' })
        } else {

            const hashedPassword = await bcrypt.hash(password, 10)

            const token = jwt.sign({}, `${process.env.SECRET_KEY}`, { expiresIn: '1d' })

            const user: IUser = new User({
                nickName,
                password: hashedPassword,
                token: token
            })

            await user.save()

            const userCreated = {
                nickName: nickName,
                password: hashedPassword,
                authorization: {
                    token: token
                }
            }

            response.status(201).json({ message: 'User added', user: userCreated })
        }
    } catch (error) {
        throw error
    }
}

const authUser = async (request: Request, response: Response): Promise<void> => {
    try {
        let { nickName, password } = request.body as Pick<IUser, 'nickName' | 'password'>

        nickName = nickName.toLowerCase()

        const userAuth = await User.findOne({ nickName: nickName })

        if (!userAuth) {
            response.status(401).json({ message: 'User does not exists' })
        } else {

            const isValidPassword = await bcrypt.compare(password, userAuth.password)

            if (!isValidPassword) {
                response.status(401).json({ message: 'Password is invalide' })
            } else {

                const token = jwt.sign({ id: userAuth._id }, `${process.env.SECRET_KEY}`, { expiresIn: '1d' })

                const userAuthorized = {
                    user: nickName,
                    token: {
                        value: token,
                        expiresIn: '1d'
                    },
                }

                response.status(200).json({
                    userAuthorized
                })
            }
        }

    } catch (error) {
        throw error
    }

}

export { addUser, authUser, listUsers }