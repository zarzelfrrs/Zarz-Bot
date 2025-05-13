/**
 * By: Hydra
 * 𝘵𝘦𝘭𝘦: https://t.me/draa82
 * 𝘪𝘯𝘧𝘰: https://s.id/Genzo82
 * 𝘔𝘢𝘬𝘦𝘳: https://whatsapp.com/channel/0029VadrgqYKbYMHyMERXt0e
 * 🚨Di Larang Menghapus Wm Ini🚨
 * #𝗛𝗮𝗿𝗴𝗮𝗶𝗹𝗮𝗵 𝗣𝗲𝗺𝗯𝘂𝗮𝘁
**/

import fetch from "node-fetch"

const fetchJson = (url, options) => fetch(url, options).then(res => res.json());

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh\n${usedPrefix + command} jokowi`;

    await conn.sendMessage(m.chat, {
        react: { text: "⏱️", key: m.key }
    });

    try {
        let anuu = await fetchJson(`https://api.vreden.my.id/api/igstalk?query=${text}`);
        const anu = anuu.result;
        
        if (!anu || !anu.user) throw "Akun tidak ditemukan atau private.";

        const nick = anu.user.username;
        const nama = anu.user.full_name;
        const post = anu.user.media_count.toLocaleString();
        const foll = anu.user.follower_count.toLocaleString();
        const foli = anu.user.following_count.toLocaleString();
        const bio = anu.user.biography || "Tidak ada bio.";
        const jenis = anu.user.is_business ? "Bisnis" : "Pribadi";
        const imgUrl = anu.user.hd_profile_pic_url_info?.url || anu.user.profile_pic_url;

        await conn.sendMessage(m.chat, {
            image: { url: imgUrl },
            caption: `*\`乂 INSTAGRAM - STALK\`*\n\n*Nickname :* ${nick}\n*Fullname :* ${nama}\n*Postingan :* ${post}\n*Followers :* ${foll}\n*Following :* ${foli}\n*Jenis Akun:* ${jenis}\n*Bio :*\n${bio}`
        }, { quoted: m });
   await conn.sendMessage(m.chat, {
        react: { text: "", key: m.key }
    });
    } catch (error) {
        await m.reply(`Error: ${error.message}`);
    }
}

handler.help = ["igstalk"];
handler.tags = ["stalker"];
handler.command = ["igstalk"];
handler.limit = false

export default handler;