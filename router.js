const Router = require('koa-router') // koa 路由中间件
const router = new Router({
  prefix: '/api'
}) // 实例化路由

// 用户服务
const user = require('./api/user.js')
ergodicData(user)
// 文件服务
/* const file = require('./api/file.js')
ergodicData(file) */

// 遍历数据
function ergodicData(data) {
  for(let key in data) {
    if (data[key]) {
      requireHandle(data[key])
    }
  }
}

// 请求处理
function requireHandle(data) {
  // data.method.toUpperCase() 字符串全部转为大写
  switch(data.method.toUpperCase()) {
    // get 请求
    case 'GET': {
      router.get(data.url, data.serve)
      break
    }
    // post 请求
    case 'POST': {
      router.post(data.url, data.serve)
      break
    }
    default: break
  }
}

module.exports = router