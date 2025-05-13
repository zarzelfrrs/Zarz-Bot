import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, participants }) => {
    let usr = m.quoted ? [m.quoted.sender] : m.mentionedJid
    if (!usr || usr.length === 0) {
        return m.reply(`Format salah!\nGunakan dengan mention atau reply pesan target.\n\nContoh:\n.kick @user`)
    }

    let users = usr.filter(u => !areJidsSameUser(u, conn.user.id))
    let kickedUser = []
    for (let user of users) {
        if (user.endsWith('@s.whatsapp.net')) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            kickedUser = kickedUser.concat(res)
            await delay(1000)
        }
    }
    m.reply(`Admin Mengeluarkan Anda 😡😈`, null, {
        mentions: kickedUser
    })
}

handler.help = ['kick'].map(v => v + '')
handler.tags = ['group']
handler.command = /^(kick)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))