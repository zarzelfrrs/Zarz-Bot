let handler = m => m;

handler.before = async function(m, { conn, participants }) {
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    };
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (!m.isGroup || conn.danil_join.time > currentTime) {
    return;
  }

  // Masukin nomor owner yang mau dicek di sini
  const ownerNumbers = [
    '6287823745178@s.whatsapp.net', // contoh nomor owner
    // bisa tambah lagi kalau mau, misal:
    // '6281234567890@s.whatsapp.net',
  ];

  if (!ownerNumbers.includes(m.sender)) return;

  const messageText = `kamu kemana aja? aku kangen tau`;
  const imageUrl = "https://files.catbox.moe/h3njeb.jpg";
  const linkUrl = "https://zenz-profile-m7ohntkfq-zenzxds-projects.vercel.app/";

  await conn.sendMessage(m.chat, {
    text: messageText,
    contextInfo: {
      externalAdReply: {
        title: 'Owner Datang!',
        body: 'Ayo Bergabung dan Cek Kejutannya!',
        thumbnailUrl: imageUrl,
        sourceUrl: linkUrl,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true,
      }
    }
  }, {
    quoted: m,
  });

  conn.danil_join = {
    join: true,
    time: currentTime + 1800, // 30 menit
  };
};

export default handler;