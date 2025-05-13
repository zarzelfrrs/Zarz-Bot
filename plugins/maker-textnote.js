const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply('Contoh:\ntexttonote Nama|Kelas|Mata Pelajaran|Tanggal|Isi Catatan')
  }

  let [name, classroom, subject, date, ...content] = text.split('|')
  if (!name || !classroom || !subject || !date || content.length === 0) {
    return m.reply('Format salah!\nContoh:\ntexttonote Biyu|XII - Bio A|Sexual Organs|2025-01-25|Isi catatan...')
  }

  let contentEncoded = encodeURIComponent(content.join('|').trim())
  let url = `https://fastrestapis.fasturl.cloud/tool/texttonote?name=${encodeURIComponent(name)}&classroom=${encodeURIComponent(classroom)}&subject=${encodeURIComponent(subject)}&date=${encodeURIComponent(date)}&content=${contentEncoded}`

  try {
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `Catatan untuk ${subject} berhasil dibuat!`
    }, { quoted: m })
  } catch (err) {
    console.error(err)
    m.reply('Gagal membuat catatan, pastikan format dan isi valid.')
  }
}

handler.help = ['textnote <data>']
handler.tags = ['maker']
handler.command = /^textnote$/i

export default handler