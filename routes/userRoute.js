const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController')

userRoutes.get('/', userController.allUsers);
userRoutes.get('/:user_id', userController.getUserById);


userRoutes.post('/', userController.createUser);

userRoutes.patch('/:user_id', userController.editUser);


module.exports = userRoutes;