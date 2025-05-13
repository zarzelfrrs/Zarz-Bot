const fetch = require('node-fetch');

module.exports = {
  name: 'ytmp3',
  description: 'Download YouTube ke MP3',
  async execute(m, { text }) {
    if (!text) return m.reply('Masukkan link YouTube!');
    let api = `https://api.zahwazein.xyz/downloader/youtube?url=${text}&apikey=YOUR_API_KEY`;
    let res = await fetch(api);
    let json = await res.json();
    if (!json.status) return m.reply('Gagal!');
    await m.reply(`Judul: ${json.result.title}\nSize: ${json.result.size}`);
    conn.sendFile(m.chat, json.result.mp3, 'audio.mp3', null, m);
  }
}