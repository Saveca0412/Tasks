const express = require('express')
const { createTask,getAllTasks,getFilteredTasks,updateTask,deleteTask } = require('../controllers/task.controller')
const { validateTaskStatus,validateTaskExists } = require('../middleware/tasks.middleware')
const { createTaskValidators } = require('../middleware/validators.middlewares')

const taskRouter = express.Router()

taskRouter.post( '/',createTaskValidators,createTask )
taskRouter.get( '/', getAllTasks)
taskRouter.get( '/:status',validateTaskStatus,getFilteredTasks )
taskRouter.patch( '/:id', validateTaskExists, updateTask)
taskRouter.delete( '/:id', validateTaskExists, deleteTask)

module.exports = { taskRouter }