/*
Fitur: HD Image (AI Upscale)
Info: Mengubah gambar jadi HD menggunakan API fastrestapis
Type: Plugins ESM/CJS/CASE
By: SkyWalker 
[ `Sumber` ]
https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
*/

import fetch from 'node-fetch'
import FormData from 'form-data'
/*
const fetch = require('node-fetch')
const FormData = require('form-data')
*/
let handler = async (m, { conn, command }) => {
  conn.hdr = conn.hdr || {}
  if (m.sender in conn.hdr) throw 'Masih ada proses yang belum selesai, tunggu dulu ya...'

  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime) throw 'Kirim atau reply gambar terlebih dahulu'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Format ${mime} tidak didukung`

  conn.hdr[m.sender] = true
  await conn.sendMessage(m.chat, { react: { text: "♻️", key: m.key } })

  let img = await q.download?.()
  let error

  try {
    const imageUrl = await uploadToCatbox(img)
    const api = `https://fastrestapis.fasturl.cloud/aiimage/upscale?imageUrl=${encodeURIComponent(imageUrl)}&resize=4`/* resize bisa di atur nilai nya bisa 2,4,8 kalau mau default cukup hapus bagian akhir &resize=4 hapus bagian itu, default nilai 2
*/
    const res = await fetch(api)
    const buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'hd.jpg', 'Ini hasilnya, udah HD😒', m)
  } catch {
    error = true
  } finally {
    if (error) m.reply('Gagal memperbesar gambar.')
    delete conn.hdr[m.sender]
  }
}

handler.help = ['hd', 'remini']
handler.tags = ['tools']
handler.command = /^(hd|remini)$/i

export default handler
// module export = handler


/* CASE

case 'hd':
case 'remini': {
  conn.hdr = conn.hdr || {}
  if (m.sender in conn.hdr) return reply('Masih ada proses yang belum selesai, tunggu dulu ya...')

  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime) return reply('Kirim atau reply gambar terlebih dahulu')
  if (!/image\/(jpe?g|png)/.test(mime)) return reply(`Format ${mime} tidak didukung`)

  conn.hdr[m.sender] = true
  await conn.sendMessage(m.chat, { react: { text: "♻️", key: m.key } })

  let img = await q.download?.()
  let error

  try {
    const imageUrl = await uploadToCatbox(img)
    const api = `https://fastrestapis.fasturl.cloud/aiimage/upscale?imageUrl=${encodeURIComponent(imageUrl)}&resize=4`
    const res = await fetch(api)
    const buffer = await res.buffer()
    await conn.sendFile(m.chat, buffer, 'hd.jpg', 'Ini hasilnya, udah HD😒', m)
  } catch {
    error = true
  } finally {
    if (error) reply('Gagal memperbesar gambar.')
    delete conn.hdr[m.sender]
  }
}
break

*/
async function uploadToCatbox(buffer) {
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, 'image.jpg')
  const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
  const url = await res.text()
  if (!url.startsWith('https://')) throw 'gagal upload ke Catbox'
  return url.trim()
}