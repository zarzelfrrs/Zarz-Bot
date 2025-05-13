/*
📌 Nama Fitur: Youtube Stalker
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 Api : https://fgsi1-restapi.hf.space/api/information/yt-stalk?url=
✍️ Convert By ZenzXD
*/

import axios from 'axios';

const handler = async (m, { conn, args }) => { try { if (!args[0]) return m.reply('Masukkan URL channel YouTube!');

const url = args[0];
    const apiUrl = `https://fgsi1-restapi.hf.space/api/information/yt-stalk?url=${encodeURIComponent(url)}`;
    
    await m.reply('⏳ Sedang mengambil data...');
    
    const response = await axios.get(apiUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://fgsi1-restapi.hf.space/'
        }
    });
    
    console.log('API Response:', response.data);
    
    if (response.status !== 200 || !response.data || !response.data.data) {
        return m.reply(`Gagal mengambil data! API Error: ${JSON.stringify(response.data)}`);
    }
    
    const { name, subscribers, totalVideos, description, url: channelUrl, avatar } = response.data.data;
    
    let avatarUrl = avatar && avatar.length > 0 ? avatar[0].url : '';
    
    let message = `📺 *YouTube Stalk*

🔹 Nama: ${name} 
👥 Subscribers: ${subscribers} 
🎥 Jumlah Video: ${totalVideos} 
📝 Deskripsi: ${description || '-'}

🔗 URL: ${channelUrl}`;

await conn.sendMessage(m.chat, {
        image: { url: avatarUrl },
        caption: message
    }, { quoted: m });
    
} catch (error) {
    console.error('Error:', error);
    await m.reply(`Terjadi kesalahan saat mengambil data. Error: ${error.message}`);
}

};

handler.help = ['ytstalk <url>']; 
handler.tags = ['internet']; 
handler.command = ['ytstalk'];

export default handler;