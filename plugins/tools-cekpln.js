import axios from 'axios'
import CryptoJS from 'crypto-js'

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply('Masukkan ID Pelanggan PLN-nya dulu bree!\n\nContoh: *.cekpln 12345678927383*')
  }

  const id = args[0]
  const result = await plnOnyx.check(id)

  if (!result.success) {
    return m.reply(result.result.error)
  }

  const r = result.result
  if (r.status === 'paid') {
    return m.reply(r.message)
  }

  let teks = `*CEK TAGIHAN PLN*\n\n`
  teks += `• *ID Pelanggan:* ${r.customer_id}\n`
  teks += `• *Nama:* ${r.customer_name}\n`
  teks += `• *Jumlah Tagihan:* ${r.outstanding_balance}\n`
  teks += `• *Periode Tagihan:* ${r.billing_period}\n`
  teks += `• *Stand Meter:* ${r.meter_reading}\n`
  teks += `• *Tarif/Daya:* ${r.power_category}\n`
  teks += `• *Total Bulan Ditagih:* ${r.total_bills} bulan`

  await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = /^cekpln$/i
handler.help = ['cekpln [idpel]']
handler.tags = ['tools']

export default handler

const plnOnyx = {
  api: {
    base: 'https://pln.onyxgemstone.net',
    endpoint: {
      index: '/indexplnme.php'
    }
  },

  headers: {
    'user-agent': 'Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:71.0) Gecko/201X0101 Firefox/71.0',
    'connection': 'Keep-Alive'
  },

  isValid: (id) => {
    if (!id) return { valid: false, code: 400, error: "ID Pelanggannya wajib diisi anjirr 😂" }
    if (!/^\d+$/.test(id)) return { valid: false, code: 400, error: "Idih, ID Pelanggan apaan kek gini 🗿" }
    if (id.length !== 12) return { valid: false, code: 400, error: "ID Pelanggannya kudu 12 digit yak bree 🙃" }
    return { valid: true }
  },

  generateHash: (appidn, id, yyy) => {
    if (!appidn || !id || !yyy) return { valid: false, code: 400, error: "Parameter hash-nya kurang lengkap bree 😂" }
    try {
      const c = `${appidn}|rocks|${id}|watu|${yyy}`
      const hash = CryptoJS.MD5(c).toString(CryptoJS.enc.Hex)
      return { valid: true, hash }
    } catch (err) {
      return { valid: false, code: 400, error: "Gagal generate hash 😆" }
    }
  },

  fmt: (amount) => {
    const num = Number(amount.replace(/\./g, ''))
    return `Rp ${num.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}`
  },

  parse: (data) => {
    if (typeof data === 'string') {
      try {
        const lines = data.split('\n')
        for (const line of lines) {
          if (line.trim().startsWith('{')) return JSON.parse(line)
        }
      } catch (e) {
        console.error('Parse error:', e)
      }
    }
    return data
  },

  check: async (id) => {
    const validation = plnOnyx.isValid(id)
    if (!validation.valid) {
      return { success: false, code: validation.code, result: { error: validation.error } }
    }

    const timestamp = Math.floor(Date.now() / 1000)
    const appidn = 'com.tagihan.listrik'
    const yyy = timestamp.toString()
    const res = plnOnyx.generateHash(appidn, id, yyy)

    if (!res.valid) {
      return { success: false, code: res.code, result: { error: res.error } }
    }

    try {
      const response = await axios.get(`${plnOnyx.api.base}${plnOnyx.api.endpoint.index}?idp=${id}&appidn=${appidn}&yyy=${yyy}&xxx=${res.hash}`, {
        headers: {
          ...plnOnyx.headers,
          'referer': `${plnOnyx.api.base}${plnOnyx.api.endpoint.index}?idp=${id}&appidn=${appidn}&yyy=${yyy}&xxx=${res.hash}`
        }
      })

      const ps = plnOnyx.parse(response.data)

      if (ps.status === 'error') {
        const ros = ps.pesan || ''
        if (ros.includes('DIBLOKIR')) {
          return { success: false, code: 403, result: { error: `Eyaa, ID Pelanggan ${id} diblokir bree.` } }
        }
        if (ros.includes('TAGIHAN SUDAH TERBAYAR')) {
          return { success: true, code: 200, result: { status: 'paid', message: `Tagihan ID Pelanggan ${id} udah dibayar bree 🤫` } }
        }
        if (ros.includes('id YANG ANDA MASUKKAN SALAH')) {
          return { success: false, code: 404, result: { error: `ID Pelanggan ${id} salah bree 🤙🏻` } }
        }
      }

      if (ps.status === 'success' && ps.data) {
        const data = ps.data
        return {
          success: true,
          code: 200,
          result: {
            customer_id: data.id_pelanggan,
            customer_name: data.nama_pelanggan,
            outstanding_balance: plnOnyx.fmt(data.jumlahtagihan),
            billing_period: data.status_periode,
            meter_reading: data.standmeteran,
            power_category: data.status_tarifdaya,
            total_bills: data.status_periode.split(',').length
          }
        }
      }

      return { success: false, code: 404, result: { error: "Error bree 😔" } }

    } catch (err) {
      return { success: false, code: err.response?.status || 400, result: { error: err.message } }
    }
  }
}