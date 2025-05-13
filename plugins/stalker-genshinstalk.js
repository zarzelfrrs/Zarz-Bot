import axios from 'axios';

const characterMap = {
  10000007: 'Traveler (Anemo)', 10000005: 'Traveler (Geo)', 10000021: 'Amber', 10000022: 'Barbara',
  10000023: 'Beidou', 10000024: 'Bennett', 10000025: 'Chongyun', 10000026: 'Diluc', 10000027: 'Fischl',
  10000028: 'Jean', 10000029: 'Kaeya', 10000030: 'Keqing', 10000031: 'Lisa', 10000032: 'Mona',
  10000033: 'Ningguang', 10000034: 'Noelle', 10000035: 'Qiqi', 10000036: 'Razor', 10000037: 'Sucrose',
  10000038: 'Venti', 10000039: 'Xiangling', 10000040: 'Xingqiu', 10000041: 'Xinyan', 10000042: 'Zhongli',
  10000043: 'Xiao', 10000044: 'Hu Tao', 10000045: 'Kazuha', 10000046: 'Ayaka', 10000047: 'Yoimiya',
  10000048: 'Sayu', 10000049: 'Raiden Shogun', 10000050: 'Kokomi'
};

async function genshinStalk(uid) {
  const url = `https://enka.network/api/uid/${uid}`;
  return axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(({ data }) => {
    if (!data || !data.playerInfo) throw new Error('Data tidak ditemukan');
    const { playerInfo } = data;
    return {
      uid: data.uid,
      nickname: playerInfo.nickname,
      level: playerInfo.level,
      nameCardId: playerInfo.nameCardId,
      avatar: characterMap[playerInfo.profilePicture?.avatarId] || `Unknown (${playerInfo.profilePicture?.avatarId})`,
      characters: playerInfo.showAvatarInfoList?.map(char => ({
        id: char.avatarId,
        name: characterMap[char.avatarId] || `Unknown (${char.avatarId})`,
        level: char.level,
        costumeId: char.costumeId || null
      })) || []
    };
  });
}

const handler = async (m, { text }) => {
  if (!text) {
    return m.reply('*Contoh:* .genshin 700848879');
  }

  try {
    const result = await genshinStalk(text);
    const { nickname, level, avatar, characters } = result;

    let message = `📊 *Profil Genshin Impact*\n`;
    message += `👤 *Nickname:* ${nickname}\n`;
    message += `⚔️ *Level:* ${level}\n`;
    message += `🖼️ *Avatar:* ${avatar}\n`;
    message += `👾 *Karakter:* \n`;

    characters.forEach(char => {
      message += `- ${char.name} (Lvl ${char.level})\n`;
    });

    m.reply(message);
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat mengambil data.');
  }
};

handler.help = ['genshinstalk <uid>'];
handler.tags = ['stalker'];
handler.command = ['genshinstalk'];

export default handler;