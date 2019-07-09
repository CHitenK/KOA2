// db/db.js
const mongoose = require('mongoose')

const DB_URL = 'mongodb:http://192.168.0.122:27017/testdb'

mongoose.connect(DB_URL)

mongoose.connection.on('connected',() => {
  console.log('Mongoose connection open to '+ DB_URL)
})

/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: '+ err)
})

/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose