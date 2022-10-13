"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
require('dotenv').config()

const listUsers = async (request, response) => {
    try {
        const listAllUsers = await _User2.default.find({ User: _User2.default })

        if (listAllUsers.length >= 1) {
            response.status(200).json({ users: listAllUsers })
        } else {
            response.status(401).json({ message: 'Users not found' })
        }

    } catch (error) {
        throw error
    }
}

const addUser = async (request, response) => {
    try {
        let { nickName, password } = request.body 

        nickName = nickName.toLowerCase()

        const userExists = await _User2.default.findOne({ nickName: nickName })

        if (userExists) {
            response.status(409).json({ message: 'User already exists' })
        } else {

            const hashedPassword = await _bcryptjs2.default.hash(password, 10)

            const token = _jsonwebtoken2.default.sign({}, `${process.env.SECRET_KEY}`, { expiresIn: '1d' })

            const user = new (0, _User2.default)({
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

const authUser = async (request, response) => {
    try {
        let { nickName, password } = request.body 

        nickName = nickName.toLowerCase()

        const userAuth = await _User2.default.findOne({ nickName: nickName })

        if (!userAuth) {
            response.status(401).json({ message: 'User does not exists' })
        } else {

            const isValidPassword = await _bcryptjs2.default.compare(password, userAuth.password)

            if (!isValidPassword) {
                response.status(401).json({ message: 'Password is invalide' })
            } else {

                const token = _jsonwebtoken2.default.sign({ id: userAuth._id }, `${process.env.SECRET_KEY}`, { expiresIn: '1d' })

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

exports.addUser = addUser; exports.authUser = authUser; exports.listUsers = listUsers;