const handler = async (m, { text, quoted, conn }) => {
  const defaultPP = 'https://fastmanager.fasturl.cloud/Uploads/Hikaru-PP.png';
  const defaultSignature = '@zenzzXD';
  const name = m.name || 'User';

  if (!text) return m.reply(`Masukkan teks quote!\nContoh: *quote Hidup cuma sekali*`);

  let [quoteText, ppUrl] = text.split('|').map(a => a.trim());
  if (!quoteText) return m.reply('Teks quote tidak boleh kosong.');

  m.reply('⏳ Proses dulu dek...');

  let pp = defaultPP;
  if (!ppUrl) {
    try {
      const userPP = await conn.profilePictureUrl(m.sender, 'image');
      if (userPP && /^https?:\/\//.test(userPP)) pp = userPP;
    } catch (e) {
    }
  } else {
    if (!/^https?:\/\//.test(ppUrl)) return m.reply('URL foto profil tidak valid.');
    pp = ppUrl;
  }

  const quoteApi = `https://fastrestapis.fasturl.cloud/maker/quote?text=${encodeURIComponent(quoteText)}&username=${encodeURIComponent(name)}&ppUrl=${encodeURIComponent(pp)}&signature=${encodeURIComponent(defaultSignature)}`;

  try {
    await conn.sendMessage(m.chat, {
      image: { url: quoteApi },
      caption: `kata kata hari ini dari *${name}*`
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❌ Error\nLogs error : ' + e.message);
  }
};

handler.help = ['quote <teks> | <ppUrl>'];
handler.tags = ['maker'];
handler.command = /^quote$/i;

export default handler;