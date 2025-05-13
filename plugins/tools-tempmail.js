import axios from 'axios'

class TempMail {
  constructor() {
    this.cookie = null
    this.baseUrl = 'https://tempmail.so'
  }

  async updateCookie(response) {
    if (response.headers['set-cookie']) {
      this.cookie = response.headers['set-cookie'].join('; ')
    }
  }

  async makeRequest(url) {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        cookie: this.cookie || '',
        referer: this.baseUrl + '/',
        'x-inbox-lifespan': '600',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'sec-ch-ua-mobile': '?1'
      }
    })

    await this.updateCookie(response)
    return response
  }

  async initialize() {
    const response = await axios.get(this.baseUrl, {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"'
      }
    })
    await this.updateCookie(response)
    return this
  }

  async getInbox() {
    const url = `${this.baseUrl}/us/api/inbox?requestTime=${Date.now()}&lang=us`
    const response = await this.makeRequest(url)
    return response.data
  }

  async getMessage(messageId) {
    const url = `${this.baseUrl}/us/api/inbox/messagehtmlbody/${messageId}?requestTime=${Date.now()}&lang=us`
    const response = await this.makeRequest(url)
    return response.data
  }
}

const mailSessions = new Map()

async function startChecking(conn, m, mail) {
  const chatId = m.chat

  if (mailSessions.has(chatId)) {
    return m.reply('⚠️ Temp Mail sudah aktif di sesi ini.')
  }

  let lastMessageId = null
  const interval = setInterval(async () => {
    try {
      const inbox = await mail.getInbox()
      const latest = inbox.data?.inbox?.[0]

      if (latest && latest.id !== lastMessageId) {
        lastMessageId = latest.id

        let raw = await mail.getMessage(latest.id)
        let message = ''

        if (typeof raw === 'object' && raw.data?.html) {
          message = raw.data.html.replace(/<[^>]+>/g, '').trim()
        } else {
          message = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2)
        }

        await conn.sendMessage(m.chat, {
          text: `📬 *Email Baru Masuk!*\n\n*Dari:* ${latest.from}\n*Subjek:* ${latest.subject}\n\n📝 *Isi Pesan:*\n${message}`
        })

        clearInterval(interval)
        mailSessions.delete(chatId)
      }
    } catch (e) {
      console.error('Error checking inbox:', e.message)
    }
  }, 5000)

  mailSessions.set(chatId, interval)
}

const handler = async (m, { conn, command }) => {
  const chatId = m.chat

  if (/^stopmail$/i.test(command)) {
    if (mailSessions.has(chatId)) {
      clearInterval(mailSessions.get(chatId))
      mailSessions.delete(chatId)
      return m.reply('🛑 Sesi Temp Mail dihentikan.')
    } else {
      return m.reply('❌ Tidak ada sesi Temp Mail aktif.')
    }
  }

  try {
    const mail = new TempMail()
    await mail.initialize()
    const inbox = await mail.getInbox()

    if (!inbox.data || !inbox.data.name) {
      return m.reply('❌ Gagal mendapatkan email sementara. Coba lagi.')
    }

    const email = inbox.data.name
    const inboxCount = inbox.data?.inbox?.length || 0

    await conn.sendMessage(m.chat, {
      text: `📩 *TEMP MAIL AKTIF!*  
✉ Email: *${email}*  
📬 Inbox: *${inboxCount}* pesan  
⏳ Menunggu pesan baru...

Ketik *.stopmail* untuk menghentikan sesi.`
    })

    await startChecking(conn, m, mail)
  } catch (e) {
    console.error(e)
    m.reply('🚨 Terjadi kesalahan saat membuat temp mail!')
  }
}

handler.help = ['tempmail', 'stopmail']
handler.tags = ['tools']
handler.command = /^tempmail|stopmail$/i

export default handler