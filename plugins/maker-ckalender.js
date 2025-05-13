const handler = async (m, { text, conn }) => {
  const [month, year] = text.split(' ').map(Number);

  if (!month || !year || month < 1 || month > 12 || year < 1900)
    return m.reply('Format salah.\nContoh: *.ckalender 5 2025*');

  try {
    const url = `https://fastrestapis.fasturl.cloud/maker/calendar/advanced?month=${month}&year=${year}`;
    
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `Kalender ${month}/${year}`
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('Gagal mengambil gambar kalender.');
  }
};

handler.help = ['ckalender <bulan> <tahun>'];
handler.tags = ['maker'];
handler.command = /^ckalender$/i;

export default handler;