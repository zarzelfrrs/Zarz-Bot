import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args.length) {
    return m.reply('Penggunaan: *spotifyplay [judul lagu]*');
  }

  let query = args.join(' ');
  let apiUrl = `https://velyn.biz.id/api/search/spotify?query=${encodeURIComponent(query)}`;

  try {
    let res = await fetch(apiUrl);
    let json = await res.json();

    if (!json.status || !json.data.length) {
      return m.reply('Tidak ditemukan lagu yang cocok dengan pencarian.');
    }

    let track = json.data[0];
    let { name, artists, link, image, duration_ms } = track;
    let [min, sec] = [Math.floor(duration_ms / 60000), Math.floor((duration_ms % 60000) / 1000)];
    let duration = `${min}:${sec.toString().padStart(2, '0')}`;

    const pkg = await import('canvafy');
    const { Spotify } = pkg.default || pkg;

    let trackRes = await fetch(`https://api.nekorinn.my.id/downloader/spotify?url=${link}`);
    let trackJson = await trackRes.json();
    let { downloadUrl } = trackJson.result;

    let durationMs = duration_ms;

    let buffer = await new Spotify()
      .setAuthor(artists)
      .setAlbum("Spotify Music")
      .setTitle(name)
      .setImage(image)
      .setTimestamp(1000, durationMs)
      .setBlur(1)
      .setOverlayOpacity(0.8)
      .build();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `🎶 *Spotify Music* 🎶

🎧 *${name}* oleh *${artists}*
⏱️ Durasi: ${duration}
🔗 Dengar di Spotify: ${link}

*Audio akan dikirim segera...*`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: artists,
          thumbnailUrl: image,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: link
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: artists,
          thumbnailUrl: image,
          mediaUrl: link,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.help = ['spotifyplay', 'spotplay'];
handler.tags = ['downloader'];
handler.command = /^spotifyplay|spotplay$/i;

export default handler;