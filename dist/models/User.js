"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const UserSchema = new (0, _mongoose.Schema)({
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

exports. default = _mongoose.model('User', UserSchema)