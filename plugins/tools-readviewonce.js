let handler = async (m, { conn }) => {
  
  let mtype = m.quoted?.mediaMessage;

  if (mtype?.imageMessage) {
    let mimetype = mtype.imageMessage.mimetype;
    let caption = mtype.imageMessage.caption || '';

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      m.reply('Mimetype tidak valid. Mengirim file tanpa format.');
      mimetype = 'application/octet-stream';
    }

    try {
      let buffer = await m.quoted.download();
      conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengunduh file:', error);
      m.reply('Terjadi kesalahan saat mengunduh file. Silakan coba lagi.');
    }
  } else if (mtype?.videoMessage) {
    let mimetype = mtype.videoMessage.mimetype;
    let caption = mtype.videoMessage.caption || '';

    if (mimetype !== 'video/mp4') {
      m.reply('Mimetype tidak valid. Mengirim file tanpa format.');
      mimetype = 'application/octet-stream';
    }

    try {
      let buffer = await m.quoted.download();
      conn.sendMessage(m.chat, { video: buffer, caption }, { quoted: m });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengunduh file:', error);
      m.reply('Terjadi kesalahan saat mengunduh file. Silakan coba lagi.');
    }
  } else {
    m.reply('Tidak ada imageMessage atau videoMessage.');
  }
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^retrieve|readviewonce|rvo/i

export default handler