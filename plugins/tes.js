/*
📌 Tes Button CTA Copy
🔧 Type: Plugin ESM
📋 Fungsi: Menampilkan tombol salin teks
✍️ By: ChatGPT
*/

const { proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn }) => {
  const teks = 'https://example.com/tes-link';

  const msg = {
    interactiveMessage: proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({ text: 'Berikut link untuk disalin:' }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: 'Klik tombol untuk menyalin.'
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Salin Tautan",
              copy_code: teks
            })
          }
        ]
      })
    })
  };

  await conn.relayMessage(m.chat, msg, { messageId: m.key.id });
};

handler.command = /^testcopy$/i;
handler.tags = ['tools'];
handler.help = ['testcopy'];
handler.owner = false;

export default handler;