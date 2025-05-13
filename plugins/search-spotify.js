/*
📌 Nama Fitur: Search Spotify [ Buttons List ]
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 API: https://api.siputzx.my.id
✍️ Convert By ZenzXD
*/

import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Masukkan kata kunci pencarian!\nContoh: ${usedPrefix + command} serana`);
  }

  await conn.sendMessage(m.chat, { text: '⏳ Mencari lagu di Spotify...' }, { quoted: m });

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  try {
    const api = `https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(text)}`;
    const { data: json } = await axios.get(api);
    const hasil = json?.data || [];

    if (!hasil.length) return m.reply('❌ Tidak ada lagu ditemukan.');

    const tracks = hasil.slice(0, 5); 
    const sections = [];

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      sections.push({
        title: track.title,
        highlight_label: '🎶',
        rows: [
          {
            header: 'Lagu',
            title: track.title,
            description: `${track.artist} - ${track.album}`,
            id: `.spotify ${track.track_url}`
          }
        ]
      });
    }

    const buttonMessage = {
      text: `*Berikut hasil pencarian Spotify untuk:* _${text}_\nPilih lagu untuk mengunduh.`,
      footer: "Powered by Zenzz AI - MD",
      buttons: [{
        buttonId: 'action',
        buttonText: { displayText: 'Pilih Lagu' },
        type: 4,  
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: 'Pilih Lagu untuk Diunduh',
            sections: sections
          })
        }
      }],
      headerType: 1,
      viewOnce: true
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error mengambil data\nLogs error: ${err.message}`);
  }
};

handler.help = ['spotifysearch <query>', 'spotifys <query>'];
handler.tags = ['search'];
handler.command = /^spotifysearch|spotifys$/i;
handler.premium = false;
handler.limit = true;

export default handler;