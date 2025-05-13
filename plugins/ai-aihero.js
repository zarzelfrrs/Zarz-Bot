/*

# Fitur : AI Hero
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : https://velyn.vercel.app/api/ai/hero

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
   if (!text) return conn.sendMessage(m.chat, { text: 'Masukkan prompt untuk AI!' }, { quoted: m });

   await conn.sendMessage(m.chat, { text: 'Proses...' }, { quoted: m });

   try {
      let res = await fetch(`https://velyn.biz.id/api/ai/hero?prompt=${encodeURIComponent(text)}`);

      if (!res.ok) throw new Error(`Gagal mendapatkan respon. Status: ${res.status}`);

      let buffer = await res.buffer();
      let mime = res.headers.get('content-type');

      if (mime.startsWith('image/')) {
         conn.sendMessage(m.chat, { image: buffer, caption: 'Berhasil generate gambar.' }, { quoted: m });
      } else if (mime.startsWith('video/')) {
         conn.sendMessage(m.chat, { video: buffer, caption: 'Berhasil generate video.' }, { quoted: m });
      } else {
         conn.sendMessage(m.chat, { text: 'Format media tidak didukung.' }, { quoted: m });
      }
   } catch (err) {
      console.error(err);
      conn.sendMessage(m.chat, { text: `Terjadi kesalahan saat menghubungi API.\n\n${err.message}` }, { quoted: m });
   }
};

handler.tags = ['ai'];
handler.help = ['aihero'];
handler.command = ['aihero'];

export default handler;