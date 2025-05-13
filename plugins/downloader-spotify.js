/* 
• Plugins Spotify Downloader
• Source: https://whatsapp.com/channel/0029VakezCJDp2Q68C61RH2C
• Source Scrape: https://whatsapp.com/channel/0029Vb5EZCjIiRotHCI1213L
*/

import axios from 'axios';

const handler = async (m, { conn, args }) => {
  const text = args[0];

  if (!text) {
    return m.reply('Contoh: .spotify https://open.spotify.com/track/xxxx atau langsung paste track ID-nya');
  }

  await conn.sendMessage(m.chat, {
    react: {
      text: "⏱️",
      key: m.key
    }
  });

  const result = await spotiDown(text);

  if (!result.status) {
    return m.reply(result.result.error);
  }

  const { title, artist, album, duration, image, download, trackId } = result.result;
  const caption =
    `\`S P O T I F Y - A U D I O\`\n\n` +
    `🎵 *Title:* ${title}\n` +
    `🧑‍🎤 *Artist:* ${artist}\n` +
    `💿 *Album:* ${album}\n` +
    `⏱️ *Duration:* ${duration}`;

  try {
    const audioRes = await axios.get(download, { responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'Spotify 🧸',
          thumbnailUrl: image,
          sourceUrl: `https://open.spotify.com/track/${trackId}`,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: Buffer.from(audioRes.data),
      mimetype: 'audio/mp4',
      fileName: `${artist} - ${title}.mp3`,
      ptt: false
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('Gagal ngirim audio. Coba lagi nanti.');
  }
};

handler.command = ['spotifydl', 'spotify'];
handler.help = ['spotify <link/id>'];
handler.tags = ['downloader'];
handler.limit = true;

export default handler;

async function spotiDown(url) {
  const extractId = (input) => {
    const patterns = [
      /spotify\.com\/track\/([a-zA-Z0-9]{22})/,
      /spotify:track:([a-zA-Z0-9]{22})/,
      /^([a-zA-Z0-9]{22})$/
    ];
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const trackId = extractId(url);
  if (!trackId) {
    return {
      status: false,
      code: 400,
      result: {
        error: !url
          ? "Linknya mananya anjirr? kosong gitu inputnya 🗿"
          : "Format linknya kagak valid bree 😑"
      }
    };
  }

  const fullUrl = `https://open.spotify.com/track/${trackId}`;

  try {
    const response = await axios.post(
      'https://parsevideoapi.videosolo.com/spotify-api/',
      { format: 'web', url: fullUrl },
      {
        headers: {
          'authority': 'parsevideoapi.videosolo.com',
          'user-agent': 'Postify/1.0.0',
          'referer': 'https://spotidown.online/',
          'origin': 'https://spotidown.online'
        }
      }
    );

    const { status, data } = response.data;

    if (status === "-4") {
      return {
        status: false,
        code: 400,
        result: {
          error: "Linknya kagak valid bree, cuman bisa download track doang euy 😂"
        }
      };
    }

    const meta = data?.metadata;
    if (!meta || Object.keys(meta).length === 0) {
      return {
        status: false,
        code: 404,
        result: {
          error: "Metadata kosong bree, coba ganti linknya yak!"
        }
      };
    }

    return {
      status: true,
      code: 200,
      result: {
        title: meta.name,
        artist: meta.artist,
        album: meta.album,
        duration: meta.duration,
        image: meta.image,
        download: meta.download,
        trackId
      }
    };
  } catch (error) {
    return {
      status: false,
      code: error.response?.status || 500,
      result: {
        error: "Gagal ambil data tracknya bree 🙈"
      }
    };
  }
}