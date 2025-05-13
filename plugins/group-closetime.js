let handler = async (m, { conn, args, isBotAdmin, isAdmin }) => {
  if (!m.isGroup) return m.reply('Fitur ini hanya untuk grup!');
  if (!isAdmin) return m.reply('Fitur ini hanya bisa digunakan oleh admin grup.');
  if (!isBotAdmin) return m.reply('Bot harus menjadi admin di grup!');

  let time = parseInt(args[0]);
  let unit = args[1];

  if (!time || !unit) {
    return m.reply(`*Contoh Penggunaan:*\n.closetime 10 second\n\n*Opsi Waktu:*\nsecond\nminute\nhour\nday`);
  }

  let timer;
  switch (unit) {
    case 'second': timer = time * 1000; break;
    case 'minute': timer = time * 60000; break;
    case 'hour': timer = time * 3600000; break;
    case 'day': timer = time * 86400000; break;
    default:
      return m.reply('*Opsi tidak valid!*\nGunakan: second, minute, hour, atau day');
  }

  m.reply(`⏳ Grup akan ditutup dalam *${time} ${unit}*...`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    conn.sendMessage(m.chat, {
      text: '*[ CLOSE TIME ]*\nGrup telah ditutup. Sekarang hanya admin yang bisa mengirim pesan.'
    });
  }, timer);
};

handler.command = ['closetime'];
handler.help = ['closetime <angka> <unit>'];
handler.tags = ['group'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;