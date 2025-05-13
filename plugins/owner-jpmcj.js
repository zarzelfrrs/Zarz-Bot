import fs from 'fs'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

const path = './lib/listidch.json'

async function mediaToBuffer(message, type) {
  const stream = await downloadContentFromMessage(message[type + 'Message'], type)
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

const handler = async (m, { conn, args, text, command }) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([], null, 2))
  let data = JSON.parse(fs.readFileSync(path))

  if (command === 'addjpm') {
    const id = args[0] || m.quoted?.chat
    if (!id || !id.endsWith('@newsletter')) return m.reply('❗ Format ID salah.\nContoh: .addjpm 120xxxx@newsletter')
    if (data.includes(id)) return m.reply('ID sudah ada.')
    data.push(id)
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return m.reply(`✅ ID ditambahkan.\nTotal: ${data.length}`)
  }

  if (command === 'jpmch' || command === 'jpmallch') {
    if (data.length < 1) return m.reply('❗ List kosong.')

    const msg = m.message
    let type = 'text'
    let buffer, content

    if (msg?.imageMessage || msg?.videoMessage) {
      const mediaType = msg.imageMessage ? 'image' : 'video'
      buffer = await mediaToBuffer(msg, mediaType)
      content = {
        [mediaType]: buffer,
        caption: text || msg[mediaType + 'Message'].caption || ''
      }
      type = mediaType
    } else if (m.quoted?.imageMessage || m.quoted?.videoMessage) {
      const mediaType = m.quoted.imageMessage ? 'image' : 'video'
      buffer = await mediaToBuffer(m.quoted, mediaType)
      content = {
        [mediaType]: buffer,
        caption: text || m.quoted[mediaType + 'Message'].caption || ''
      }
      type = mediaType
    } else if (text) {
      content = { text }
    } else {
      return m.reply('❗ Kirim teks, atau kirim media dengan caption.')
    }

    await m.reply(`⏳ Kirim *${type}* ke ${data.length} channel...`)
    let count = 0

    for (let id of data) {
      try {
        await conn.sendMessage(id, content)
        count++
      } catch {}
      await new Promise(r => setTimeout(r, global.delayJpm || 1500))
    }

    return conn.sendMessage(m.chat, {
      text: `✅ Berhasil kirim *${type}* ke ${count} channel`
    }, { quoted: m })
  }
}

handler.help = ['addjpm <id>', 'jpmch']
handler.tags = ['owner']
handler.command = /^(addjpm|jpmch|jpmallch)$/i
handler.owner = true

export default handler