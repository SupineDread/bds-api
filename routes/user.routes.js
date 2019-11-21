const express = require('express');
const api = express.Router();

// const auth = require('../../middlewares/auth')
const auth = require('../middlewares/auth');

const userController = require('../controllers/user.controller');

api.post('/register', userController.register);
api.post('/login', userController.login);

module.exports = api;