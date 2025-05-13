const isLink = /(wa.me|https|chat.whatsapp)/i;

export async function before(m, { isAdmin, isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiLink = isLink.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antiLink && isAntiLink) {
    if (isAdmin || isOwner || !isBotAdmin){		  
        } else {
    this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
    // return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }return true
    }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}