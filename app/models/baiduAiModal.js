const aiCfg = require('../../config/aiCfg.js')
const { url, appToken } = aiCfg.baidu
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class modal {
  getAiData(prompt) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${url}?access_token=${appToken}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.error_code) return reject(json.error_msg)
            var response = json.result;
            console.log(`baidu-ai response[${new Date().toLocaleString()}]`, response)
            resolve(response)
         }
      };

      var data = JSON.stringify({
        "messages": [ {"role":"user","content": prompt }],
      });

      xhr.send(data);

      console.log(`baidu-ai request[${new Date().toLocaleString()}] `, data);
    })
  }
}

module.exports = new modal()
