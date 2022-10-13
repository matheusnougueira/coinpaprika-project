"use strict";// import { Request, Response } from 'express'
// import { IUser } from '../types/IUser';
// import User from '../models/User'
// import bcrypt from 'bcryptjs'

// class UserService implements IUserService {

//     constructor() {
//         iUserService: IUserService;
//     }

//     public async createUser(request: Request, response: Response) {
//         try {

            
//             const { nickName, password } = request.body as Pick<IUser, 'nickName' | 'password'>
    
//             const userExists = await User.findOne({ nickName: nickName })
    
//             if (userExists) {
//                 response.status(409).json({ message: 'User already exists' })
//             } else {
    
//                 const hashedPassword = await bcrypt.hash(password, 10)
    
//                 const user: IUser = new User({
//                     nickName,
//                     password: hashedPassword
//                 })
    
    
//                 const newUser: IUser = await user.save()
    
//                 response.status(201).json({ message: 'User added', user: newUser })
//             }
//         } catch (error) {
//             throw error
//         }
//     }

// }

// export default UserService;