import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  
  if (m._tkslide) return;
  m._tkslide = true;

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  if (!text) {
    return m.reply(`Masukkan URL TikTok Slide!\nContoh: ${usedPrefix + command} https://vt.tiktok.com/xxxxx`);
  }

  const teksAwal = `⏳ Sedang memproses slide dari TikTok...`;
  await conn.sendMessage(m.chat, { text: teksAwal }, { quoted: m });

  try {
    const api = `https://api.crafters.biz.id/downloader/tiktokv2?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);
    const slides = data?.result?.slides;

    if (!data.status || !slides || slides.length === 0) {
      return m.reply('❌ Gagal mengambil slide dari TikTok.');
    }

    let cards = [];
    for (let i = 0; i < slides.length; i++) {
      const imageMsg = await createImage(slides[i].url);
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `✅ Slide ${i + 1} dari ${slides.length}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'TikTok Slide'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: imageMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_url",
              "buttonParamsJson": `{
                "display_text": "Lihat di TikTok",
                "url": "${text}",
                "merchant_url": "${text}"
              }`
            }
          ]
        })
      });
    }

    const carousel = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "Berikut adalah slide dari video TikTok kamu:"
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: ''
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, {});

    await conn.relayMessage(m.chat, carousel.message, { messageId: carousel.key.id });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error\nLogs error : ${err.message}`);
  }
};

handler.help = ['ttslide <url>'];
handler.tags = ['downloader'];
handler.command = /^ttslide$/i;
handler.premium = false;
handler.limit = 2;

export default handler;