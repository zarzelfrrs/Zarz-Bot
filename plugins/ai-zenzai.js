import axios from 'axios';

const handler = async (m, { text }) => {
  if (!text) {
    throw '*Contoh:* .zenzai apa kabar?';
  }

  try {
    const basePrompt = 'nama lu adalah Zenzz AI kamu memiliki sifat lucu baik dan kamu menggunakan bahasa yang tidak baku/bahasa gaul. ';
    const fullPrompt = `${basePrompt}${text}`;

    const apiUrl = `https://www.velyn.biz.id/api/ai/openai?prompt=${encodeURIComponent(fullPrompt)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data || !data.status || !data.data) {
      return m.reply('⚠️ Gagal mendapatkan respons dari API.');
    }

    m.reply(data.data);
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat mengambil data dari API.');
  }
};

handler.help = ['zenzai <teks>'];
handler.tags = ['ai'];
handler.command = ['zenzai'];

export default handler;