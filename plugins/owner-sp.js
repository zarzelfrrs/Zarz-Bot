import fs from 'fs'
import path from 'path'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Kodenya Mana?\n\nContoh :\n${usedPrefix + command} menu.js`)
    if (!m.quoted) return m.reply(`balas pesan nya!`)
    
    // Menentukan path untuk menyimpan di folder plugins
    let filePath = path.join('plugins', text)
    
    await fs.writeFileSync(filePath, m.quoted.text)
    m.reply(`tersimpan di ${filePath}`)
}

handler.help = ['saveplugins']
handler.tags = ['owner']
handler.command = /^(sp|saveplugins)$/i
handler.mods = true

export default handler