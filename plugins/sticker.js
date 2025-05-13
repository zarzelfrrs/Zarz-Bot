module.exports = {
  name: 'sticker',
  description: 'Buat stiker dari gambar',
  async execute(m, { conn }) {
    if (!m.quoted || !m.quoted.mimetype.includes('image')) return m.reply('Reply gambar dengan .sticker');
    let media = await m.quoted.download();
    conn.sendImageAsSticker(m.chat, media, m, { packname: 'YamaBot', author: 'Sticker Generator' });
  }
}