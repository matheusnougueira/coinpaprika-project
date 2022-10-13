"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv').config()
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _UserRoutes = require('./routes/UserRoutes'); var _UserRoutes2 = _interopRequireDefault(_UserRoutes);
var _CoinRoutes = require('./routes/CoinRoutes'); var _CoinRoutes2 = _interopRequireDefault(_CoinRoutes);

const app = _express2.default.call(void 0, )

const PORT = process.env.PORT || 3000

app.use(_express2.default.json())
app.use(_cors2.default.call(void 0, ))
app.use(_UserRoutes2.default)
app.use(_CoinRoutes2.default)

const uri = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.h2iujyl.mongodb.net/?retryWrites=true&w=majority`

_mongoose2.default
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })