var db = require('../../lib/db/db')

var UserSql = {
  insert: 'INSERT INTO user(id,name,pwd) VALUES(?,?,?)',
  getList: 'SELECT * FROM user ',
  getItem: 'SELECT * FROM user WHERE id = ? '
}

class UserModal {
  // async getList() {
  //   let rows = []
  //   await db.query(UserSql.getList, []).then(res => rows = res)
  //   return rows
  // }

  getList() {
    return db.query(UserSql.getList, [])
  }

  getItem(userId) {
    return db.query(UserSql.getItem, [userId])
  }

  queryUserByNamePwd(name, pwd) {
    return db.query('select * from user where name = ? and pwd = ?', [name, pwd])
  }

  queryUserByName(name) {
    return db.query('select * from user where name = ? ', [name])
  }
}

module.exports = new UserModal()
