import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  try {
    const sadNumber = parseInt(args[0], 10);

    if (isNaN(sadNumber) || sadNumber < 1 || sadNumber > 34) {
      return conn.reply(m.chat, 'Masukkan nomor antara 1 dan 34\nContoh: .sad 2', m);
    }

    let contextInfo = {
      externalAdReply: {
        showAdAttribution: true,
        title: `🎼 Melodi Sedih: Perjalanan Emosi 🎵`,
        body: `💔 Biarkan lagu-lagu ini menyentuh hatimu. Klik untuk mendengarkan.`,
        description: 'Masuki kedalaman kesedihan...',
        mediaType: 2,
        thumbnailUrl: 'https://files.catbox.moe/ve0ku1.jpg',
        mediaUrl: 'https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z'
      }
    };

    const sadURL = `https://github.com/Rangelofficial/Sad-Music/raw/main/audio-sad/sad${sadNumber}.mp3`;
    const response = await fetch(sadURL);
    if (!response.ok) throw new Error("Gagal mengunduh audio");

    const sadBuffer = await response.buffer();
    await conn.sendMessage(m.chat, {
      audio: sadBuffer,
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo
    }, { quoted: m });

  } catch (error) {
    await conn.reply(m.chat, "Terjadi kesalahan saat mengunduh atau mengirim audio.", m);
    console.error(error);
  }
};

handler.help = ['sad'];
handler.command = ['sad'];
handler.tags = ['sound'];
handler.onlyGroup = true;
handler.description = ["random audio sad"];

export default handler;