let { downloadContentFromMessage } = (await import('@adiwajshing/baileys'));
import fetch from 'node-fetch'

export async function before(m, {conn}) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
 
let chat = global.db.data.chats[m.chat]
    if (chat.viewonce) {
    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message
        let type = Object.keys(msg)[0]
        let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (/video/.test(type)) {
            return conn.sendFile(m.chat, buffer, '', `Anti Sekali Lihat Diaktifkan, Video Kamu Otomatis Terbuka\n\n` + msg[type].caption || '', m)
            
        } else if (/image/.test(type)) {
            return conn.sendFile(m.chat, buffer, author, `Anti Sekali Lihat Diaktifkan, Foto Kamu Otomatis Terbuka\n\n` + msg[type].caption || '', m)
        }
    }
}
}