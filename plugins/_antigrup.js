const isGrup = /(chat.whatsapp|whatsapp.com\/channel)/i;

export async function before(m, { isAdmin, isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiGrup = isGrup.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antiGrup && isAntiGrup) {
    if (isAdmin || isOwner || !isBotAdmin){		  
        } else {
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }return m.reply('メ `Link Terdeteksi`\n\nAdmin kirim link?\nAdmin mah bebas cuy🗿☕')
    }
    if (chat.antiGrupKick && isAntiGrup) {
    if (isAdmin || isOwner || !isBotAdmin){		  
        } else {
    await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }return m.reply('メ `Link Terdeteksi`\n\nAdmin kirim link?\nAdmin mah bebas cuy🗿☕')
    }
}