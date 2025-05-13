import fetch from 'node-fetch';

const handler = async (m, { conn, command }) => {
await conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key } });
    try {
        if (!m || !m.chat) throw new Error('Pesan atau chat tidak valid');
        if (!conn) throw new Error('Bot tidak terhubung ke WhatsApp');

        console.log(`Mengirim audio untuk command: ${command} ke chat: ${m.chat}`);
        m.reply(global.wait);
        
        let audio = `https://raw.githubusercontent.com/Rez4-3yz/Music-rd/master/music/${command}.mp3`;
        let thumbnailUrl = 'https://files.catbox.moe/h3njeb.jpg';
        let thumbnail = await (await fetch(thumbnailUrl)).buffer();

        await conn.sendMessage(m.chat, { 
            audio: { url: audio }, 
            mimetype: 'audio/mp4', 
            ptt: true, 
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaUrl: 'https://instagram.com/zxxkyuu',
                    mediaType: 2,
                    description: '',
                    title: "Zenzz AI | Music",
                    body: `${command}`,
                    thumbnail,
                    sourceUrl: ''
                }
            }
        });
    } catch (err) {
        console.error('Terjadi kesalahan dalam sendFile:', err);
        m.reply('Terjadi kesalahan saat mengirim audio. coba lagi nanti.');
    }
};

handler.help = Array.from({ length: 130 }, (_, i) => `music${i + 1}`);
handler.tags = ['audio'];
handler.command = new RegExp(`^(${handler.help.join('|')})$`, 'i');
handler.owner = false;

export default handler;