// 引入token
var vertoken = require('../../lib/token/token')
var userModal = require('../models/userModal')

exports.login = function(req, res) {
  console.log('req.body', req.body, req.query, req.params)
  const name = req.body && req.body.username || ''
  const pwd = req.body && req.body.password || ''
  if (!name || !pwd) {
    return res.json({
      code: 1,
      msg: '账户或密码不能为空'
    })
  } else {
    userModal.queryUserByNamePwd(name, pwd).then((result, err) => {
      if (err) {
        throw err
      } else {
        if (result.length !== 0) {
          vertoken.createToken({ userId: result[0]['id'] }).then(token => {
            return res.json({
              // code: 200,
              status: 200,
              msg: '登录成功',
              data: {
                token,
                user: result[0]
              }
            })
          })
        } else {
          userModal.queryUserByName(name).then(function(data, error) {
            if (error) {
              throw error
            } else {
              if (data.length === 0) {
                return res.json({
                  code: 1,
                  status: 500,
                  msg: '用户不存在'
                })
              } else {
                if (name === data[0].name && pwd !== data[0].pwd) {
                  return res.json({
                    code: 1,
                    result: 0,
                    status: 500,
                    msg: '密码错误'
                  })
                } else {
                  return res.json({
                    code: 1,
                    result: 0,
                    status: 500,
                    msg: '系统错误'
                  })
                }
              }
            }
          })
        }
      }
    })
  }
}

exports.logout = function(req, res) {
  res.json({
    status: 200,
    msg: '退出成功'
  })
}
