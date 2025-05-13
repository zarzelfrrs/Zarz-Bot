/*

# Fitur : reactch
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : conn.newsletterReactMessage

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

const font2 = {
  a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶',
  h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽',
  o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄',
  v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉'
}

const handler = async (m, { conn, text }) => {
  if (!text.includes('|')) {
    return m.reply(`Format salah. Contoh:\n.reactch https://whatsapp.com/channel/abc/123|halo dunia`)
  }

  let [link, ...messageParts] = text.split('|')
  link = link.trim()
  const msg = messageParts.join('|').trim().toLowerCase()

  if (!link.startsWith("https://whatsapp.com/channel/")) {
    return m.reply("Link tidak valid. Harus diawali dengan https://whatsapp.com/channel/")
  }

  const emoji = msg.split('').map(c => c === ' ' ? '―' : (font2[c] || c)).join('')

  try {
    const [, , , , channelId, messageId] = link.split('/')
    const res = await conn.newsletterMetadata("invite", channelId)
    await conn.newsletterReactMessage(res.id, messageId, emoji)
    m.reply(`✅ Reaksi *${emoji}* berhasil dikirim ke channel *${res.name}*.`)
  } catch (e) {
    console.error(e)
    m.reply("❌ Error\nGagal mengirim reaksi. Cek link atau koneksi!")
  }
}

handler.command = ['reactch', 'rch']
handler.tags = ['tools']
handler.help = ['reactch <link>|<teks>']
handler.owner = true

export default handler