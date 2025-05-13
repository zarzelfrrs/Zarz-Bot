import moment from 'moment-timezone'
import { createCanvas } from 'canvas'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let waktu = moment().tz('Asia/Jakarta')
const tampilTanggal = waktu.format('dddd, DD MMMM YYYY')
const tampilWaktu = waktu.format('HH:mm:ss')

let handler = async (m, { text, conn }) => {
  if (!text || !text.includes(',')) {
    return m.reply('❗ Format salah!\nContoh: .proses nokos,5000,dana')
  }

  const [barang, harga, metode] = text.split(',').map(v => v.trim())

  if (!barang || !harga || !metode) {
    return m.reply('❗ Format tidak lengkap!\nContoh: .proses barang,harga,pembayaran')
  }

  const canvasWidth = 600
  const canvasHeight = 450
  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#000"
  ctx.font = 'bold 20px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('PESANAN SEDANG DIPROSES', canvasWidth / 2, 40)

  ctx.font = '14px monospace'
  ctx.fillText(`Tanggal/Waktu: ${tampilTanggal} ${tampilWaktu}`, canvasWidth / 2, 65)

  ctx.textAlign = 'left'
  ctx.fillText(`Layanan: ${barang}`, 20, 100)
  ctx.fillText(`Harga: Rp ${Number(harga).toLocaleString('id-ID')}`, 20, 130)

  ctx.fillText(`Metode Pembayaran: ${metode.toUpperCase()}`, 20, 160)

  ctx.beginPath()
  ctx.moveTo(20, 190)
  ctx.lineTo(canvasWidth - 20, 190)
  ctx.stroke()

  let subtotal = Number(harga)
  let totalPembayaran = subtotal

  ctx.fillText(`Total Pembayaran: Rp ${totalPembayaran.toLocaleString('id-ID')}`, 20, 220)

  ctx.beginPath()
  ctx.moveTo(20, 250)
  ctx.lineTo(canvasWidth - 20, 250)
  ctx.stroke()

  ctx.font = "bold 14px monospace"
  ctx.textAlign = "center"
  ctx.fillText("Mohon tunggu sebentar", canvasWidth / 2, 280)
  ctx.fillText("Pesanan Anda sedang diproses", canvasWidth / 2, 300)

  const dirPath = path.join(__dirname, 'tmp')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  const buffer = canvas.toBuffer("image/png")
  const filePath = path.join(dirPath, "pesanan_diproses.png")
  fs.writeFileSync(filePath, buffer)

  const caption = `
*—·· Pesanan Sedang Diproses  ··—*

* *Layanan:* ${barang}
* *Harga:* Rp ${Number(harga).toLocaleString('id-ID')}
* *Payment:* ${metode}
* *Tanggal:* ${tampilTanggal}
* *Waktu:* ${tampilWaktu} WIB

Mohon tunggu sebentar, pesanan Anda sedang diproses.
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: filePath },
    caption
  }, { quoted: m })

  fs.unlinkSync(filePath)
}

handler.help = ['proses <barang,harga,pembayaran>']
handler.tags = ['store']
handler.command = /^proses$/i
handler.owner = true

export default handler