var express = require('express')
var vertoken = require('../lib/token/token')
var expressJwt = require('express-jwt')
var path = require('path')
var route = require('./route')

var app = express()

// 添加json解析
app.use(express.json())

// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['authorization']
  if (token === undefined) {
    return next()
  } else {
    vertoken.verifyToken(token).then((data) => {
      req.data = data
      return next()
    }).catch(error => {
      console.log('error', error)
      return next()
    })
  }
})

// 设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
app.use(express.static(path.join(__dirname, 'public')))

// 验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
  secret: vertoken.jwtScrect,
  algorithms: ['HS256']
}).unless({
  path: ['/', '/user/login', '/register'] // 不需要验证的接口名称
}))

// token失效返回信息
app.use(function(err, req, res, next) {
  if (err.status === 401) {
    // return res.status(401).send('token失效')
    return res.json({
      code: 1,
      message: 'token失效',
      status: 401
    })
  }
})

app.get('/', (req, res) => res.json({ 'code': 401, 'success': false, 'data': null, 'msg': '请求未授权' }))
route.init(app, path.join(__dirname, 'routes/'))

module.exports = app
