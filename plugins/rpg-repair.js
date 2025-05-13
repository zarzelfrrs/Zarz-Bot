let handler = async (m, { conn, args, command }) => {
  let type = (args[0] || '').toLowerCase();
  let user = global.db.data.users[m.sender];

  // Pastikan semua properti user terdefinisi
  user.pickaxe = user.pickaxe || 0;
  user.pedang = user.pedang || 0;
  user.fishingrod = user.fishingrod || 0;
  user.pickaxedurability = user.pickaxedurability || 100;
  user.sworddurability = user.sworddurability || 100;
  user.armordurability = user.armordurability || 100;
  user.diamond = user.diamond || 0;
  user.rock = user.rock || 0;
  user.wood = user.wood || 0;
  user.iron = user.iron || 0;

  let repairMenu = `
*「 REPAIR 」*
▧ *Pickaxe* 
〉 5 Kayu, 3 Batu, 3 Iron, 1 Diamond
▧ *Sword* 
〉 5 Kayu, 9 Iron, 1 Diamond
▧ *Armor* 
〉 15 Iron, 3 Diamond
Gunakan: *repair <item>*`;

  try {
    if (/repair/i.test(command)) {
      switch (type) {
        case 'pickaxe':
          if (user.pickaxedurability >= 100) return m.reply('Pickaxe kamu tidak memiliki kerusakan.');
          if (user.pickaxe === 0) return m.reply('Kamu belum memiliki Pickaxe.');
          if (user.diamond < 1 || user.rock < 3 || user.wood < 5 || user.iron < 3) 
            return m.reply('Bahan tidak cukup untuk memperbaiki Pickaxe.');
          user.rock -= 3;
          user.wood -= 5;
          user.iron -= 3;
          user.diamond -= 1;
          user.pickaxedurability = 100;
          m.reply('Pickaxe berhasil diperbaiki.');
          break;

        case 'sword':
          if (user.sworddurability >= 100) return m.reply('Sword kamu tidak memiliki kerusakan.');
          if (user.pedang === 0) return m.reply('Kamu belum memiliki Sword.');
          if (user.diamond < 1 || user.wood < 5 || user.iron < 9) 
            return m.reply('Bahan tidak cukup untuk memperbaiki Sword.');
          user.wood -= 5;
          user.iron -= 9;
          user.diamond -= 1;
          user.sworddurability = 100;
          m.reply('Sword berhasil diperbaiki.');
          break;

        case 'armor':
          if (user.armordurability >= 100) return m.reply('Armor kamu tidak memiliki kerusakan.');
          if (!user.armor) return m.reply('Kamu belum memiliki Armor.');
          if (user.diamond < 3 || user.iron < 15) 
            return m.reply('Bahan tidak cukup untuk memperbaiki Armor.');
          user.iron -= 15;
          user.diamond -= 3;
          user.armordurability = 100;
          m.reply('Armor berhasil diperbaiki.');
          break;

        default:
          m.reply(repairMenu);
      }
    }
  } catch (err) {
    m.reply("Terjadi kesalahan: " + err.message);
  }
};

handler.help = ['repair'];
handler.tags = ['rpg'];
handler.command = /^(repair)$/i;

export default handler;