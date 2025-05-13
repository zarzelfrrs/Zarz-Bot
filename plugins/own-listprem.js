const handler = async (m, { conn, usedPrefix }) => {
  let response = `*🏅 PREMIUM USERS LIST*\n\n`
  let totalPremium = 0
  let premiumUsers = []

  for (let jid in global.db.data.users) {
    let user = global.db.data.users[jid]
    if (user.premium && user.premiumTime > Date.now()) {
      totalPremium++

      let name = user.name || 'No Name'
      let number = jid.split('@')[0]
      let timeLeft = user.premiumTime - Date.now()
      let days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
      let hours = Math.floor(timeLeft / (60 * 60 * 1000)) % 24
      let minutes = Math.floor(timeLeft / (60 * 1000)) % 60

      response += `
╭───⟪ @${number} ⟫
│ •  ️👤 *Name:* ${name}
│ •  ⏳ *Remaining:* ${days}d ${hours}h ${minutes}m
╰───────────────\n`.trim()

      premiumUsers.push(jid)
    }
  }

  if (totalPremium === 0) {
    response = '🚫 *Tidak ada user premium aktif saat ini.*'
  } else {
    response += `\n*Total Premium:* ${totalPremium} user\n*Upgrade Premium:* ${usedPrefix}owner`
  }

  m.reply(response, m.chat, {
    mentions: premiumUsers
  })
}

handler.help = ['listpremium']
handler.tags = ['owner']
handler.command = /^listprem(ium|iums)?$/i
handler.owner = true

export default handler