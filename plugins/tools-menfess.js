import { createRoom } from '../lib/menfess.js'  // Pastikan import ini ada

const handler = async (m, { conn, text, command, isCreator, prefix, ownernumber, botNumber, gr }) => {
  if (Object.values(anon.anonymous).find(p => p.check(m.sender))) return m.reply("You are still in the room")
  if (m.isGroup) return m.reply('private')
  if (!isCreator) return m.reply(`Use ${prefix + command} number|your message\nExample: ${prefix + command} ${ownernumber}|Hi Owner`)
  if (text.length > 700) return m.reply('The text is too long')
  
  const q = text.split('|')
  if (q.length < 2) return m.reply(`*Format salah!*\nContoh: .${command} 6281234567890|Pesan kamu`)

  let num = q[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let pesan = q[1]

  let cekno = await conn.onWhatsApp(num)
  if (cekno.length == 0) return m.reply('Enter a valid and registered number on WhatsApp!!!')
  if (num === m.sender) return m.reply('Cannot Confess To Own Number!!!')
  if (num === botNumber) return m.reply('Can\'t Confess to bot number!!!')

  let nomor = m.sender

  const xeonconfesmsg = `Hi, Someone sent a message to you.

Secret Sender:

-------------------------------------->

💌 Message: ${pesan}

-------------------------------------->`

  await conn.sendMessage(num, {
    text: xeonconfesmsg,
    contextInfo: {
      mentionedJid: [m.sender],
      "externalAdReply": {
        "showAdAttribution": true,
        "containsAutoReply": true,
        "title": `${global.botname}`,
        "body": `${owner}`,
        "previewType": "PHOTO",
        "thumbnailUrl": '',
        "thumbnail": '',
        "sourceUrl": `${gr}`
      }
    }
  }, { quoted: m })

  await conn.sendMessage(num, {
    text: `You can also reply to the message by sending a message, if you don't want to reply, please type .leave and enter send button`
  }, { quoted: m })

  let lidt = `Success Sending Message
👤 From: wa.me/${nomor.split("@s.whatsapp.net")[0]}
👥 To: wa.me/${q[0].replace(/[^0-9]/g, '')}

⬡──⬡─────────⬡──⬡

Your Message: ${pesan}

⬡──⬡─────────⬡──⬡`

  let check = Object.values(anon.anonymous).find(p => p.state == "WAITING")
  if (!check) {
    createRoom(m.sender, num)  // Fungsi createRoom yang diimport digunakan di sini
    console.log("[ CONFESS ] Creating room for: " + m.sender)
    return m.reply(lidt)
  }
}

handler.help = ['menfes <nomor>|<pesan>', 'confess <nomor>|<pesan>']
handler.tags = ['tools']
handler.command = /^menfes|confess$/i
handler.limit = false

export default handler