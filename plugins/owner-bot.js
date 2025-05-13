let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
     *Haii Owner ku yang paling ganteng aku on kokk*
`.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', 'Powered by zenzz', 'status@broadcast')
}
handler.help = ['bot']
handler.tags = ['tools']
handler.command = /^(bot)$/i
handler.owner = true
export default handler