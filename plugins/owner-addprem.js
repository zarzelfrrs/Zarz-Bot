let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `⚠️ Siapa yang mau dijadikan Premium?\n\nContoh:\n${usedPrefix + command} @user 7`;

  let [target, daysStr] = text.trim().split(/\s+/);
  let who;

  // Deteksi dari reply
  if (m.quoted) {
    who = m.quoted.sender;
    daysStr = target; // kalau reply, berarti text hanya isinya angka hari
  }
  // Deteksi dari tag @
  else if (target.startsWith('@')) {
    who = target.replace(/@/, '') + '@s.whatsapp.net';
  }
  // Deteksi dari nomor langsung
  else if (/^\d{5,}$/.test(target)) {
    who = target + '@s.whatsapp.net';
  }

  if (!who) throw `⚠️ Gagal mendeteksi user. Gunakan tag, reply, atau nomor WA.\n\nContoh:\n${usedPrefix + command} @user 7`;

  if (!daysStr || isNaN(daysStr)) throw `⚠️ Masukkan jumlah hari dalam angka.\n\nContoh:\n${usedPrefix + command} @user 7`;

  const jumlahHari = parseInt(daysStr);
  const msHari = 86400000 * jumlahHari;
  const now = Date.now();

  const user = global.db.data.users[who];
  if (!user) throw `❌ Data pengguna tidak ditemukan di database.`;

  // Mengecek jika user sudah premium
  if (user.premium) {
    m.reply(`
⚠️ *Pengguna Sudah Premium!*

👤 *Nama:* ${user.name || '-'}
📆 *Durasi Aktif:* ${Math.floor((user.premiumTime - now) / 86400000)} hari
🆔 *User:* wa.me/${who.split('@')[0]}

✅ Premium tetap dipertahankan.
    `.trim());
    return;
  }

  user.premiumTime = (user.premiumTime && user.premiumTime > now)
    ? user.premiumTime + msHari
    : now + msHari;
  user.premium = true;
  user.limitprem = 10000;

  m.reply(`
👑 *PREMIUM AKTIF*

👤 *Nama:* ${user.name || '-'}
📆 *Durasi:* ${jumlahHari} hari
🆔 *User:* wa.me/${who.split('@')[0]}

✅ Premium berhasil diaktifkan!
`.trim());
};

handler.help = ['addprem @user 7', 'addprem 628xxxxx 7'];
handler.tags = ['owner'];
handler.command = /^(add|tambah|\+)p(rem)?$/i;

handler.group = false;
handler.rowner = true;

export default handler;