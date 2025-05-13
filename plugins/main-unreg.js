import { createHash } from 'crypto';

let handler = async function (m, { text, conn, command, usedPrefix, args }) {
  let sn = createHash('md5').update(m.sender).digest('hex');
  if (!args[0]) throw `Ketik: *${usedPrefix + command} ${sn}* untuk unreg akun kamu.`;

  let nama = conn.getName(m.sender);
  let user = global.db.data.users[m.sender];
  let age = user.age;
  const pp = await conn.profilePictureUrl(m.sender, "image").catch(_ => "https://i.ibb.co/3Fh9V6p/avatar-contact.png");

  if (args[0] !== sn) throw '❌ *Serial Number salah!*\nCek kembali SN milikmu.';

  let caption = `
╭─〔 *UNREGISTER SUCCESS* 〕─⬣
│👤 *Nama:* ${nama}
│🎂 *Umur:* ${age} tahun
│📌 *Status:* Unregistered
│🔑 *Serial Number:* 
│   _${text}_
╰────────────⬣
💬 Kamu berhasil menghapus data dari sistem ${info.namebot}.
`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: pp },
      caption,
      contextInfo: {
        externalAdReply: {
          title: `${info.namebot} System`,
          body: `Data berhasil dihapus dari database`,
          showAdAttribution: true,
          mediaType: 1,
          sourceUrl: '',
          thumbnailUrl: global.pp,
          renderLargerThumbnail: true,
        }
      }
    },
    { quoted: m }
  );

  user.registered = false;
};

handler.help = ['unregister'];
handler.tags = ['main'];
handler.command = /^unreg(ister)?$/i;
handler.register = true;

export default handler;