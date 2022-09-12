const { Task } = require('../models/task.model')
const { User } = require('../models/user.model')

const  createTask = async( req, res)=>{
  try {
    const { title, userId, startDate, limitDate } =  req.body
    const newTask = await Task.create({
      title,
      userId,
      startDate,
      limitDate
    })
    res.status(201).json({
      status: 'success',
      data: { newTask }
    })
  } catch (error) {
    console.error(error)
  }
}

const getAllTasks = async (req, res)=>{
  try {
    const tasks = await Task.findAll({
      attributes:['id', 'title','startDate','limitDate','finishDate','status'],
      include: [{ model:User, attributes: ['id', 'name']}]
    })
    res.status(200).json({
      status: 'success',
      data: { tasks }
    })
  } catch (error) {
    console.error(error)
  }
}

const getFilteredTasks = async (req, res)=>{
  try {
    const {status} = req.params
    const tasks = await Task.findAll({where: {status: status}})
    res.status(200).json({
      status: 'success',
      data: { tasks }
    })
  } catch (error) {
    console.error(error)
  }
}

const updateTask = async(req, res)=>{
  const {task} = req
  const {finishDate} = req.body 
  const dateOne = new Date(task.limitDate)
  const dateTwo = new Date(finishDate)
  try {
    if (task.status === 'active') {
      task.update({finishDate})
      dateOne >= dateTwo ? task.update({status:'completed'}) : task.update({status:'late'})
      res.status(200).json({
      status: 'success',
      data:{task}
    })
    }else{
      return res.status(409).json({
      status: 'error',
      message: 'The task is not currently active, and cannot be updated'
      })
    }
  
  } catch (error) {
    console.error(error)
  }
}

const deleteTask = async(req, res)=>{
  const {task} = req
  try {
    if (task.status === 'active') {
      task.update({status: 'cancelled'})
      res.status(204).json({
        status: 'success'
      })
    }else{
      return res.status(409).json({
      status: 'error',
      message: 'The task is not currently active, and cannot be updated'
      })
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createTask, getAllTasks,getFilteredTasks,updateTask,deleteTask }