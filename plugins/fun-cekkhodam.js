/*

# Fitur : cekkhodam
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : https://nirkyy.koyeb.app

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import axios from 'axios';

async function cekKhodam(name) {
   try {
      const imageUrl = `https://nirkyy.koyeb.app/api/v1/khodam?nama=${encodeURIComponent(name)}`;
      return {
         text: `🔮 *Hasil Cek Khodam* 🔮\n\n📌 *Nama:* ${name}`,
         image: imageUrl
      };
   } catch (error) {
      return `❌ Error\nLogs error : ${error.message}`;
   }
}

let handler = async (m, { text, conn }) => {
   if (!text) return m.reply('❌ Masukkan nama untuk mengecek khodam.');
   let hasil = await cekKhodam(text);

   if (hasil.image) {
      await conn.sendFile(m.chat, hasil.image, 'khodam.jpg', hasil.text, m);
   } else {
      m.reply(hasil);
   }
};

handler.tags = ['fun'];
handler.help = ['cekkhodam'];
handler.command = ['cekkhodam'];

export default handler;