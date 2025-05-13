import axios from 'axios';

const handler = async (m, { text }) => {
  if (!text) {
    throw '*Contoh:* .ttstalk mrbeast';
  }

  try {
    const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(text)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data || !data.data || !data.data.user) {
      return m.reply('⚠️ Gagal mengambil data profil TikTok.');
    }

    const { user, stats } = data.data;
    const { uniqueId, nickname, signature, avatarLarger, region } = user;
    const { followerCount, followingCount, heart, videoCount } = stats;

    let replyText = `*Info Profil TikTok:*\n\n`;
    replyText += `- *Username:* ${uniqueId}\n`;
    replyText += `- *Nickname:* ${nickname}\n`;
    replyText += `- *bio:* ${signature}\n`;
    replyText += `- *Region:* ${region}\n`;
    replyText += `- *Followers:* ${followerCount}\n`;
    replyText += `- *Following:* ${followingCount}\n`;
    replyText += `- *Total Likes (Hearts):* ${heart}\n`;
    replyText += `- *Total Videos:* ${videoCount}\n\n`;
    replyText += `🔗 *Profile URL:* https://www.tiktok.com/@${uniqueId}\n`;

    m.reply(replyText, null, { thumbnail: avatarLarger });
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat mengambil data.');
  }
};

handler.help = ['ttstalk <username>'];
handler.tags = ['stalker'];
handler.command = ['ttstalk'];

export default handler;