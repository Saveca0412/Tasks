const { Task } = require('./task.model')
const { User } = require('./user.model')

const initmodels = ()=>{
  // 1 user to many tasks
  User.hasMany( Task, { foreignKey: 'userId' })
  Task.belongsTo( User )
}
module.exports = { initmodels } 





