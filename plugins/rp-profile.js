/*
SCRIPT BY © VYNAA VALERIE
•• recode kasih credits
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie
•• (github.com/VynaaValerie)
*/

import axios from 'axios';

let handler = async (m, { conn }) => {
    // Reaksi bot saat memulai
    conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        }
    });

    try {
        // Konfigurasi API
        const options = {
            method: 'GET',
            url: 'https://api.itsrose.rest/me',
            headers: {
                Authorization: `Bearer ${global.api.rose}` // Menggunakan API key dari global
            }
        };

        // Memanggil API
        const { data } = await axios.request(options);

        // Validasi respon API
        if (!data?.status) throw 'Gagal mendapatkan profil dari API.';

        // Ekstrak data hasil
        const { id, name, current_plan, plan_expiry_date, current_rpm } = data.result;

        // Format pesan
        let profileInfo = `
🌹 *Rose Profile Information* 🌹

🆔 *ID:* ${id}
📛 *Name:* ${name}
💳 *Current Plan:* ${current_plan}
📅 *Plan Expiry:* ${plan_expiry_date}
🔄 *Current RPM:* ${current_rpm}

Terima kasih telah menggunakan layanan Rose API.
        `.trim();

        // Kirim hasil ke pengguna
        conn.sendMessage(m.chat, { text: profileInfo }, { quoted: m });

    } catch (error) {
        console.error(error);

        // Tampilkan pesan error ke pengguna
        conn.sendMessage(
            m.chat,
            { text: `Terjadi kesalahan saat mengambil data dari API: ${error.message}` },
            { quoted: m }
        );
    }
};

// Konfigurasi handler
handler.help = ['roseprofile'];
handler.tags = ['tools'];
handler.command = /^(roseprofile)$/i; // Perintah /roseprofile
handler.premium = false;

export default handler;