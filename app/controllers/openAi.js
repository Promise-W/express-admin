var OpenAiModal = require('../models/openAiModal')

exports.getAiData = function (req, res) {
  OpenAiModal.getAiData(req.query.prompt).then(aiData => {
    res.send(
      {
        data: { aiData },
        status: 200,
        msg: 'aiData获取成功'
      }
    );
  })
}