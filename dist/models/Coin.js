"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const CoinSchema = new (0, _mongoose.Schema)({
    idCoin: {
        type: String,
    },
    typeCoin: {
        type: String,
    },
    symbol: {
        type: String,
    },
    coinName: {
        type: String,
    },
    description: {
        type: String,
    },
    notes: {
        type: String,
    },
    favorite: {
        type: Boolean,
    },
    favoriteCreated: {
        type: String,
    },
    favoriteUpdated: {
        type: String,
    }
}, {
    timestamps: true
})

exports. default = _mongoose.model('Coin', CoinSchema)