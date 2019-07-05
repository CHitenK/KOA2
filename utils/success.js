
// 成功返回
/* 
 使用实例
 new Suceess({
   code: 'success',
   data: '返回数据'
 })
 */

function Suceess (opitions = {}) {
  const obj = { code: 'success', data: '' }
  return Object.assign({}, obj, opitions)
}

module.exports = Suceess