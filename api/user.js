/* 
  用户信息处理服务模块
*/

const fs = require('fs')
const Error = require('./../utils/error.js')
const Success = require('./../utils/success.js')
const path = require('path')


console.log(__dirname)
console.log(__filename)
console.log(process.cwd())
console.log(path.resolve('./../'))

// 更改姓名 get
const getUserData = {
  url: '/user/info',
  method: 'get',
  serve: async (ctx, next) => {
    // ctx.query 获取个get 参数 { id: 123 }
    const { id } = ctx.query
    if (!id) {
      ctx.response.body = new Error({ message: '用户id不能为空' })
      return false
    }
    const fileData = await new Promise(function(reso,reje){
      fs.readFile('./JSON/user.json', 'utf8', function(err,data){
        if(err) 
          reso('error');
        else
          reso(data)
      })
    }).then(function(data){
        return data
    })
    ctx.response.body = new Success({data: fileData})
  }
}

//  更改姓名  post
const  updateUser  = {
  url: '/user/update',
  method: 'post',
  serve: async (ctx, next) => {
    console.log(ctx.request.body)
    if (name) {
      const data = { name }
      ctx.response.body = new Success({ data })
    } else {
      ctx.response.body = new Error('用户名不能为空')
    }
  }
}

// 更改年龄 post
const updateAge = {
  url: '/user/:id',
  method: 'post',
  serve: async (ctx, next) => {
    const { age } = ctx.request.body
    if (age && typeof +age === 'number' && +age > 0 ) {
      const data = { age }
      ctx.response.body = new Success({ data })
    } else {
      ctx.response.body = new Error('age不能为空, 且不能小于等于0的数字')
    }
  }
}

module.exports = {
  updateUser,
  getUserData,
  updateAge
}