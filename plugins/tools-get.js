import fetch from 'node-fetch';

const handler = async (m, { text, args }) => {
  if (!text) return m.reply('Contoh penggunaan:\n.get <url_api>');

  try {
    const res = await fetch(text);
    const data = await res.json();
    const pretty = JSON.stringify(data, null, 2);
    m.reply(`*Response dari API:*\n\n${pretty}`);
  } catch (err) {
    console.error(err);
    m.reply('Gagal mengambil data dari API. Pastikan URL valid dan response-nya berupa JSON.');
  }
};

handler.help = ['get <url>'];
handler.tags = ['tools'];
handler.command = ['get'];
handler.limit = false;
handler.premium = false;

export default handler;