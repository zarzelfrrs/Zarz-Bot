import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw `Penggunaan: .${command} <teks>`;

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/aillm/gpt-4o-turbo?ask=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json || !json.result) throw 'Gagal mendapatkan balasan dari AI.';

    const fakeQuoted = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        id: 'BAE5F729F60A5C1A',
        participant: '0@s.whatsapp.net'
      },
      message: {
        extendedTextMessage: {
          text: 'Z E N Z   A I   -   M  D'
        }
      }
    };

    await conn.sendMessage(m.chat, { text: json.result }, { quoted: fakeQuoted });
  } catch (err) {
    console.error(err);
    throw 'Terjadi kesalahan saat memproses permintaan.';
  }
};

handler.help = ['gpt4o <teks>'];
handler.tags = ['ai'];
handler.command = /^gpt4o$/i;

export default handler;