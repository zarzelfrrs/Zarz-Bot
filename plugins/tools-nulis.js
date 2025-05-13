import axios from 'axios';

const handler = async (m, { text }) => {
  if (!text) return m.reply('Mau Nulis Apa?');

  try {
    const response = await axios.post(
      'https://lemon-write.vercel.app/api/generate-book',
      {
        text,
        font: 'default',
        color: '#000000',
        size: '28',
      },
      {
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    await conn.sendMessage(
      m.chat,
      { 
        image: response.data,
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply('Errror Cba Lagi Nanti Ya');
  }
};

handler.help = ['nulis'];
handler.command = ['nulis'];
handler.tags = ['tools']

export default handler;