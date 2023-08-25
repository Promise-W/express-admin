const WebSocket = require('ws')
const CryptoJS = require('crypto-js')
const aiCfg = require('../../config/aiCfg.js')

class modal {
  constructor() {
    const { url, appID, apiKey, apiSecret } = aiCfg['kdxf']
    this.url = url
    this.appId = appID
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  getAiData(prompt) {
    let total_res = ''

    return new Promise((resolve, reject) => {
      this.getWebsocketUrl().then(url => {
        const ttsWS = new WebSocket(url)
        this.ttsWS = ttsWS
        ttsWS.onopen = () => this.webSocketSend(prompt)
        ttsWS.onmessage = e => {
          let jsonData = JSON.parse(e.data)
          if (jsonData.payload && jsonData.payload.choices && (jsonData.payload.choices.text || []).length) {
            total_res += jsonData.payload.choices.text[0].content || ''
          }
          if (jsonData.header.code !== 0) { // 提问失败
            return console.error(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
          }
          if (jsonData.header.code === 0 && jsonData.header.status === 2) {
              ttsWS.close()
              console.log(`ai response[${new Date().toLocaleString()}]`, total_res)
              resolve(total_res)
          }
        }
        ttsWS.onerror = () => console.error(`WebSocket报错 详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
        // ttsWS.onclose = e => console.log(e)
      })
    })
  }

  // 拼接请求url
  getWebsocketUrl() {
    return new Promise((resolve, reject) => {
      const apiKey = this.apiKey
      const apiSecret = this.apiSecret
      const url = this.url
      const host = '127.0.0.1'
      const date = new Date().toGMTString()
      const algorithm = 'hmac-sha256'
      const headers = 'host date request-line'
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2.1/chat HTTP/1.1`
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
      const signature = CryptoJS.enc.Base64.stringify(signatureSha)
      const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
      const authorization = Buffer.from(authorizationOrigin).toString('base64')
      resolve(`${url}?authorization=${authorization}&date=${date}&host=${host}`)
    })
  }

  // websocket发送数据
  webSocketSend(prompt) {
    var params = {
        "header": {
            "app_id": this.appId,
            // "uid": "fd3f47e4-d"
        },
        "parameter": {
            "chat": {
                "domain": "generalv2",
                "temperature": 0.5,
                "max_tokens": 1024
            }
        },
        "payload": {
            "message": {
                "text": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }
        }
    }
    console.log(`keDaXunFei-ai request[${new Date().toLocaleString()}] `, JSON.stringify(params));
    this.ttsWS.send(JSON.stringify(params))
  }
}


module.exports = new modal()