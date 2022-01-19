var jwt = require('jsonwebtoken')
var jwtScrect = 'promise@w'

//登录时生成token
var createToken = function (data) {
  return new Promise((resolve, reject) => {
    let obj = {};
    obj.data = data;
    obj.type = 'jsonwebtoken'; // 加个类型
    obj.ctime = new Date().getTime(); //token的创建时间
    const token = jwt.sign(obj, jwtScrect, { expiresIn: '1h' })
    resolve(token)
  })
}

//api都需要验证token
var verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({
        error: 'token 是空的'
      })
    } else {
      var info = jwt.verify(token.split(' ')[1], jwtScrect, (error, res) => res) // 回调函数可自定义返回信息
      resolve(info);  //解析返回的值（sign 传入的值）
    }
  })
}

module.exports = {
  createToken,
  verifyToken,
  jwtScrect
}