import fs from 'fs'
import fetch from 'node-fetch'
let handler = async(m, { conn, text, command, participants }) => {
let tag = `@${m.sender.split('@')[0]}`
let tek = `${text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : tag}`
   let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (!m.quoted) return conn.sendMessage(m.chat, { text: `${text ? text : '@' + m.sender.split('@')[0]}`, mentions: participants.map(a => a.id) }, {quoted:m})
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users }, {quoted:m} )

    }
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = /^(hidetag|ht)$/i
handler.group = true
handler.admin = true

export default handler