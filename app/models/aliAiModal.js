const aiCfg = require('../../config/aiCfg.js')
const { url, apiKey } = aiCfg.ali
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class modal {
  getAiData(prompt) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            var response = json.output.text;
            console.log(`ali-ai response[${new Date().toLocaleString()}]`, response)

            resolve(response)
         }
      };

      var data = JSON.stringify({
        "input": { prompt },
        "model": "qwen-v1"
      });

      xhr.send(data);

      console.log(`ali-ai request[${new Date().toLocaleString()}] `, data);
    })
  }
}

module.exports = new modal()


/*
curl --location 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation' \
--header 'Authorization: Bearer $apiKey' \
--header 'Content-Type: application/json' \
--data '{
    "model": "qwen-v1",
    "input":{
        "prompt":"哪个公园距离我最近",
        "history":[
            {
                "user":"今天天气好吗？",
                "bot":"今天天气不错，要出去玩玩嘛？"
            },
            {
                "user":"那你有什么地方推荐？",
                "bot":"我建议你去公园，春天来了，花朵开了，很美丽。"
            }
        ]
    },
    "parameters": {
    }
}'
*/