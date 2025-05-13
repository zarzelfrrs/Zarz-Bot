const handler = async (m, { text, conn }) => {
  const [name, competence, level, signature, position] = text.split('|').map(v => v.trim());

  if (!name || !competence || !level || !signature || !position)
    return m.reply('Format salah.\nContoh: *.imphnen Nama|Kompetensi|Level|Tanda Tangan|Posisi*');

  const url = `https://fastrestapis.fasturl.cloud/maker/imphnen?name=${encodeURIComponent(name)}&competence=${encodeURIComponent(competence)}&level=${encodeURIComponent(level)}&signature=${encodeURIComponent(signature)}&position=${encodeURIComponent(position)}`;

  try {
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `*ID Card Generator*\n\n• Nama: ${name}\n• Kompetensi: ${competence}\n• Level: ${level}\n• Posisi: ${position}`
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('Gagal mengambil gambar ID Card. Coba lagi nanti.');
  }
};

handler.help = ['imphnen <nama>|<kompetensi>|<level>|<tanda tangan>|<posisi>'];
handler.tags = ['maker'];
handler.command = /^imphnen$/i;

export default handler;