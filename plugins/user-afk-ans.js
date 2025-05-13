var handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    if (user.afk == undefined) user.afk = 0
    user.afk = + new Date
    user.afkReason = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : 'Tidak ada'
    let caption = `@${m.sender.split('@')[0]} Sedang AFK\n\nAlasan ➠ ${user.afkReason}`
    conn.sendMessage(m.chat, { text: caption, mentions: conn.parseMention(caption) }, { quoted: m })
  }
  handler.help = ['afk']
  handler.tags = ['user']
  handler.command = /^afk$/i
  
  export default handler