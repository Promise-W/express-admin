const aiCfg = require('../../config/aiCfg.js')
const { url, apiKey, apiSecret } = aiCfg.baidu
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const redisClient = require('../../lib/redis/redis-client.js')
const { exec } = require('child_process')

class Modal {
  async getAiData(prompt) {
    let appToken = await redisClient.get('WenXinToken')
    if (!appToken) {
      const result = await this.getToken()
      if (result['access_token']) { // 提前5天过期
        await redisClient.set('WenXinToken', result['access_token'], result['expires_in'] - (5 * 24 * 60 * 60))
        appToken = result['access_token']
      }
    }
    // console.log('WenXinToken', appToken)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${url}?access_token=${appToken}`, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText)
          if (json.error_code) return reject(json.error_msg)
          var response = json.result
          console.log(`baidu-ai response[${new Date().toLocaleString()}]`, response)
          resolve(response)
        }
      }

      var data = JSON.stringify({
        'messages': [{ 'role': 'user', 'content': prompt }]
      })

      xhr.send(data)

      console.log(`baidu-ai request[${new Date().toLocaleString()}] `, data)
    })
  }

  getToken() {
    return new Promise((resolve, reject) => {
      exec(`curl 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}'`, async(error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          resolve({})
        }
        resolve(JSON.parse(stdout || '{}'))
      })
    })
  }
}

module.exports = new Modal()
