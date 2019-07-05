// 错误返回 
/* 
 使用实例
 new Error('错误提示')
 new Error({code: 'fail', message: '错误提示'})
*/

function Error(opitions) {
  const message = typeof opitions === 'string' ? opitions : ''
  const obj = { code: 'fail', message: message }
  return typeof opitions === 'string' ? obj : Object.assign({}, obj, opitions)
}

module.exports = Error