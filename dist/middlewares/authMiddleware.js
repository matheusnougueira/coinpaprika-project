"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }require('dotenv').config()

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

 async function authMiddleware(request, response, next) {
    const { authorization } = request.headers

    if (!authorization) return response.status(401).json({ error: 'Unauthorized' })

    const token = _optionalChain([authorization, 'optionalAccess', _ => _.replace, 'call', _2 => _2('Bearer', ''), 'access', _3 => _3.trim, 'call', _4 => _4()])

    try {
        const data = _jsonwebtoken2.default.verify(token, `${process.env.SECRET_KEY}`)

        if (!data) return response.status(401).json({ error: 'Unauthorized' })

        return next()

    } catch (e) {
        return response.status(401)
    }
} exports.default = authMiddleware;