import fetch from 'node-fetch'

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;

  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  try {
    const ytUrl = args[0];
    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytmp3?quality=128kbps&server=auto&url=${encodeURIComponent(ytUrl)}`);
    const data = await res.json();

    
    const videoIdMatch = ytUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;

    await conn.sendMessage(m.chat, {
      audio: { url: data.result.media },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: data.result.title,
          body: "YouTube MP3 Downloader By Zenzz XD",
          thumbnailUrl,
          sourceUrl: ytUrl,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw 'Gagal mengambil audio. Pastikan link valid dan coba lagi.';
  }
};

handler.help = ['ytmp3 <link>'];
handler.command = ['ytmp3'];
handler.tags = ['downloader'];
handler.premium = false;

export default handler;