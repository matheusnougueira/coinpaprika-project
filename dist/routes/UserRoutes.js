"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');



var _UserController = require('../controllers/UserController');

const router = _express.Router.call(void 0, )

router.post('/v1/user/signup', _UserController.addUser, _UserController.authUser)
router.post('/v1/user/auth/login', _UserController.authUser)

exports. default = router
