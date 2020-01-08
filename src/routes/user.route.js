const express = require('express');
const route = express.Router();
const UserController = require('../controllers/user.controller');

route.post('/login', UserController.login);
route.post('/signUp', UserController.signUp);

module.exports = route;