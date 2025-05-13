import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw `Penggunaan: .${command} <teks>`;

  try {
    const res = await fetch(`https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status) throw 'Gagal mendapatkan balasan dari AI.';

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

    await conn.sendMessage(m.chat, { text: json.data }, { quoted: fakeQuoted });
  } catch (err) {
    console.error(err);
    throw 'Terjadi kesalahan saat memproses permintaan.';
  }
};

handler.help = ['gemini <teks>'];
handler.tags = ['ai'];
handler.command = /^gemini$/i;

export default handler;