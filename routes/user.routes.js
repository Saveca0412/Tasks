const express = require('express')
const { getAllUser, updateUser, createUser, deleteUser } = require('../controllers/user.controller')
const { validateUserExists, checkEmailExists } = require('../middleware/users.middlewares')
const { createUserValidators } = require('../middleware/validators.middlewares')
const { User } = require('../models/user.model')

const userRouter = express.Router()

userRouter.get( '/', getAllUser)
userRouter.post( '/',createUserValidators,checkEmailExists,createUser )
userRouter.patch( '/:id', validateUserExists, updateUser )
userRouter.delete( '/:id', validateUserExists, deleteUser )

module.exports = { userRouter }