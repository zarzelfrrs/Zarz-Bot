let handler = async (m) => {
  if (!m.isGroup) {
    return m.reply('❌ Perintah ini hanya bisa digunakan di grup.')
  }

  // Mengambil data online anggota dari koneksi yang ada (misalnya 'conn' atau 'nova')
  let online = Object.keys(await conn.getGroupMembersPresences(m.chat))  // Ini disesuaikan dengan objek yang dipakai di bot kamu

  if (online.length < 1) {
    return m.reply('🚩 Sistem tidak mendeteksi anggota yang sedang online.')
  }

  let text = online.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')
  m.reply(text)
}

handler.help = ['listonline', 'liston']
handler.tags = ['group']
handler.command = /^(listonline|liston)$/i

export default handler