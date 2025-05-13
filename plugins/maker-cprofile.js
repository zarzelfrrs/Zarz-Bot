import { createCanvas, loadImage } from 'canvas'

const handler = async (m, { conn, text, args }) => {
  if (args.length < 2) {
    return m.reply(`*Format salah!*\n*Contoh :* .cprofile Nama @username Bio`)
  }

  let defaultPP = 'https://files.catbox.moe/ifx2y7.png'
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => defaultPP)
  if (!pp) pp = defaultPP

  let name = args[0]
  let username = args[1]
  let bio = args.slice(2).join(' ') || ''
  const canvas = createCanvas(800, 500)
  const ctx = canvas.getContext('2d')

  let bg = await loadImage('https://i.supa.codes/mOMarh')
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'rgba(0,0,0,0.6)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#111111'
  ctx.beginPath()
  ctx.roundRect(40, 40, 720, 420, 30)
  ctx.fill()

  let avatar = await loadImage(pp)
  ctx.save()
  ctx.beginPath()
  ctx.arc(140, 160, 80, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(avatar, 60, 80, 160, 160)
  ctx.restore()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 34px Sans'
  ctx.fillText(name, 260, 110)

  ctx.fillStyle = '#aaaaaa'
  ctx.font = '24px Sans'
  ctx.fillText(username, 260, 150)

  ctx.fillStyle = '#007acc'
  ctx.beginPath()
  ctx.arc(260 + ctx.measureText(username).width + 25, 140, 8, 0, Math.PI * 2)
  ctx.fill()

  if (bio) {
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Sans'
    ctx.fillText('BIO', 60, 290)
    ctx.fillStyle = '#aaaaaa'
    ctx.font = '18px Sans'
    ctx.fillText(bio, 60, 320)
  }

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px Sans'
  ctx.fillText('PROGRAMMING', 60, 380)
  ctx.fillStyle = '#ffcc00'
  ctx.fillRect(60, 400, 30, 30)
  ctx.fillStyle = '#111111'
  ctx.font = 'bold 20px Sans'
  ctx.fillText('JS', 66, 423)

  await conn.sendMessage(m.chat, {
    image: canvas.toBuffer('image/png'),
    fileName: 'cprofile.png'
  }, { quoted: m })
}

handler.command = /^cprofile$/i
handler.help = ['cprofile [nama] [@username] [bio]']
handler.tags = ['tools']

export default handler