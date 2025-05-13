let handler = async (m, { conn }) => {
    let _muptime = process.uptime() * 1000;
    let muptime = clockString(_muptime);

    // Kirim reaksi emoji
    await conn.relayMessage(m.chat, {
        reactionMessage: {
            key: m.key,
            text: '✅'
        }
    }, { messageId: m.key.id });

    // Kirim pesan runtime dengan dekorasi
    await conn.sendMessage(m.chat, {
        text:
`╭─❏ *『   ZENZ AI - MD RUNTIME 』* ❏
│ ✨ *Status Bot Aktif*
│
│ ⏱ *Uptime* : ${muptime}
│ 📡 *Kondisi* : Online & Stabil
│ ⚡ *Respon* : Cepat & Siap Pakai
│
╰───────────────❏

Terima kasih telah menggunakan *Zenzz AI - MD*🤭
_Stay connected with powerful performance._`,
    }, { quoted: m });
};

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = ['runtime', 'rt'];

export default handler;

function clockString(ms) {
    if (isNaN(ms)) return '--';
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
}