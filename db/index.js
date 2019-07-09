const mongoose = require('./db')
const User = mongoose.user

var schema = new mongoose.Schema({
  name: String
})

const MyModel = mongoose.model('user', schema)

class UserMongodb {
  constructor() {

  }
  // 查询
  query () {
    return new Promise((resolve, reject) => {
      MyModel.find({}, (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 保存
  save (obj) {
    const m = new MyModel(obj)
    return new Promise((resolve, reject)=> {
      m.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
}

module.exports = new UserMongodb()
