/*
📌 Nama Fitur: Brat Vid
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 Api : https://api.nekorinn.my.id
✍️ Convert By ZenzXD
bingung ser apa cok :v
*/

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) throw `Masukkan teks, contoh:\n\n${usedPrefix + command} zenzz XD`
  m.react('🕐')

  try {
    let url = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(query)}`
    let res = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000
    })
    let contentType = res.headers['content-type']
    if (!contentType || !contentType.startsWith('video/')) throw 'API tidak mengembalikan video.'

   
    let bratSticker = await sticker(res.data, null, global?.info?.packname ?? m.name ?? '', global.info.author)
    
    
    await conn.sendFile(m.chat, bratSticker, null, { asSticker: true }, m)
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.reply(`❌ Terjadi kesalahan: ${err.message}`)
  }
}

handler.help = ['bratvid <text>']
handler.command = ['bratvid']
handler.tags = ['sticker']
handler.limit = false

export default handler