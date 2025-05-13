import fs from 'fs'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan nama file, contoh: *${usedPrefix + command} config.js*`
    m.reply('Tunggu Sebentar, Sedang mengambil file Database')
    let sesi = await fs.readFileSync(`./${text}`)
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/txt', fileName: text }, { quoted: m })
}
handler.help = ['getfile']
handler.tags = ['owner']
handler.command = /^(getfile|gf)$/i

handler.owner = true

export default handler
