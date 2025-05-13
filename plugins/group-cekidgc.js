let handler = async (m, { conn, groupMetadata, prefix }) => {
 
  const teks = `
══════════════════
💬 *INFO GROUP* 💬
══════════════════

📝 *Nama Grup* : ${groupMetadata.subject}
🔖 *ID Grup* : ${groupMetadata.id}
👥 *Jumlah Anggota* : ${groupMetadata.participants.length}
  `;
  
  
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


  conn.sendMessage(m.chat, { text: teks }, { quoted: fakeQuoted });
};

handler.help = ['cekidgc'];
handler.tags = ['group'];
handler.command = /^(cekidgc|idgc|gcid)$/i;
handler.group = true;

export default handler;