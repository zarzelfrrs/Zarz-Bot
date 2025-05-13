import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Masukkan URL MediaFire!\n\nContoh:\n${usedPrefix + command} https://www.mediafire.com/file/iojnikfucf67q74/Base_Bot_Simpel.zip/file`);

  try {
    const res = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(args[0])}`);
    if (!res.ok) throw 'Gagal mengambil data';

    const json = await res.json();
    if (!json.status || !json.data) throw 'Terjadi kesalahan saat mengambil data MediaFire.';

    const { fileName, fileSize, uploadDate, fileType, compatibility, description, downloadLink } = json.data;

    let caption = `
━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━
📁 *Nama File:* ${fileName}
📦 *Ukuran:* ${fileSize}
🗂 *Tipe:* ${fileType}
🖥 *Kompatibilitas:* ${compatibility}
🕓 *Upload:* ${uploadDate}

📄 *Deskripsi:*
${description.split('. ').slice(0, 2).join('. ')}.
`.trim();

    await conn.sendFile(m.chat, json.data.image || 'https://static.mediafire.com/images/filetype/download/zip.jpg', 'mediafire.jpg', caption, m);

    // Kirim file langsung
    await conn.sendFile(m.chat, downloadLink, fileName, '', m);
  } catch (e) {
    console.error(e);
    m.reply(typeof e === 'string' ? e : 'Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.help = ['mediafire <url>'];
handler.tags = ['downloader'];
handler.command = /^mediafire$/i;

export default handler;