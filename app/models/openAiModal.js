var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class modal {
  getAiData(prompt) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var url = "https://api.openai.com/v1/completions";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer xxx");
      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            var response = json.choices[0].text;
            console.log(`ai response[${new Date().toLocaleString()}]`, response)

            resolve(response)
         }
      };

      var data = JSON.stringify({
         "prompt": prompt,
         "max_tokens": 2048,
         "temperature": 0.5,
         "top_p": 1,
         "frequency_penalty": 0,
         "presence_penalty": 0,
         "model": "text-davinci-003"
      });
      xhr.send(data);

      console.log(`ai request[${new Date().toLocaleString()}] `, data);
    })
  }
}

module.exports = new modal()