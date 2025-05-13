// plugins/lemonmail.js
import axios from 'axios';

async function lemonmail(target, subject, message) {
  const data = {
    to: target,
    subject: subject,
    message: message
  };

  const config = {
    method: 'POST',
    url: 'https://lemon-email.vercel.app/send-email',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
      'Content-Type': 'application/json',
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?1',
      'origin': 'https://lemon-email.vercel.app',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://lemon-email.vercel.app/',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'priority': 'u=1, i'
    },
    data: JSON.stringify(data)
  };

  const response = await axios.request(config);
  return response.data;
}

let handler = async (m, { text }) => {
  if (!text.includes('|')) throw '⚠️ Format salah!\n\nContoh:\n.kirimmail target@gmail.com Judul|Isi pesan';
  const [targetAndSubject, ...msgParts] = text.split('|');
  const [email, ...subjectParts] = targetAndSubject.trim().split(' ');
  const subject = subjectParts.join(' ');
  const message = msgParts.join('|');

  if (!email || !subject || !message) {
    throw '⚠️ Format tidak lengkap!\n\nContoh:\n.lemonmail target@gmail.com Judul|Isi pesan';
  }

  try {
    const res = await lemonmail(email, subject, message);
    m.reply(`✅ *Email Berhasil Dikirim!*\n\n📩 *Kepada:* ${email}\n📝 *Subjek:* ${subject}\n\n📬 Status: ${res.status || 'Terkirim'}`);
  } catch (e) {
    m.reply(`❌ *Gagal mengirim email!*\n\n🛑 Error:\n${e.message}`);
  }
};

handler.help = ['kirimmail <email> <subjek>|<pesan>'];
handler.tags = ['tools'];
handler.command = /^kirimmail$/i;

export default handler;