
/* 
  处理文件读写模块
*/
const fs = require('fs')
const Error = require('./../utils/error.js')
const Success = require('./../utils/success.js')

// 读取文件
const readFille = {
  url: '/file/read',
  method: 'get',
  serve: async (ctx, next) => {
    const fileName = './JSON/user.json'
    const fileName1 = './public/libs/jq/jquery.tips.js'
    // 读取小文件
    const fileData  = await readFilleMini({ fileName })
    // 读取大文件
    const fileData1  = await readFileBig(fileName1)
    // console.log(fileData1)
    ctx.response.body = fileData
  }
}

// 写入文件
const writeFile = {
  url: '/file/write',
  method: 'post',
  serve: async (ctx, next) => {
    const fileName = `./JSON/${Date.now()}.text`
    // 写入小文件
    const data = await writeFileMini(fileName, '4564651212')
    // 写入大文件
    const data1 = await writeFileBig(fileName)
    // 写入成功执行
    if (data.code === 'success') {

    } else { // 写入失败

    }
    ctx.response.body = data1
  } 
}

// 上传图片并保存
const uploadPictrue = {
  url: '/file/upload/img',
  method: 'post',
  serve: async (ctx, next) => {
     const file = ctx.request.files
     // 创建可读流
     const reader = fs.createReadStream(ctx.request.files['image']['path'])
     // 文件名称
     const filePath = './public/images/' + ctx.request.files['image']['name']
     // 可访问路径
     const remoteFilePath = 'http://192.168.0.77:3333/images/' + ctx.request.files['image']['name']
     // 创建可写流
     const upStream = fs.createWriteStream(filePath)
     reader.pipe(upStream)
     
     ctx.response.body = new Success({ data: '上传成功', url: remoteFilePath })
  }
}

// 读取小文件方法
function readFilleMini(data) {
  const options = Object.assign({}, { encoding: 'utf8' }, data)
  return new Promise((soleved, reject) => {
    fs.readFile(options.fileName, options.encoding, (err, res) => {
      if (err) {
        reject(new Error({ data: err, message: '读取失败'}))
      } else {
        soleved(new Success({ data: res }))
      }
    })
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}

// 读取大文件方法
function readFileBig(fileName) {
  return new Promise((soleved, reject) => {
    const readStream = fs.createReadStream(fileName, {
      flags: 'r',       // 设置文件只读模式打开文件
      encoding: 'utf8'  // 设置读取文件的内容的编码
    })
    let fileData = ''
    readStream.on('open', fd => {
      console.log('打开文件')
    })
    readStream.on('data', data => {
      fileData = fileData + data
    })
    readStream.on('close', (err) => {
      console.log('关闭文件')
      if (err === 'error') {
        reject(err)
      } else {
        soleved(new Success({ data: fileData }))
      }
    })
  }).then(res => {
    return res
  }).catch(res => {
    return res
  })
}

// 写入文件方法 小
function writeFileMini(fileName, data) {
  return new Promise((soleved, reject) => {
    fs.writeFile(fileName, data, err => {
      if (err) {
        reject(new Error('写入失败'))
      } else {
        soleved(new Success({ data: '写入成功'}))
      }
    })
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}

// 写入文件方法 大
function writeFileBig(fileName, data) {
  return new Promise((soleved, reject) => {
    /* 
      flags:'w'//文件的打开模式
      ,mode:0o666//文件的权限设置
      ,encoding:'utf8'//写入文件的字符的编码
      ,highWaterMark:3//最高水位线
      ,start:0 //写入文件的起始索引位置        
      ,autoClose:true//是否自动关闭文档
    */
    const ws = fs.createWriteStream(fileName, { start: 0 })
    ws.on('open', (fd) => {
      console.log('要写入的数据文件已经打开')
    })
    ws.on('error', err => {
      reject(new Error({
        data: err,
        message: '写入失败'
      }))
    })
    ws.on('finish', () => {
      soleved(new Success({ data: '写入成功' }))
    })
    for (let i = 0; i < 100; i++) {
      ws.write('这是新写的数据 \n')
    }
    ws.end('写入结束')
  })
}

module.exports = {
  readFille,
  writeFile,
  uploadPictrue
}