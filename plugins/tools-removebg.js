/*
📌 Nama Fitur: Remove Baground
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔥 Api : https://api.siputzx.my.id
✍️ Convert By ZenzXD
*/

import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime || !mime.includes('image')) throw '⚠️ Kirim gambar atau balas gambar.'


  let media = await q.download()
  if (!media || media.length === 0) throw '⚠️ Gagal mengunduh gambar, coba lagi.'

  
  let form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', Buffer.from(media), 'image.jpg')

  let res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form
  })
  let uploaded = await res.text()
  if (!uploaded.startsWith('https://files.catbox.moe')) throw '❌ Gagal upload gambar ke Catbox.'

  m.reply('⏳ Menghapus latar belakang...')

  
  let apiUrl = `https://api.siputzx.my.id/api/iloveimg/removebg?image=${encodeURIComponent(uploaded)}`
  let removeBgRes = await fetch(apiUrl)
  let buffer = await removeBgRes.buffer()

  if (!buffer || buffer.length === 0) throw '❌ Gagal menghapus latar belakang.'

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: '✅ *Latar belakang berhasil dihapus!*'
  }, { quoted: m })
}

handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(removebg|nobg)$/i
handler.limit = false

export default handler