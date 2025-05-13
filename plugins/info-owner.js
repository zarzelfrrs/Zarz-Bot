import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn }) => {
  const proses = `⏳ Menyiapkan biodata pemilik bot...`
  await conn.sendMessage(m.chat, { text: proses }, { quoted: m })

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    })
    return imageMessage
  }

  const owners = [
    {
      name: 'Zenzz XD',
      desc: 'Saya Orang Biasa Makan Nasi',
      image: 'https://files.catbox.moe/uy3po1.jpg',
      wa: 'https://wa.me/6287823745178?text=Halo+Zen,+aku+tertarik+sewa+bot+mu'
    },
    {
      name: 'Cuki Digital',
      desc: 'Co-owner yang ahli dalam desain dan sistem. Pendiam tapi mematikan.',
      image: 'https://files.catbox.moe/od3soz.jpeg',
      wa: 'https://wa.me/573238329287?text=Halo+Cuki,+boleh+ngobrol+tentang+bot?'
    }
  ]

  let cards = []

  for (let owner of owners) {
    const imageMsg = await createImage(owner.image)

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `👤 *${owner.name}*\n\n${owner.desc}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: 'Klik tombol untuk menghubungi'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: 'cta_url',
            buttonParamsJson: `{
              "display_text": "Chat ${owner.name}",
              "url": "${owner.wa}",
              "merchant_url": "${owner.wa}"
            }`
          }
        ]
      })
    })
  }

  const slideMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Kenalan dulu sama pemilik bot yuk:'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Terima kasih sudah pakai bot ini!'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards
          })
        })
      }
    }
  }, {})

  await conn.relayMessage(m.chat, slideMessage.message, { messageId: slideMessage.key.id })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = /^owner$/i

export default handler