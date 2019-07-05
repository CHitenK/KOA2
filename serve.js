const Koa = require('koa'); // Koa 为一个class
const app = new Koa();

const path = require('path');
const serve = require('koa-static')

// 1.主页静态网页 把静态页统一放到public中管理
const home   = serve(path.join(__dirname) + '/public/' )
app.use(home)


// 用来获取post 请求的参数
// koa-bodyparser 中间件来处理post请求 
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

/* 
  解析上传文件的插件
 */
const koaBody = require('koa-body')
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 10000 * 1024 * 1024 //10M  设置上传文件大小最大限制，默认2
  }
}))

const router = require('./router.js')
app.use(router.routes())


app.listen(3333, () => {
  console.log('----- This server is running at http://localhost:' + 3333 + '-----')
})

