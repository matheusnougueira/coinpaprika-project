import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const UserSchema: Schema = new Schema({
    nickName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

export default model<IUser>('User', UserSchema)