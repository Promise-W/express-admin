exports.getAiData = function (req, res) {
  const aiType = Number(req.query.aiType || 1) // ai模型类型

  let AiModal = null
  if (aiType === 1) AiModal = require('../models/openAiModal') // gpt
  if (aiType === 2) AiModal = require('../models/aliAiModal') // ali
  
  AiModal.getAiData(req.query.prompt).then(aiData => {
    res.send(
      {
        data: { aiData },
        status: 200,
        msg: 'aiData获取成功'
      }
    );
  })
}