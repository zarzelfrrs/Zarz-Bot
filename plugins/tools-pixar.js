const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply('Masukkan teks untuk membuat gambar Pixar!\nContoh: .pixar Monyet mencuri pulpen');
  }

  try {
    const apiUrl = `https://api.nekorinn.my.id/ai-img/text2pixar?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const json = await response.json();

    if (!json.status || !Array.isArray(json.result)) {
      return m.reply('Gagal membuat gambar Pixar!');
    }

    for (const imgUrl of json.result) {
      await conn.sendMessage(m.chat, {
        image: { url: imgUrl },
        caption: `🎨 *Pixar Style Image*\n\n📝 Prompt: ${text}\n\n✨ *Powered By Zenzz XD*`
      }, { quoted: m });
      await delay(500); 
    }

  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat membuat gambar!');
  }
};

handler.help = ['pixar <teks>'];
handler.tags = ['ai', 'tools'];
handler.command = /^pixar$/i;

export default handler;