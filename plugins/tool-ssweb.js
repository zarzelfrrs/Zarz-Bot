/*

# Fitur : Screenshot Web
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : https://www.velyn.biz.id/api/tools/ssweb

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukkan URL yang ingin di-screenshot!");

  let apiUrl = `https://www.velyn.biz.id/api/tools/ssweb?url=${encodeURIComponent(text)}`;
  
  m.reply("📸 Sedang mengambil screenshot, harap tunggu...");
  
  try {
    let { data } = await axios.get(apiUrl, { responseType: "arraybuffer" });

    await conn.sendMessage(m.chat, { 
      image: data, 
      caption: `🖼️ Screenshot dari: ${text}` 
    }, { quoted: m });
    
  } catch (e) {
    m.reply("❌ Gagal mengambil screenshot. Pastikan URL valid atau coba lagi nanti.");
  }
};

handler.tags = ["tools"];
handler.help = ["ssweb <url>"];
handler.command = /^ssweb$/i;

export default handler;