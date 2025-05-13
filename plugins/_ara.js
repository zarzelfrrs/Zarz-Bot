let handler = async (m, { conn }) => {
    let audioUrls = [
        "https://files.catbox.moe/6dqw74.mp3",
        "https://files.catbox.moe/ervi1m.mp4",
        "https://files.catbox.moe/3ug6cc.mp3"
    ]; // Tambahkan lebih banyak link jika diperlukan

    let randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    await conn.sendMessage(m.chat, { audio: { url: randomAudio }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
};

handler.customPrefix = /^(ara ara)$/i;
handler.command = new RegExp;

export default handler;