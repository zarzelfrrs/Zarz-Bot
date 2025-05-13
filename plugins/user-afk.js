let handler = m => m
handler.before = m => {
  let user = global.db.data.users[m.sender]
  if (user.afk > -1) {
  let capt = `@${m.sender.split('@')[0]} Berhenti AFK${user.afkReason ? ' Setelah ' + user.afkReason : ''}
Selama ${(new Date - user.afk).toTimeString()}`
    conn.sendMessage(m.chat, { text: capt, mentions: conn.parseMention(capt) }, { quoted: m })
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    if (m.key.fromMe) return true
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    let caption = `Jangan Tag Dia!
Dia Sedang AFK ${reason ? 'Dengan Alasan ' + reason : 'Tanpa Alasan'}
Selama ${(new Date - afkTime).toTimeString()}`
    conn.sendMessage(m.chat, { text: caption, mentions: conn.parseMention(caption) }, { quoted: m })
  }
  return true
}

export default handler