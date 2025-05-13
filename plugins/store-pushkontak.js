const handler = async (m, { conn, text, participants }) => {
  if (!text) return m.reply('Teksnya mana?');

  let mem = participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
  m.reply(`*Mengirim pesan ke ${mem.length} orang, estimasi selesai ${mem.length * 6} detik.*`);

  
  const fakeQuoted = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      conversation: "Z E N Z   A I   -   M  D"
    }
  };

  for (let id of mem) {
    await sleep(6000); // 6000 itu 6 detik ya,buat jeda jadi setting aja serah biar ga kenon
    await conn.sendMessage(id, { text }, { quoted: fakeQuoted }); 
  }

  m.reply(`*✅ Berhasil mengirim pesan ke ${mem.length} orang.*`);
};

handler.help = ['pushkontak <teks>'];
handler.tags = ['store'];
handler.command = /^pushkontak$/i;
handler.owner = true;
handler.group = true;

export default handler;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}