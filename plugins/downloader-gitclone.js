const handledMessages = new Set()

const handler = async (m, { conn, text }) => {
  if (handledMessages.has(m.key.id)) return
  handledMessages.add(m.key.id)

  if (!text || !/^https:\/\/github\.com\//i.test(text)) {
    return m.reply('Masukkan link GitHub yang valid!\nContoh: .gitclone https://github.com/DavidModzz/BaileysWaBot');
  }

  try {
    const apiUrl = `https://api.nekorinn.my.id/downloader/github-clone?url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl?.zip) {
      return m.reply('Gagal mengambil data dari GitHub!');
    }

    const { metadata, downloadUrl } = json.result;
    const filename = `${metadata.name || 'repo'}.zip`;

    const caption = `📦 *GitHub Clone*\n\n` +
      `*📁 Nama:* ${metadata.fullName}\n` +
      `*📝 Deskripsi:* ${metadata.description || '-'}\n` +
      `*⭐ Stars:* ${metadata.stars} | 🍴 Forks:* ${metadata.forks}\n` +
      `*📅 Dibuat:* ${metadata.createdAt}\n` +
      `*🔄 Terakhir Diperbarui:* ${metadata.updatedAt}\n` +
      `*🔗 Repo:* ${metadata.repoUrl}`;

    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl.zip },
      fileName: filename,
      mimetype: 'application/zip',
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat memproses permintaan!');
  }
};

handler.help = ['gitclone <link github>'];
handler.tags = ['downloader'];
handler.command = /^gitclone$/i;

export default handler;