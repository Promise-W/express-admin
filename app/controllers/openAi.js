exports.getAiData = function (req, res) {
  const aiType = req.body.aiType || 'ali' // ai模型类型

  let AiModal = null
  if (aiType === 'gpt') AiModal = require('../models/openAiModal') // gpt
  if (aiType === 'ali') AiModal = require('../models/aliAiModal') // ali
  if (aiType === 'keDa') AiModal = require('../models/kdxfAiModal') // 科大讯飞
  if (aiType === 'baidu') AiModal = require('../models/baiduAiModal') // 百度
  
  AiModal.getAiData(req.body.prompt).then(aiData => {
    res.send(
      {
        data: { aiData },
        status: 200,
        msg: 'aiData获取成功'
      }
    );
  })
}