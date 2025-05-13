const cuki = async (m, { conn, isGroup, participants, text }) => {
  try {
    

    let mem = participants.map(a => a.id)

    await conn.sendMessage(m.chat, {
      text: `@${m.chat} ${text}`,
      contextInfo: {
        mentionedJid: mem,
        groupMentions: [
          {
            groupSubject: `everyone - [ *ᴄᴜᴋɪ ᴅɪɢɪᴛᴀʟɪ* ]`,
            groupJid: m.chat,
          },
        ],
      },
    })
  } catch (e) {
    m.reply(`❌ Error\nLogs error : ${e.message}`)
  }
}

cuki.command = ['everyone']
cuki.help = ['everyone <teks>']
cuki.tags = ['group']
cuki.group = true
cuki.owner = true
cuki.group = true

export default cuki