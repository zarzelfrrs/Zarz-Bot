async function handler(m, { conn, text }) {
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

        const isMedia = m.quoted && (m.quoted.mimetype || m.quoted.isMedia);
        const type = m.quoted?.mimetype || '';
        const contentText = text?.trim();
        const idsal = global.idch; // ambil dari config.js
        const pushname = m.pushName || 'User';

        const bannedWords = ['bokep', 'panel', 'jual', 'promo', 'discount', 'diskon', 'top up', 'topup', 'cheat', 'casino', 'slot'];
        const containsBannedWord = bannedWords.some(word => contentText?.toLowerCase().includes(word));

        if (containsBannedWord) {
            await conn.reply(m.chat, 'Pesan diblokir karena mengandung kata terlarang.', m);
            try {
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            } catch {
                await conn.reply(m.chat, 'Gagal kick user, cek izin bot.', m);
            }
            return;
        }

        let ppuser;
        try {
            ppuser = await conn.profilePictureUrl(m.sender, 'image');
        } catch {
            ppuser = 'https://files.catbox.moe/h3njeb.jpg';
        }

        const ctx = {
            mentionedJid: [m.sender],
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: `${idsal}`,
                serverMessageId: 20,
                newsletterName: 'Zenzzz AI - MD'
            },
            externalAdReply: {
                title: pushname,
                body: `Zenzz AI - MD`,
                thumbnailUrl: ppuser,
                mediaType: 1,
                sourceUrl: 'https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N'
            }
        };

        if (isMedia) {
            const media = await m.quoted.download(true); // Menggunakan `download()` untuk mendownload media
            if (/image/.test(type)) {
                await conn.sendMessage(idsal, { image: { url: media }, caption: contentText || '', contextInfo: ctx });
            } else if (/video/.test(type)) {
                await conn.sendMessage(idsal, { video: { url: media }, caption: contentText || '', contextInfo: ctx });
            } else if (/audio/.test(type)) {
                await conn.sendMessage(idsal, { audio: { url: media }, mimetype: 'audio/mp4', ptt: true, contextInfo: ctx });
            } else if (/sticker/.test(type)) {
                await conn.sendMessage(idsal, { sticker: { url: media }, contextInfo: ctx });
            } else if (/application/.test(type)) {
                await conn.sendMessage(idsal, { document: { url: media }, mimetype: type, fileName: 'File.pdf', contextInfo: ctx });
            } else {
                await conn.reply(m.chat, "Format tidak didukung.", m);
            }
        } else if (contentText) {
            await conn.sendMessage(idsal, { text: contentText, contextInfo: ctx });
        } else {
            await conn.reply(m.chat, "Kirim teks atau reply media.", m);
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        await conn.reply(m.chat, `❌ Error\nLogs error : ${err}`, m);
    }
}

handler.command = ['upch'];
handler.help = ['upch'];
handler.tags = ['tools'];
handler.owner = true

export default handler;