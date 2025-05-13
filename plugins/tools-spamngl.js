import fetch from 'node-fetch'

let handler = async (m, { args }) => {
    if (args.length < 3) throw 'Penggunaan: .spamngl <link NGL> <jumlah> <pesan>\nContoh: .spamngl https://ngl.link/zenzzzxd_1 10 Halo dari bot!'

    let linkNGL = args[0]
    if (!linkNGL.includes('ngl.link')) throw 'Link NGL tidak valid! Harus mengandung "ngl.link"'

    let count = parseInt(args[1])
    if (isNaN(count) || count <= 0) throw 'Jumlah harus berupa angka yang valid dan lebih dari 0!'

    let pesan = args.slice(2).join(' ')

    
    await m.reply(`⏳ Sebentar ya kak, sedang mengirim ${count} pesan ke NGL...`)

    let apiUrl = `https://fastrestapis.fasturl.cloud/tool/spamngl?link=${encodeURIComponent(linkNGL)}&message=${encodeURIComponent(pesan)}&type=anonymous&count=${count}`

    let res = await fetch(apiUrl)
    if (!res.ok) throw await res.text()
    let json = await res.json()

    if (json.status === 200 && json.content === 'Success') {
        m.reply(`✅ Berhasil mengirim ${count} pesan ke ${json.result.sentTo}\n\nIsi Pesan:\n${json.result.message}`)
    } else {
        throw '❌ Gagal mengirim spam ke NGL.'
    }
}

handler.help = ['spamngl <link> <jumlah> <pesan>']
handler.tags = ['tools']
handler.command = /^spamngl$/i

export default handler