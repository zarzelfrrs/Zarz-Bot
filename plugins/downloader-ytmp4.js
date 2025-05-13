import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, "Masukkan link video YouTube yang ingin Anda unduh sebagai MP4.", m);
    return;
  }
  try {
    const encodedQuery = encodeURIComponent(text);
    const apiUrl = `https://velyn.biz.id/api/downloader/ytmp4?url=${encodedQuery}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.status || !data.data?.status || !data.data?.url) {
      throw new Error("Gagal mendapatkan link download.");
    }

    const videoData = data.data;
    await conn.sendMessage(
      m.chat,
      { video: { url: videoData.url }, mimetype: 'video/mp4', filename: `${videoData.title}.mp4` },
      { quoted: m }
    );
    
    // Tambahkan reaksi setelah berhasil mengunduh
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Error\nLogs error : ${error.message}`, m);
    
    // Tambahkan reaksi setelah gagal mengunduh
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['ytmp4'];

export default handler;