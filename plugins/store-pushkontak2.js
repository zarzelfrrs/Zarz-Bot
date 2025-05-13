const handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`Contoh: .pushkontak2 idgc|pesan`);

  const [idgc, pesan] = text.split('|');
  if (!idgc || !pesan) return m.reply(`Contoh: .pushkontak2 idgc|pesan`);

  const metadata = await conn.groupMetadata(idgc).catch(e => m.reply(String(e)));
  const participants = metadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);

  m.reply(`🚀 Mengirim pesan ke *${participants.length}* orang...\nEstimasi selesai dalam *${participants.length * 6} detik*.`);

 
  const fakeQuoted = {
    key: {
      remoteJid: "status@broadcast",
      fromMe: false,
      id: 'BAE5F729F60A5C1A',
      participant: '0@s.whatsapp.net'
    },
    message: {
      extendedTextMessage: {
        text: 'Z E N Z   A I -   M D'
      }
    }
  };

  for (let i = 0; i < participants.length; i++) {
    setTimeout(async () => {
      await conn.sendMessage(participants[i], { text: pesan }, { quoted: fakeQuoted });
      if (i + 1 === participants.length) {
        m.reply(`✅ Semua pesan berhasil dikirim ke *${participants.length}* orang.`);
      }
    }, i * 6000); // jeda 6 detik lu setting aja serah pokoknya 000 nya tiga itu tiap detik
  }
};

handler.help = ['pushkontak2 <idgc|pesan>'];
handler.tags = ['store'];
handler.command = /^pushkontak2$/i;
handler.owner = true;

export default handler;