var db = require('../../lib/db/db')

var UserSql = {
  insert: 'INSERT INTO user(id,name,pwd) VALUES(?,?,?)',
  getList: 'SELECT * FROM user ',
  getItem: 'SELECT * FROM user WHERE id = ? '
}

// const fakeUsers = [{
//   'id': 1,
//   'name': 'admin',
//   'pwd': '123456',
//   'introduction': 'I am a super administrator',
//   'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//   'roles': "['admin']"
// }]

class UserModal {
  getList() {
    return db.query(UserSql.getList, [])
  }

  getItem(userId) {
    // return new Promise((resolve) => { resolve(fakeUsers) })
    return db.query(UserSql.getItem, [userId])
  }

  queryUserByNamePwd(name, pwd) {
    // return new Promise((resolve) => { resolve(fakeUsers) })
    return db.query('select * from user where name = ? and pwd = ?', [name, pwd])
  }

  queryUserByName(name) {
    return db.query('select * from user where name = ? ', [name])
  }
}

module.exports = new UserModal()
