import { createCanvas } from 'canvas'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (m, { text, conn }) => {
  if (!text) {
    return m.reply("Format salah!\nGunakan: .struk toko|nama_penjual|kontak_penjual|items|metode_pembayaran|info_tambahan\n\nContoh:\n.struk TOKO BIYU|Yubi|6285776461481|Es Teh-5000-2,Nasi Goreng-15000-1|Cash|Terima kasih sudah datang!")
  }

  let [toko, namaPenjual, kontakPenjual, items, metodePembayaran, infoTambahan] = text.split("|")
  if (!toko || !namaPenjual || !kontakPenjual || !items || !metodePembayaran) return m.reply("*Format tidak lengkap*")

  let daftarBarang = items.split(",").map((item, index) => {
    let [nama, harga, jumlah] = item.split("-")
    return {
      nomor: index + 1,
      nama,
      harga: parseInt(harga),
      jumlah: parseInt(jumlah),
      total: parseInt(harga) * parseInt(jumlah)
    }
  })

  const canvasWidth = 600
  const canvasHeight = 600 + daftarBarang.length * 30
  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#000"
  ctx.font = "bold 20px monospace"
  ctx.textAlign = "center"
  ctx.fillText(toko.toUpperCase(), canvasWidth / 2, 40)
  ctx.font = "14px monospace"
  ctx.fillText(`Kontak Penjual: ${kontakPenjual}`, canvasWidth / 2, 65)

  let transaksiNomor = Math.floor(Math.random() * 1000000000000000)
  let currentDate = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })

  ctx.textAlign = "left"
  ctx.fillText(`Nomor Transaksi: ${transaksiNomor}`, 20, 100)
  ctx.fillText(`Tanggal: ${currentDate}`, 20, 125)

  ctx.beginPath()
  ctx.moveTo(20, 150)
  ctx.lineTo(canvasWidth - 20, 150)
  ctx.stroke()

  let startY = 175
  daftarBarang.forEach((item, i) => {
    ctx.fillText(`${item.nomor}. ${item.nama} - Rp${item.harga.toLocaleString()} x ${item.jumlah} = Rp${item.total.toLocaleString()}`, 20, startY + i * 30)
  })

  let lastItemY = startY + daftarBarang.length * 30 + 10
  ctx.beginPath()
  ctx.moveTo(20, lastItemY)
  ctx.lineTo(canvasWidth - 20, lastItemY)
  ctx.stroke()

  let subtotal = daftarBarang.reduce((sum, item) => sum + item.total, 0)
  let pajak = subtotal * 0.1
  let totalPembayaran = subtotal + pajak

  ctx.fillText(`Subtotal: Rp${subtotal.toLocaleString()}`, 20, lastItemY + 25)
  ctx.fillText(`Pajak (10%): Rp${pajak.toLocaleString()}`, 20, lastItemY + 50)
  ctx.fillText(`Total Pembayaran: Rp${totalPembayaran.toLocaleString()}`, 20, lastItemY + 75)
  ctx.fillText(`Metode Pembayaran: ${metodePembayaran}`, 20, lastItemY + 100)

  if (infoTambahan) {
    ctx.fillText(`Info Tambahan: ${infoTambahan}`, 20, lastItemY + 125)
  }

  ctx.font = "bold 14px monospace"
  ctx.textAlign = "center"
  ctx.fillText("TERIMA KASIH TELAH BERBELANJA", canvasWidth / 2, lastItemY + 160)
  ctx.fillText(namaPenjual.toUpperCase(), canvasWidth / 2, lastItemY + 180)

 
  const dirPath = path.join(__dirname, 'tmp')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  const buffer = canvas.toBuffer("image/png")
  const filePath = path.join(dirPath, "receipt.png")
  fs.writeFileSync(filePath, buffer)

  await conn.sendMessage(m.chat, {
    image: { url: filePath },
    caption: "Ini Struk nya 📍\n\nPesan: Amanah Selalu :v"
  }, { quoted: m })

  fs.unlinkSync(filePath)
}

handler.help = ['struk']
handler.tags = ['maker', 'owner']
handler.command = /^struk$/i
handler.owner = true

export default handler