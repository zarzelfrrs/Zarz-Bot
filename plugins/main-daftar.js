import { createHash } from 'crypto'
import moment from 'moment-timezone'

let Reg = /\|?(.*)$/i

let handler = async function (m, { text, usedPrefix, command, conn }) {
    let namae = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
    let user = global.db.data.users[m.sender]
    let sn = createHash('md5').update(m.sender).digest('hex')

    if (user.registered === true) throw `❗ Kamu sudah terdaftar!\n\nMau daftar ulang?\nKetik:\n${usedPrefix}unreg ${sn}`

    if (!Reg.test(text)) return m.reply(`Ketik dengan format:\n\n${usedPrefix + command} namakamu\n\nContoh:\n${usedPrefix + command} ikyy`)

    let [_, name] = text.match(Reg)
    if (!name) return m.reply('*Nama nya siapa bangg??*')
    if (name.split('').length > 100) return m.reply('Nama maksimal 100 karakter.')

    user.name = name.trim()
    user.regTime = +new Date
    user.registered = true

    let caption = `
「 *PENDAFTARAN BERHASIL* 」
│ ✅ *Status:* Terdaftar
│ ✨ *Nama:* ${name}
│ 🔐 *SN Key:* ${sn}
│ 
│ 📅 *Tanggal:* ${week}, ${date}
│ ⏰ *Waktu:* ${wktuwib}


Selamat datang di sistem bot!
Data kamu sudah tersimpan di database.
Semoga harimu menyenangkan~!
`.trim()

    await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption,
        footer: 'Pilih tombol di bawah untuk lanjut:',
        buttons: [
            {
                buttonId: '.menu all',
                buttonText: { displayText: '📂 Menu Utama' },
                type: 1
            }
        ],
        headerType: 4
    }, { quoted: m }) // Ini bagian quoted-nya
}

handler.help = ['daftar']
handler.tags = ['user']
handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler