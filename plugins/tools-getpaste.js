import fetch from 'node-fetch';

let handler = async (m, { args }) => {
  if (!args[0]) throw '• *Example :* .getpaste https://pastebin.com/KiCvmvCf';

  let url = args[0].trim();

  if (url.startsWith('https://pastebin.com/') && !url.includes('/raw/')) {
    url = url.replace('https://pastebin.com/', 'https://pastebin.com/raw/');
  }

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });
  
  const text = await getPastebinContent(url);
  if (text) {
    await m.reply(`\n\n${text}`);
  } else {
    await m.reply('❌ Gagal mengambil isi dari Pastebin.');
  }
};

handler.help = ['getpaste <url>'];
handler.tags = ['tools'];
handler.command = /^(getpaste)$/i;
export default handler;

async function getPastebinContent(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.text();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}