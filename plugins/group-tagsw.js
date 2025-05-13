const handler = async (m, { conn, text, quoted }) => {
  let [id, ...teksArray] = text.trim().split(' ');
  let teks = teksArray.join(' ');

  if (!id || !teks) {
    return m.reply(`Example: *.tagsw <group_id> Hello*\n\n> Note: reply media, jika tidak ada media maka status akan berupa teks`);
  }

  const BackgroundColor = [
    '#f68ac9', '#6cace4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0',
    '#0d47a1', '#03a9f4', '#9e9e9e', '#ff9800', '#000000', '#ffffff',
    '#008080', '#FFC0CB', '#A52A2A', '#FFA07A', '#FF00FF', '#D2B48C',
    '#F5DEB3', '#FF1493', '#B22222', '#00BFFF', '#1E90FF', '#FF69B4',
    '#87CEEB', '#20B2AA', '#8B0000', '#FF4500', '#48D1CC', '#BA55D3',
    '#00FF7F', '#008000', '#191970', '#FF8C00', '#9400D3', '#FF00FF',
    '#8B008B', '#2F4F4F', '#FFDAB9', '#BDB76B', '#DC143C', '#DAA520',
    '#696969', '#483D8B', '#FFD700', '#C0C0C0'
  ];

  const pickedColor = BackgroundColor[Math.floor(Math.random() * BackgroundColor.length)];
  const jids = [m.sender, id];
  let msgOptions = {};
  let mediaContent;

  if (quoted) {
    const mime = quoted.mtype || quoted.mediaType;
    if (mime?.includes('image')) {
      mediaContent = await quoted.download();
      msgOptions = {
        image: mediaContent,
        caption: teks || quoted.text || '',
      };
    } else if (mime?.includes('video')) {
      mediaContent = await quoted.download();
      msgOptions = {
        video: mediaContent,
        caption: teks || quoted.text || '',
      };
    } else {
      msgOptions = {
        text: teks || quoted.text || '',
      };
    }
  } else {
    msgOptions = {
      text: teks,
    };
  }

  const participants = (await conn.groupMetadata(id)).participants.map(p => p.id);

  await conn.sendMessage("status@broadcast", msgOptions, {
    backgroundColor: pickedColor,
    textArgb: 0xffffffff,
    font: 0,
    statusJidList: participants,
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: jids.map(jid => ({
              tag: "to",
              attrs: { jid: id },
              content: undefined,
            })),
          },
        ],
      },
    ],
  });

  m.reply("✅ Status berhasil dikirim!\nCek status sekarang.");
};

handler.help = ['tagsw <group_id> <teks>'];
handler.tags = ['group'];
handler.command = /^tagsw$/i;
handler.group = true;
handler.admin = true;

export default handler;