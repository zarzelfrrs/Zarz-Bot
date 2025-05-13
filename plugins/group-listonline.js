const handler = async (m, { conn, args }) => {
  try {
    // Menentukan ID grup yang digunakan, atau menggunakan chat saat ini
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    // Ambil metadata grup
    const groupMetadata = await conn.groupMetadata(id);
    
    // Ambil daftar anggota grup
    const participants = groupMetadata.participants;
    
    if (!participants || participants.length === 0) {
      return conn.reply(m.chat, "Tidak ada anggota di grup ini.", m);
    }

    // Daftar anggota grup
    const onlineList = participants
      .map((mem, index) => `*${index + 1}.* @${mem.id.split('@')[0]}`)
      .join("\n");

    // Kirim pesan kepada grup dengan daftar anggota
    await conn.reply(m.chat, `*🌐 Daftar Anggota Grup:*\n${onlineList}`, m, {
      contextInfo: {
        mentionedJid: participants.map(a => a.id),
      },
    });
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Terjadi kesalahan saat mengambil daftar anggota grup.', m);
  }
};

handler.help = ["listonline"];
handler.tags = ["group"];
handler.command = /^(here|list)(online)?$/i;
handler.group = true;

export default handler;