/*
📌 Nama Fitur: TikTok Search
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
✍️ Convert By ZenzXD 
*/

import axios from "axios";

const searchCache = new Map(); // Simpan hasil pencarian sementara (berdasarkan user)

const tiktokSearch = async (query) => {
  try {
    if (!query) return { status: "error", message: "Query tidak boleh kosong!" };

    const apiUrl = `https://www.velyn.biz.id/api/search/tiktoksearch?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data.length) return { status: "error", message: "Video tidak ditemukan!" };

    return { status: "success", results: data.data };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const handler = async (m, { conn, text, args, command }) => {
  const isNext = command === 'nextvideo';
  let query, index;

  if (isNext) {
    query = args.slice(0, -1).join(" ");
    index = parseInt(args[args.length - 1]);
  } else {
    query = text;
    index = 0;
  }

  if (!query) return m.reply("⚠️ Masukkan kata kunci pencarian!\n\nContoh: `.tiktoksearch tobrut besar`");

  try {
    if (!isNext) {
      await conn.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });
    }

    let cacheKey = `${m.sender}:${query}`;
    let result;

    if (searchCache.has(cacheKey)) {
      result = searchCache.get(cacheKey);
    } else {
      result = await tiktokSearch(query);
      if (result.status !== "success") return m.reply("❌ Tidak ditemukan hasil untuk pencarian tersebut.");
      searchCache.set(cacheKey, result);
      setTimeout(() => searchCache.delete(cacheKey), 5 * 60 * 1000); // Hapus cache 5 menit
    }

    const videos = result.results;
    if (index >= videos.length) return m.reply("✅ Sudah mencapai akhir video.");

    const vid = videos[index];
    const caption = `🎬 *Judul:* ${vid.title}\n🔗 *Link:* ${vid.link}\n👁️ *Views:* ${vid.views}\n❤️ *Likes:* ${vid.likes}\n💬 *Comments:* ${vid.comments}\n📤 *Shares:* ${vid.shares}\n📥 *Downloads:* ${vid.downloads}`;
    const videoUrl = vid.no_watermark || vid.watermark;

    const buttons = (index < videos.length - 1)
      ? [
          {
            buttonId: `.nextvideo ${query} ${index + 1}`,
            buttonText: { displayText: '➡️ Next Video' },
            type: 1
          }
        ]
      : [];

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption,
      footer: `Video ${index + 1} dari ${videos.length}`,
      buttons,
      headerType: 5
    }, { quoted: m });

    if (!isNext) {
      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    }

  } catch (error) {
    console.error(error);
    m.reply("⚠️ Terjadi kesalahan, coba lagi nanti.");
  }
};

handler.command = /^tiktoksearch|nextvideo$/i;
handler.help = ["tiktoksearch <query>"];
handler.tags = ["search"];

export default handler;