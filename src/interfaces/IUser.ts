import { Document } from "mongoose"

export interface IUser extends Document {
    nickName: string
    password: string
    token: string
}