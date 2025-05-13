import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const username = await conn.getName(global.nomorwa + '@s.whatsapp.net');
  let list = [];

  for (let i of global.owner) {
    const [number, nameRaw] = i;
    const name = nameRaw || 'Owner Bot';

    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${name}
FN:${name}
item1.TEL;waid=${number}:${number}
item1.X-ABLabel:👑 Owner WhatsApp Bot
item2.EMAIL;type=INTERNET:aaku85019@email.com
item2.X-ABLabel:📩 Email
item3.URL:https://youtube.com/@jembotXD
item3.X-ABLabel:▶️ YouTube
item4.URL:https://github.com/ZenzXD
item4.X-ABLabel:💻 GitHub
item5.ADR:;;Indonesia;;;;
item5.X-ABLabel:🌏 Region
END:VCARD`.trim();

    list.push({
      displayName: name,
      vcard: vcard
    });
  }

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: `${list.length} Kontak Owner`,
        contacts: list
      },
      mentions: [m.sender]
    },
    { quoted: m }
  );
};

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner'];

export default handler;