let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, isPrems }) => {
  // Tentukan apakah perintah ini mengaktifkan atau menonaktifkan fitur
  const isEnable = /true|enable|(turn)?on|1/i.test(command);
  
  // Ambil data percakapan dan pengguna
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};

  // Tentukan jenis perintah berdasarkan argumen pertama
  const type = (args[0] || '').toLowerCase();

  // Variabel untuk fitur yang ingin diaktifkan
  let isAll = false, isUser = false;

  // Fungsi untuk memverifikasi jika admin atau owner yang mengakses fitur
  const verifyAdminOrOwner = () => {
    if (!isAdmin && !isOwner) {
      global.dfail('admin', m, conn);
      throw false;
    }
  };

  // Fungsi untuk memverifikasi jika owner yang mengakses fitur
  const verifyOwner = () => {
    if (!isOwner) {
      global.dfail('owner', m, conn);
      throw false;
    }
  };

  switch (type) {
    case 'welcome':
    case 'lah':
    case 'detect':
    case 'delete':
    case 'viewonce':
    case 'desc':
    case 'antidelete':
    case 'autodelvn':
    case 'document':
    case 'bcjoin':
    case 'antilink':
    case 'antigrup':
    case 'antigrupkick':
    case 'antifoto':
    case 'antivideo':
    case 'antiaudio':
    case 'antisticker':
    case 'antibot':
    case 'simi':
    case 'antivirtex':
    case 'autoig':
    case 'chatbot':
    case 'autoai':
    case 'autosticker':
    case 'detekporn':
    case 'autojoin':
    case 'autoupnews':
    case 'autoupnime':
      if (m.isGroup) verifyAdminOrOwner(); // Hanya admin atau owner yang bisa mengubah pengaturan grup
      chat[type] = isEnable; // Aktifkan atau nonaktifkan fitur sesuai perintah
      break;
    case 'clear':
      isAll = true;
      verifyOwner(); // Hanya owner yang bisa melakukan ini
      bot.clear = isEnable;
      break;
    case 'public':
      isAll = true;
      if (!isROwner) verifyOwner(); // Hanya ROwner yang bisa mengubah ini
      global.opts['self'] = !isEnable;
      break;
    case 'restrict':
      isAll = true;
      verifyOwner(); // Hanya owner yang bisa melakukan ini
      bot.restrict = isEnable;
      break;
    case 'mycontact':
    case 'whitelistcontact':
      verifyOwner(); // Hanya owner yang bisa mengubah pengaturan whitelist
      conn.callWhitelistMode = isEnable;
      break;
    case 'autolevelup':
      isUser = true;
      user.autolevelup = isEnable;
      break;
    case 'getmsg':
      if (m.isGroup) verifyAdminOrOwner(); // Hanya admin atau owner yang bisa mengubah pengaturan ini
      chat.getmsg = isEnable;
      break;
    case 'swonly':
    case 'statusonly':
    case 'pconly':
    case 'gconly':
    case 'adminonly':
      isAll = true;
      verifyOwner(); // Hanya ROwner yang bisa mengubah ini
      global.opts[type] = isEnable;
      break;
    default:
      // Tampilkan fitur yang aktif di grup
      const activeCommands = [];
      const featureList = [
        'welcome', 'lah', 'detect', 'delete', 'viewonce', 'desc', 'antidelete', 'autodelvn', 'document',
        'bcjoin', 'antilink', 'antigrup', 'antigrupkick', 'antifoto', 'antivideo', 'antiaudio', 'antisticker',
        'antibot', 'simi', 'antivirtex', 'autoig', 'chatbot', 'autoai', 'autosticker', 'detekporn', 'autojoin',
        'autoupnews', 'autoupnime', 'autolevelup', 'getmsg'
      ];

      // Memasukkan fitur yang aktif ke dalam array activeCommands
      featureList.forEach(cmd => {
        if (chat[cmd]) activeCommands.push(`✅ ${cmd}`);
      });

      // Jika tidak ada fitur aktif
      if (activeCommands.length === 0) activeCommands.push('Tidak ada fitur yang diaktifkan.');

      await m.reply(`
Fitur yang aktif di chat ini:
${activeCommands.join('\n')}

List Option:

❏ *ADMIN COMMAND* ❏
${['antilink', 'antigrup', 'antigrupkick', 'antitoxic', 'antibadword', 'autodelvn', 'antifoto', 'antivideo', 'antiaudio', 'antisticker', 'antivirtex', 'restrict', 'welcome', 'autolevelup', 'simi', 'autoai', 'chatbot'].map(cmd => `⩽⩾ ${cmd}`).join('\n')}

❏ *OWNER COMMAND* ❏
${['autobackup', 'autocleartmp', 'autoread', 'autobio', 'composing', 'gconly', 'pconly', 'self', 'public', 'swonly', 'anticall'].map(cmd => `⩽⩾ ${cmd}`).join('\n')}

Contoh Aktif: .on welcome
Untuk Mengaktifkan

Contoh Nonaktif: .off welcome
Untuk Menonaktifkan
`.trim());
      throw false;
  }
  
  m.react('✅');
}

handler.help = ['on', 'off']
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
handler.owner = true;

export default handler;