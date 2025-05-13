/*
📌 Nama Fitur: Google Drive Downloader
🏷️ Type : Plugin Esm
🔗 Sumber : https://api.vreden.my.id
✍️ Convert By ZenzXD
*/

import axios from 'axios';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw `Masukkan link Google Drive!\nContoh: .${command} https://drive.google.com`;

  const api = `https://api.vreden.my.id/api/drive?url=${encodeURIComponent(text)}`;
  try {
    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

    const { data } = await axios.get(api);
    const res = data?.result;

    if (!res?.downloadUrl) throw 'Gagal mendapatkan URL unduhan!';

    const caption = `
╭─〔 *GOOGLE DRIVE DOWNLOADER* 〕
│ 📁 *Nama File:* ${res.fileName}
│ 📦 *Tipe:* ${res.mimetype}
│ 📏 *Ukuran:* ${(Number(res.sizeBytes) / 1048576).toFixed(2)} MB
│ 🔍 *Scan Result:* ${res.scanResult}
│ 🧩 *Status:* ${res.disposition}
│ 👤 *Uploader:* ${res.uploader.name} (${res.uploader.email})
╰──────•••
`.trim();

    await conn.sendFile(m.chat, res.downloadUrl, res.fileName, caption, m);
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    throw 'Terjadi kesalahan saat mengambil data dari Google Drive.';
  }
};

handler.help = ['gdrive <link>'];
handler.tags = ['downloader'];
handler.command = ['gdrive'];

export default handler;