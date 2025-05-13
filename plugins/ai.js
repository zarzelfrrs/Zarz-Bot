const fetch = require('node-fetch');

module.exports = {
  name: 'ai',
  description: 'Tanya ke AI ChatGPT',
  async execute(m, { text }) {
    if (!text) return m.reply('Tanyakan sesuatu, contoh: .ai siapa itu Elon Musk');
    try {
      let res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: text,
          max_tokens: 200
        })
      });
      let data = await res.json();
      m.reply(data.choices[0].text.trim());
    } catch (err) {
      m.reply('Gagal konek ke AI.');
    }
  }
}