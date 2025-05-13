const handler = async (m, { args, conn }) => {
  conn.tebakmakanan = conn.tebakmakanan || {}
  const game = conn.tebakmakanan[m.chat]
  if (!game) return m.reply('⚠️ Tidak ada soal yang aktif!\nKetik *.tebakmakanan* untuk mulai.')

  const jawabanUser = args.join(' ').toLowerCase().trim()
  if (!jawabanUser) return m.reply('✏️ Masukkan jawabanmu!\nContoh: *.jawab rendang*')

  if (jawabanUser === game.jawaban) {
    clearTimeout(game.timeout)
    delete conn.tebakmakanan[m.chat]
    return m.reply(`✅ *Benar!*\nJawabannya: *${game.jawaban}*\n\n${game.deskripsi}`)
  } else {
    return m.reply(`❌ *Salah!*\nCoba lagi sebelum waktunya habis.`)
  }
}

handler.help = ['jawab <tebakan>']
handler.tags = ['game']
handler.command = /^jawab$/i

export default handler