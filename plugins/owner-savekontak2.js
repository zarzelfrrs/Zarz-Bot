import fs from 'fs'
import path from 'path'

let contacts = []

let handler = async (m, { conn }) => {
  if (!global.isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan perintah ini')
  if (!m.isGroup) return m.reply('❌ Perintah ini hanya bisa digunakan di grup')

  const res = await m.metadata
  const halls = res.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)

  for (let mem of halls) {
    if (mem !== global.botNumber && mem.split('@')[0] !== global.owner) {
      contacts.push(mem)
      fs.writeFileSync('./lib/contacts/contacts.json', JSON.stringify(contacts))
    }
  }

  try {
    const uniqueContacts = [...new Set(contacts)]
    const vcardContent = uniqueContacts.map((contact) => {
      const nomor = contact.split('@')[0]
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:Buyer ${global.namaOwner} - ${nomor}`,
        `TEL;type=CELL;type=VOICE;waid=${nomor}:+${nomor}`,
        'END:VCARD',
        ''
      ].join('\n')
    }).join('')

    fs.writeFileSync('./lib/contacts/contacts.vcf', vcardContent, 'utf8')
  } catch (err) {
    return m.reply('Terjadi kesalahan:\n' + err.toString())
  } finally {
    if (m.chat !== m.sender) {
      await m.reply(`*Berhasil membuat file kontak ✅*\nFile kontak telah dikirim ke private chat\nTotal *${halls.length}* kontak`)
    }

    await conn.sendMessage(m.sender, {
      document: fs.readFileSync('./lib/contacts/contacts.vcf'),
      fileName: 'contacts.vcf',
      caption: `File kontak berhasil dibuat ✅\nTotal *${halls.length}* kontak`,
      mimetype: 'text/vcard'
    }, { quoted: m })

    contacts = []
    fs.writeFileSync('./lib/contacts/contacts.json', JSON.stringify(contacts))
    fs.writeFileSync('./lib/contacts/contacts.vcf', '')
  }
}

handler.help = ['savekontak2']
handler.tags = ['owner']
handler.command = /^savekontak2$/i
handler.owner = true
handler.group = true

export default handler