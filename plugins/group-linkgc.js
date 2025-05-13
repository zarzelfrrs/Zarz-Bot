let handler = async (m, { conn }) => {
    let groupMetadata = await conn.groupMetadata(m.chat)

    // Cek apakah bot adalah admin
    let isBotAdmin = groupMetadata.participants.some(participant => participant.id === conn.user.jid && participant.admin)

    if (!isBotAdmin) {
        return m.reply('Huhuhuhuhu aku ga admin, kasi admin la')
    }

    // Ambil response dari group invite link
    let response = await conn.groupInviteCode(m.chat)

    // Teks informasi grup
    let teks = `
📛 *Name :* ${groupMetadata.subject}
👤 *Owner Grup :* ${groupMetadata.owner ? '+' + groupMetadata.owner.split('@')[0] : 'Tidak diketahui'}
🌱 *ID :* ${groupMetadata.id}
👥 *Member :* ${groupMetadata.participants.length}
🔗 *Link :* https://chat.whatsapp.com/${response}
`

    // Gabungkan teks dengan external ad reply dan kirim pesan
    let messageText = `${teks.trim()}\n\nIni adalah informasi grup ${groupMetadata.subject}, semoga bermanfaat!`

    // URL yang akan ditampilkan pada ad reply
    let linkUrl = 'https://example.com'  // Ganti dengan URL yang sesuai

    // Kirim pesan dengan informasi grup dan link + external ad reply
    await conn.sendMessage(m.chat, {
        text: messageText,
        contextInfo: {
            externalAdReply: {
                title: 'Z E N Z   A I -   M D',
                body: 'Zenzzz XD',
                thumbnailUrl: 'https://files.catbox.moe/h3njeb.jpg',  // Gambar thumbnail
                sourceUrl: linkUrl,  // URL sumber
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: true,
            }
        }
    }, {
        quoted: m,
    })
}

handler.help = ['linkgroup', 'linkgc', 'gclink']
handler.tags = ['group']
handler.command = /^(linkgroup|linkgc|gclink)$/i


export default handler