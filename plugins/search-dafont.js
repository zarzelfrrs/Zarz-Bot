/*
📌 Nama Fitur: Dafont Search
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 Api : https://api.alvianuxio.eu.org
✍️ Convert By ZenzXD
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan nama font yang ingin dicari!';

  const url = `https://api.alvianuxio.eu.org/api/dafont?search=${encodeURIComponent(text)}&apikey=au-TMIQYF4L`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    const fonts = json?.data?.response;
    if (!fonts || fonts.length === 0) throw 'Font tidak ditemukan!';

    const font = fonts[0]; // ambil hasil pertama aja
    const caption = `
╭─〔 *DAFONT RESULT* 〕
│ 🖋️ *Font:* _${font.title}_
│ 👤 *Author:* ${font.author}
│ 🧩 *Theme:* ${font.theme}
│ 🌐 *Link:* ${font.link}
│ 📥 *Download:* ${font.link}
╰──────•••
`.trim();

    await conn.sendFile(m.chat, font.previewImage, 'font.jpg', caption, m);
  } catch (err) {
    console.error(err);
    throw 'Terjadi kesalahan saat mengambil data.';
  }
};

handler.help = ['dafont <query>'];
handler.tags = ['tools'];
handler.command = ['dafont', 'fontsearch'];

export default handler;