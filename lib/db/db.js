var mysql = require('mysql')

var pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  timezone: '08: 00',
  multipleStatements: true,
  connectionLimit: 10,
  user: 'root',
  password: 'pwd',
  database: 'test'
})

function query(sql, valuses, callback) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) throw err

      connection.query(sql, valuses, function(err, results, fields) {
        connection.release() // 只是释放链接，在缓冲池了，没有被销毁

        callback && callback(results, err) // 每次查询都会 回调

        if (err) {
          reject(err)
          throw err
        } else {
          resolve(results, err)
        }
      })
    })
  })
}

exports.query = query
