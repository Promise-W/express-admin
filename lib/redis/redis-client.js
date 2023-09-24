const client = require('./redis')

// 设置token
function set(key, value, expiresIn) {
  return new Promise((resolve, reject) => {
    client.set(key, value, 'EX', expiresIn, (err, reply) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  })
}

// 获取token
function get(key, callback) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err)
      } else {
        callback && callback(null, val)
        resolve(val)
      }
    })
  })
}

module.exports = { set, get }
