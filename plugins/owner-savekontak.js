import fs from 'fs'
import path from 'path'

const contactsDir = './lib/contacts'
const jsonPath = path.join(contactsDir, 'contacts.json')
const vcfPath = path.join(contactsDir, 'contacts.vcf')

let contacts = []

let handler = async (m, { conn }) => {
  if (!m.chat.endsWith('@g.us')) return m.reply('Fitur ini hanya bisa digunakan di grup.')

  if (!fs.existsSync(contactsDir)) fs.mkdirSync(contactsDir, { recursive: true })

  const res = await conn.groupMetadata(m.chat)
  const halls = res.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)

  for (let mem of halls) {
    if (mem !== global.botNumber && mem.split('@')[0] !== global.owner) {
      contacts.push(mem)
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(contacts))

  try {
    const uniqueContacts = [...new Set(contacts)]
    const vcardContent = uniqueContacts.map(contact => {
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

    fs.writeFileSync(vcfPath, vcardContent, 'utf8')
  } catch (err) {
    return m.reply('Terjadi kesalahan:\n' + err.toString())
  } finally {
    if (m.chat !== m.sender) {
      await m.reply(`*Berhasil membuat file kontak ✅*\nFile kontak telah dikirim ke private chat\nTotal *${contacts.length}* kontak`)
    }

    await conn.sendMessage(m.sender, {
      document: fs.readFileSync(vcfPath),
      fileName: 'contacts.vcf',
      caption: `File kontak berhasil dibuat ✅\nTotal *${contacts.length}* kontak`,
      mimetype: 'text/vcard'
    }, { quoted: m })

    contacts = []
    fs.writeFileSync(jsonPath, JSON.stringify([]))
    fs.writeFileSync(vcfPath, '')
  }
}

handler.help = ['savekontak2']
handler.tags = ['owner']
handler.command = /^savekontak2$/i
handler.owner = true
handler.group = true

export default handler