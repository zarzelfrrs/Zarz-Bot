import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command }) => {
  if (m._tiktokHandled) return
  m._tiktokHandled = true

  if (!text) {
    return m.reply(`❗ Masukkan URL TikTok.\nContoh:\n${usedPrefix + command} https://vm.tiktok.com/xxx`)
  }

  try {
    const res = await fetch(`https://zenzzx-api.vercel.app/search/tiktok?q=${encodeURIComponent(text)}`)
    const json = await res.json()

    if (!json.status || !json.result.downloadLinks?.noWatermark) {
      return m.reply('Video tidak ditemukan atau link tidak valid.')
    }

    const videoUrl = json.result.downloadLinks.noWatermark

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: 'Doneee Bangg'
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply('Terjadi kesalahan saat mengambil video.')
  }
}

handler.help = ['tiktok <link>']
handler.tags = ['downloader']
handler.command = /^tt(dl)?|tiktok$/i
handler.limit = true

export default handler