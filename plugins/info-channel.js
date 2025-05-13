let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("⚠️ *Format salah!*\nGunakan: `.cinfo <link_channel>`");

    let match = args[0].match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) return m.reply("⚠️ *Terjadi kesalahan! Pastikan link valid.*");

    let inviteId = match[1];

    try {
        let metadata = await conn.newsletterMetadata("invite", inviteId);
        if (!metadata || !metadata.id) return m.reply("⚠️ *Gagal mengambil data channel. Pastikan link benar atau coba lagi nanti.*");

        let caption = `*— 乂 Channel Info —*\n\n` +
            `🆔 *ID:* ${metadata.id}\n` +
            `📌 *Nama:* ${metadata.name}\n` +
            `👥 *Pengikut:* ${metadata.subscribers?.toLocaleString() || "Tidak diketahui"}\n` +
            `📅 *Dibuat sejak:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("id-ID") : "Tidak diketahui"}\n` +
            `📄 *Deskripsi:* ${metadata.description || "Tidak ada deskripsi."}`;

        if (metadata.preview) {
            await conn.sendMessage(m.chat, { 
                image: { url: "https://pps.whatsapp.net" + metadata.preview }, 
                caption 
            });
        } else {
            m.reply(caption);
        }
    } catch (error) {
        console.error("Error:", error);
        m.reply("Terjadi kesalahan! Bisa jadi link salah..");
    }
};

handler.help = ["cinfo"]
handler.tags = ["info"]
handler.command = ["cinfo", "channelinfo", "ci"]
handler.owner = false

export default handler