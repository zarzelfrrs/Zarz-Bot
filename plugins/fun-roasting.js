import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  const orang = m.mentionedJid?.[0]
    || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

  if (!orang) {
    return m.reply('Tag orang atau ketik nomornya, contoh: *.roast @user* atau *.roast 628xxxx*');
  }

  let ppthumb;
  try {
    ppthumb = await conn.profilePictureUrl(orang, 'image');
  } catch {
    ppthumb = 'https://telegra.ph/file/3e1f0d2993d09ea4a5fc2.jpg'; // Fallback gambar
  }

  const roastList = [
    `@user, kadang gue mikir, kamu tuh kayak sinyal 1 bar di tengah hutan—nggak berguna tapi selalu muncul pas gak dibutuhin.`,
    `@user, lu tuh kayak charger 15 ribuan—bisa dipake, tapi bikin panas dan ngerusak semuanya.`,
    `@user, kalau otak kamu dijual di marketplace, kemungkinan besar masuk kategori "rusak parah, dijual kiloan".`,
    `@user, kamu kayak WiFi tetangga—kelihatan tapi nggak bisa dipake. Ngeselin banget!`,
    `@user, kalau ngomong tuh kayak lagu remix—banyak noise tapi gak jelas maksudnya.`,
    `@user, kamu itu bukan toxic sih, tapi lebih kayak limbah beracun yang seharusnya dikarantina 40 tahun.`,
    `@user, gaya hidupmu tuh kayak skripsi anak semester 9—jalan di tempat, banyak alasan, hasil nol.`,
    `@user, lu tuh kayak CAPTCHA yang gak bisa ditebak, cuma nyusahin orang doang.`,
    `@user, kalau jadi karakter game, kamu tuh pasti NPC yang ngasih misi gagal dari awal.`,
    `@user, jujur aja... tiap kamu buka mulut, IQ ruangan turun 10 poin.`,
    `@user, muka kamu tuh kayak error 404—nggak ketemu solusinya, bikin stres.`,
    `@user, kalau jadi hewan, kamu pasti masuk kategori hewan mitos, soalnya gak ada yang ngerti eksistensimu.`,
    `@user, kamu tuh kayak alarm jam 5 pagi pas libur—gak penting, cuma ganggu tidur orang.`,
    `@user, IQ kamu tuh kayak ping server merah—tinggi banget tapi gak berguna.`,
    `@user, lu tuh kayak file corrupt—dibuka bikin kesel, dihapus sayang kuota.`,
    `@user, kalau ada lomba jadi beban, lu pasti juara bertahan 5 tahun berturut-turut.`,
    `@user, jokes kamu tuh kayak sinetron azab—maksa, basi, tapi tetep aja nongol.`,
    `@user, ngomong sama lu tuh kayak ngisi CAPTCHA terus gagal, muter-muter gak jelas.`,
    `@user, kalau ketawa lu direkam, bisa dipake buat usir tuyul.`,
    `@user, gaya kamu tuh kayak intro YouTuber 2012—lebay, norak, dan pengen skip.`,
    `@user, lu tuh kayak charger rusak—bisa nyambung tapi nyetrum perasaan orang.`,
    `@user, setiap kamu muncul, vibes-nya kayak error di Windows—tiba-tiba, bikin panik, dan nyusahin.`,
    `@user, kamu itu kayak sandi WiFi yang udah nggak aktif—masih diingat, tapi udah gak guna.`,
    `@user, kamu tuh kayak grup WA keluarga—rame, tapi gak ada faedahnya.`,
    `@user, kalau jadi app, kamu pasti butuh update tiap hari tapi tetep nge-lag.`,
    `@user, tampangmu kayak file zip, kecil tapi isinya berat semua.`,
    `@user, vibes kamu kayak baterai 1%—mau dimanfaatin aja orang males.`,
    `@user, kalau lu jadi sinetron, pasti judulnya *“Anak Durhaka Gagal Update Otak.”*`,
    `@user, lu tuh kayak file download-an gagal—udah nunggu lama, eh error juga.`,
    `@user, otak lu kayak server gratis—down terus tiap dibutuhin.`,
    `@user, kalo jadi emoji, lu tuh pasti "buffering".`,
    `@user, IQ lu kayak koneksi WiFi publik—semua bisa pake, tapi nggak bisa diandalkan.`,
    `@user, tiap kali lu ngomong, grammar dunia ikut menangis.`,
    `@user, kalo jadi film, lu dapet rating 1 bintang dari netizen dan makhluk halus.`,
    `@user, jokes kamu tuh kayak status Facebook 2010—garing, jadul, dan bikin malu.`
  ];

  const roastText = roastList[Math.floor(Math.random() * roastList.length)].replace(/@user/g, `@${orang.split('@')[0]}`);

  try {
    await conn.sendMessage(orang, {
      text: roastText,
      mentions: [orang],
      contextInfo: {
        externalAdReply: {
          title: `Z E N Z  -  A  I`,
          body: `jangan baper yak 🤭`,
          thumbnailUrl: ppthumb,
          sourceUrl: 'https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N' // ganti kalau ada link saluran
        }
      }
    });
  } catch (error) {
    console.error("Error saat mengirim pesan:", error);
    m.reply('Terjadi kesalahan saat mengirim roast, coba lagi nanti.');
  }
};

handler.help = ['roast @user | 628xxxx'];
handler.tags = ['fun'];
handler.command = /^(roast|roasting)$/i;
handler.limit = true;

export default handler;