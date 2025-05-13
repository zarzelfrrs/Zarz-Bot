let handler = async (m, { conn, text, usedPrefix, command }) => {
  const example = `*LAPORAN MASALAH*\nSilakan masukkan laporan Anda.\n\n*Contoh:* ${usedPrefix + command} Ada bug di bot`.trim();
  if (!text) throw example;
  if (text.length > 100) throw "❌ Teks terlalu panjang! Maksimal 100 karakter.";

  const sender = m.sender.split('@')[0];
  const report = `
━━━━━━━━━━━━━━━━━━━
*📣 LAPORAN MASUK 📣*

📩 *Pesan:* ${text}
🙋‍♂️ *Dari:* wa.me/${sender}
🕐 *Waktu:* ${new Date().toLocaleString('id-ID')}

━━━━━━━━━━━━━━━━━━━`.trim();

  
  const owners = global.owner.filter(i => i).map(i => (typeof i === 'object' ? i[0] : i) + '@s.whatsapp.net');
  for (let jid of owners) {
    await conn.sendMessage(jid, { text: report });
  }

  
  await m.reply(`✅ *Laporan berhasil dikirim!*\nTerima kasih telah menghubungi kami. Mohon tunggu balasan dari *Owner*.`);
};

handler.help = ["lapor"];
handler.tags = ["user"];
handler.command = /^lapor$/i;

export default handler;