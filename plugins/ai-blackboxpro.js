import axios from 'axios';

let handler = async (m, { text }) => {
  if (!text) return m.reply('Masukkan pertanyaan.');
  try {
    let { data } = await axios.get('https://www.abella.icu/blackbox-pro?q=' + encodeURIComponent(text));
    if (data?.status !== 'success') return m.reply('Gagal mengambil jawaban.');
    m.reply(data.data.answer.result);
  } catch {
    m.reply('Error');
  }
};

handler.help = ['blackbox-pro'].map(v => v + ' ');
handler.command = ['blackbox-pro'];
handler.tags = ['ai'];

export default handler;