var db = require('../../lib/db/db')

class Modal {
  getList(userId) {
    return db.query('select * from books where userId = ?', [userId])
  }
}

module.exports = new Modal()
