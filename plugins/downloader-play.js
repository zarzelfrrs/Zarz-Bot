/*
📌 Nama Fitur: Play button replay + canvas
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb68wXu6rsQuP9cYAt0g
🔗 Sumber canvas/utama : https://whatsapp.com/channel/0029Vb68wXu6rsQuP9cYAt0g
✍️ Convert By NABILZEX 
*/

import { createCanvas, loadImage } from 'canvas'
import fetch from 'node-fetch'

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`Masukkan judul lagu!\nContoh: *.play senja bersemi*`)
  const query = args.join(' ')
  const res = await fetch(`https://api.nekorinn.my.id/downloader/ytplay-savetube?q=${encodeURIComponent(query)}`)
  const json = await res.json().catch(() => null)

  if (!json?.result) return m.reply('Gagal mengambil data.')

  const { title, channel, duration, imageUrl, link } = json.result.metadata
  const audio = json.result.downloadUrl
  const resImg = await fetch(imageUrl)
  const img = await loadImage(Buffer.from(await resImg.arrayBuffer()))

  const canvas = createCanvas(800, 400)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, '#121212')
  gradient.addColorStop(1, '#1f1f1f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(img, 40, 80, 240, 240)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 32px Sans'
  const lines = []
  const words = title.split(' ')
  let line = ''
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > 400 && i > 0) {
      lines.push(line)
      line = words[i] + ' '
    } else {
      line = testLine
    }
  }
  lines.push(line)
  lines.forEach((l, i) => {
    ctx.fillText(l.trim(), 310, 150 + i * 35)
  })

  ctx.fillStyle = '#b3b3b3'
  ctx.font = '24px Sans'
  ctx.fillText(channel, 310, 240)
  ctx.fillText(duration, 310, 270)

  ctx.fillStyle = '#555'
  ctx.fillRect(310, 300, 400, 6)

  ctx.fillStyle = '#1db954'
  ctx.fillRect(310, 300, 150, 6)

  const buffer = canvas.toBuffer('image/png')

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `📌 *YouTube Play* \n\n🎵 *Judul:* ${title}\n🎤 *Channel:* ${channel}\n⏱️ *Durasi:* ${duration}`,
    contextInfo: {
      externalAdReply: {
        title,
        body: `${channel} • ${duration}`,
        thumbnailUrl: imageUrl,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: link
      },
    
      businessMessageForwardInfo: {
        businessOwnerJid: conn.decodeJid(conn.user.id)
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: "Downloader Musik",
        newsletterJid: "120363400447567365@newsletter"
      },
      
      forwardingScore: 9999,
      isForwarded: true
    },
    buttons: [
      { buttonId: `.ytmp3 ${link}`, buttonText: { displayText: 'Download MP3' }, type: 1 },
      { buttonId: `.ytmp4 ${link}`, buttonText: { displayText: 'Download MP4' }, type: 1 }
    ],
    headerType: 4
  }, { quoted: m })
}

handler.command = ['play2']
handler.tags = ['downloader']
handler.help = ['play2 <judul lagu>']

export default handler