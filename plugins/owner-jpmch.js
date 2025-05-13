import fs from 'fs'
import { join } from 'path'

const path = './lib/listidch.json'

const handler = async (m, { conn, args, text, command, q, mime, qmsg }) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([], null, 2))
  let data = JSON.parse(fs.readFileSync(path))

  if (command === 'addjpm') {
    const id = args[0] || m.quoted?.chat
    if (!id || !id.endsWith('@newsletter')) return m.reply('❗ Masukkan ID channel dengan format benar.\nContoh: .addjpm 120xxxx@newsletter')
    if (data.includes(id)) return m.reply('ID tersebut sudah ada di dalam list.')
    data.push(id)
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return m.reply(`✅ ID berhasil ditambahkan.\nTotal sekarang: ${data.length}`)
  }

  if (command === 'removejpm') {
    const id = args[0] || m.quoted?.chat
    if (!id || !id.endsWith('@newsletter')) return m.reply('❗ Masukkan ID channel yang valid.')
    if (!data.includes(id)) return m.reply('ID tidak ditemukan dalam list.')
    data = data.filter(i => i !== id)
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return m.reply(`✅ ID berhasil dihapus.\nSisa: ${data.length}`)
  }

  if (command === 'listjpm') {
    if (data.length < 1) return m.reply('📭 List masih kosong.')
    const listText = data.map((v, i) => `${i + 1}. ${v}`).join('\n')
    return m.reply(`📢 *List ID Channel:*\n\n${listText}`)
  }

  if (command === 'jpmch' || command === 'jpmallch') {
    if (data.length < 1) return m.reply('❗ Tidak ada ID channel di list.')
    if (!q && !text) return m.reply('❗ Masukkan teks atau kirim foto/video dengan caption.')

    let filePath
    let content
    let type = 'text'

    if (/image|video/.test(mime)) {
      filePath = await conn.downloadAndSaveMediaMessage(qmsg)
      const buffer = fs.readFileSync(filePath)
      type = /image/.test(mime) ? 'image' : 'video'
      content = {
        [type]: buffer,
        caption: text || ''
      }
    } else {
      content = { text }
    }

    await m.reply(`⏳ Mengirim *${type}* ke ${data.length} channel...`)
    let count = 0

    for (let id of data) {
      try {
        await conn.sendMessage(id, content)
        count++
      } catch {}
      await new Promise(r => setTimeout(r, global.delayJpm || 1500))
    }

    if (filePath) fs.unlinkSync(filePath)

    return conn.sendMessage(m.chat, {
      text: `✅ Berhasil kirim *${type}* ke ${count} channel`
    }, { quoted: m })
  }
}

handler.help = ['addjpm <id>', 'removejpm <id>', 'listjpm', 'jpmch']
handler.tags = ['owner']
handler.command = /^(addjpm|removejpm|listjpm|jpmch|jpmallch)$/i
handler.owner = true

export default handler