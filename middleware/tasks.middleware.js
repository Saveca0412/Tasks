const express = require ('express')
const { Task } = require('../models/task.model')

const validateTaskExists = async ( req, res, next )=>{
  try{
    const { id } = req.params
    const task = await Task.findOne({where: {id} })
    if (!task) {
      return res.status(404).json({ status: 'error', message: "Task couldn't be found"})
    }
    req.task = task
  }catch (error){
    console.log(error)
  }
  next()
}

const validateTaskStatus = async ( req, res, next )=>{
  try{
    const { status } = await req.params
    // const user = await User.findOne({where: {id} })
    const statusArray = ['active', 'completed','cancelled','late']
    let statusAllowed =  false
    for  (let i = 0; i < 4; i++) {
      if (statusArray[i] === status) {
        statusAllowed = true
      }
    }
    if (!statusAllowed) {
      return res.status(404).json({ status: 'error', message: 'Only statuses are allowed as (active, completed, late, cancelled)'})
    }
  }catch (error){
    console.log(error)
  }
  next()
}

module.exports =  { validateTaskStatus,validateTaskExists }








