import axios from 'axios'
import qs from 'qs'
import *as cheerio from 'cheerio'
import FormData from 'form-data'

async function ephoto(text1, text2) {
  let formData = new FormData()
  let url = 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html'

  let res = await axios.get(url, {
    headers: {
      'user-agent': 'Mozilla/5.0'
    }
  })

  let $ = cheerio.load(res.data)
  let token = $('input[name=token]').val()
  let buildServer = $('input[name=build_server]').val()
  let buildServerId = $('input[name=build_server_id]').val()

  formData.append('text[]', text1)
  formData.append('text[]', text2)
  formData.append('token', token)
  formData.append('build_server', buildServer)
  formData.append('build_server_id', buildServerId)

  let post = await axios.post(url, formData, {
    headers: {
      ...formData.getHeaders(),
      'cookie': res.headers['set-cookie']?.join('; ')
    }
  })

  let $$ = cheerio.load(post.data)
  let formValue = JSON.parse($$('input[name=form_value_input]').val())
  const body = qs.stringify(formValue, { arrayFormat: 'brackets' })

  const hasil = await axios.post('https://en.ephoto360.com/effect/create-image', body, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': res.headers['set-cookie']?.join('; '),
      'x-requested-with': 'XMLHttpRequest',
      'referer': url
    }
  })

  return buildServer + hasil.data.image
}

let handler = async (m, { conn, args }) => {
  if (args.length < 2) return m.reply('Penggunaan: .deadpologo teks1 teks2')

  let [text1, text2] = args

  try {
    let imageUrl = await ephoto(text1, text2)
    let caption = `*Deadpol Logo*\n\nText1: ${text1}\nText2: ${text2}`
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    m.reply('Gagal membuat gambar. Silakan coba lagi nanti.')
  }
}

handler.help = ['deadpologo']
handler.tags = ['tools']
handler.command = /^deadpologo$/i
handler.limit = false

export default handler