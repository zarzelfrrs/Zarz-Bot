import fetch from 'node-fetch'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

async function FindSong(buffer) {
    const form = new FormData()
    form.append('file', buffer, { filename: 'file.mp3', contentType: 'audio/mp3' })
    form.append('sample_size', buffer.length)

    try {
        let response = await fetch('https://api.doreso.com/humming', {
            method: 'POST',
            headers: {
                ...form.getHeaders(),
                "accept": "application/json, text/plain, */*",
                "Referer": "https://aha-music.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: form
        })

        if (!response.ok) throw `Gagal mengenali lagu. Status: ${response.status}`

        let data = await response.json()
        return data
    } catch (error) {
        return { error: error.message }
    }
}

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = q.mimetype || (q.msg || {}).mimetype || ''

        if (!mime || !mime.includes('audio')) {
            throw `Balas pesan suara atau audio dengan perintah ${usedPrefix + command} untuk mengenali lagunya.`
        }

        let media = await q.download()
        let filePath = path.join(global.__dirname(import.meta.url), '../tmp/', getRandom('.mp3'))
        fs.writeFileSync(filePath, media)

        let res = await FindSong(media)

        fs.unlinkSync(filePath)

        if (res.error) throw res.error
        if (!res.data) throw `Lagu tidak ditemukan.`

        let { artists, title } = res.data
        let result = `─── PENGENALAN LAGU ───\n`
        result += `Judul  : ${title}\n`
        result += `Artis  : ${artists}\n`
        result += `──────────────────────\n`

        conn.sendMessage(m.chat, { text: result }, { quoted: m })
    } catch (e) {
        throw `Terjadi kesalahan: ${e.message || e}`
    }
}

handler.help = ['whatmusic']
handler.tags = ['tools']
handler.command = /^(whatmusic)$/i

export default handler;


const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`