/*
📌 Nama Fitur: Jadwal Sholat
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 Scrape: https://whatsapp.com/channel/0029VadfVP5ElagswfEltW0L/2571
✍️ Convert By ZenzXD
*/

import axios from 'axios';

const handler = async (m, { text }) => {
  if (!text) {
    return m.reply('Masukkan nama kota. Contoh:\n\n*.jadwalsholat jakarta*');
  }

  try {
    
    const resKota = await axios.get('https://api.myquran.com/v2/sholat/kota/semua');
    const kota = resKota.data.data.find(k =>
      k.lokasi.toLowerCase().includes(text.toLowerCase())
    );

    if (!kota) return m.reply('Kota tidak ditemukan. Pastikan penulisan sudah benar.');

    const idKota = kota.id;
    const lokasi = kota.lokasi;

   
    const now = new Date();
    const tahun = now.getFullYear();
    const bulan = String(now.getMonth() + 1).padStart(2, '0');
    const tanggal = String(now.getDate()).padStart(2, '0');

    
    const url = `https://api.myquran.com/v2/sholat/jadwal/${idKota}/${tahun}/${bulan}/${tanggal}`;
    const resJadwal = await axios.get(url);
    const jadwal = resJadwal.data.data.jadwal;

    let hasil = `*───〔  🕌 Jadwal Sholat Hari Ini 〕───*\n`;
    hasil += `📍 *Wilayah:* ${lokasi}\n📅 *Tanggal:* ${jadwal.tanggal}\n\n`;
    hasil += `⏰ *Imsak*   : ${jadwal.imsak}\n`;
    hasil += `🌅 *Subuh*   : ${jadwal.subuh}\n`;
    hasil += `🌄 *Terbit*  : ${jadwal.terbit}\n`;
    hasil += `🌤️ *Dhuha*   : ${jadwal.dhuha}\n`;
    hasil += `☀️ *Dzuhur*  : ${jadwal.dzuhur}\n`;
    hasil += `🌇 *Ashar*   : ${jadwal.ashar}\n`;
    hasil += `🌆 *Maghrib* : ${jadwal.maghrib}\n`;
    hasil += `🌃 *Isya*    : ${jadwal.isya}\n`;
    hasil += `\nSemoga ibadahmu berkah hari ini.`;

    m.reply(hasil);
  } catch (err) {
    console.error('ERROR jadwalsholat:', err);
    m.reply('Terjadi kesalahan saat mengambil data. Coba lagi nanti.');
  }
};

handler.command = ['jadwalsholat'];
handler.tags = ['islami'];
handler.help = ['jadwalsholat'];

export default handler;