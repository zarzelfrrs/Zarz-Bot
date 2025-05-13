import moment from 'moment-timezone'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan nama grup!\nContoh: .creategc <nama gc>'

    let cret = await conn.groupCreate(text, [])
    let response = await conn.groupInviteCode(cret.id)

    let teks = `\`\`\`「  CREATION GROUP MESSAGE  」\`\`\`
▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB
▸ Link : https://chat.whatsapp.com/${response}
`

    setTimeout(() => {
        conn.reply(m.chat, teks, m, { mentions: [cret.owner] })
    }, 7000)

    setTimeout(() => {
        conn.groupParticipantsUpdate(cret.id, [m.sender], 'promote')
    }, 5000)

    setTimeout(() => {
        conn.groupParticipantsUpdate(cret.id, [m.sender], 'add')
    }, 1000)
}

handler.help = ['creategc <nama grup>']
handler.tags = ['tools']
handler.command = /^creategc$/i
handler.owner = true


export default handler