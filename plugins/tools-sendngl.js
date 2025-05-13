import fetch from 'node-fetch'

let handler = async (m, { args }) => {
    if (args.length < 2) throw 'Penggunaan: .sendngl <link NGL> <pesan>\nContoh: .sendngl https://ngl.link/zenzzzxd_1 Halo dari bot!'

    let linkNGL = args[0]
    if (!linkNGL.includes('ngl.link')) throw 'Link NGL tidak valid! Harus mengandung "ngl.link"'

    let pesan = args.slice(1).join(' ')
    let apiUrl = `https://fastrestapis.fasturl.cloud/tool/sendngl?link=${encodeURIComponent(linkNGL)}&message=${encodeURIComponent(pesan)}&type=anonymous`

    let res = await fetch(apiUrl)
    if (!res.ok) throw await res.text()
    let json = await res.json()

    if (json.status === 200 && json.content === 'Success') {
        m.reply(`✅ Pesan berhasil dikirim ke ${json.result.sentTo}\n\nIsi Pesan: ${json.result.message}`)
    } else {
        throw 'Gagal mengirim pesan ke NGL.'
    }
}

handler.help = ['sendngl <link> <pesan>']
handler.tags = ['tools']
handler.command = /^sendngl$/i

export default handler