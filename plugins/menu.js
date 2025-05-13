module.exports = {
  name: 'menu',
  description: 'Menampilkan semua perintah',
  async execute(m, { conn }) {
    m.reply(`Daftar Menu:
- .ping
- .sticker
- .ai <pertanyaan>
- .ytmp3 <link>
- .ytmp4 <link>
- .sholat <kota>
- dan banyak lagi...`);
  }
}