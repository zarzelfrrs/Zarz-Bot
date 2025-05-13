const isToxic = /(coli| tai |taik|ngentt|khontol|anjeng|ngntot|dick|pussy|peler|lonte|pantek|burit|pantat|pntek|tempek|bokep|puki|ngentot|ngewe|tolol|gblok|njing|mmek|jembut|kntol|kontol|memek|bangsat|goblok|goblog|kntl|pepeg|pepek|ppk|ngentod|ngentd|ngntd|kentod|kntd|bgst|anjg)/i;

export async function before(m, { isAdmin, isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiToxic = isToxic.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antiToxic && isAntiToxic) {
    if (isAdmin || isOwner || !isBotAdmin){		  
        } else {
	return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }return true
    }	  
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}