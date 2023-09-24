var userModal = require('../models/userModal')

exports.info = function(req, res) {
  // const rows = await userModal.getItem()
  // res.send(
  //   {
  //     data: rows,
  //     status: 200,
  //     msg: 'info获取成功'
  //   }
  // );

  userModal.getItem(req.data.data.userId).then(rows => {
    res.send(
      {
        data: rows[0],
        status: 200,
        msg: '信息获取成功'
      }
    )
  })
}

exports.list = function(req, res) {
  userModal.getList().then(rows => {
    res.send(
      {
        data: rows,
        status: 200,
        msg: 'List获取成功'
      }
    )
  })
}
