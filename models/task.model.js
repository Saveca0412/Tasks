const { datab, DataTypes } = require('../util/datab.util')

const Task = datab.define( 'task', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,

  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  limitDate:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishDate:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  status:{
    type: DataTypes.STRING,
    defaultValue: 'active',
    allowNull: false
  }
})
module.exports = { Task }