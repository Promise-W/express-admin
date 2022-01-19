var BookModal = require('../models/booksModal')

exports.list = function (req, res) {
  BookModal.getList(req.data.data.userId).then(rows => {
    res.send(
      {
        data: { items: rows },
        status: 200,
        msg: 'List获取成功'
      }
    );
  })
}