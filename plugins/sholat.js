const fetch = require('node-fetch');

module.exports = {
  name: 'sholat',
  description: 'Lihat jadwal sholat',
  async execute(m, { text }) {
    if (!text) return m.reply('Masukkan nama kota!');
    let res = await fetch(`https://api.myquran.com/v1/sholat/jadwal/harian?lokasi=${encodeURIComponent(text)}`);
    let json = await res.json();
    if (!json.status) return m.reply('Gagal ambil data!');
    let j = json.data.jadwal;
    m.reply(`Jadwal Sholat di ${json.data.lokasi}:
- Subuh: ${j.subuh}
- Dzuhur: ${j.dzuhur}
- Ashar: ${j.ashar}
- Maghrib: ${j.maghrib}
- Isya: ${j.isya}`);
  }
}