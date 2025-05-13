/*

# Fitur : Sticker TTP
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : https://velyn.vercel.app/api/maker/ttp

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import fetch from 'node-fetch';
import sharp from 'sharp';

const handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Masukkan teks untuk membuat sticker TTP.');

    let text = encodeURIComponent(args.join(' '));
    let apiUrl = `https://velyn.biz.id/api/maker/ttp?text=${text}`;

    try {
        let response = await fetch(apiUrl);
        let json = await response.json();

        if (!json.status || !json.data || !json.data[0] || !json.data[0].url) {
            throw new Error('Gagal mendapatkan URL gambar dari API.');
        }

        let imageUrl = json.data[0].url;
        let imageRes = await fetch(imageUrl);
        if (!imageRes.ok) throw new Error(`Gagal mengunduh gambar: ${imageRes.status} ${imageRes.statusText}`);

        let imageBuffer = await imageRes.buffer();
        
        // Konversi PNG ke WebP dengan format yang lebih baik
        let webpBuffer = await sharp(imageBuffer)
            .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .webp({ quality: 80 })
            .toBuffer();

        conn.sendMessage(m.chat, { sticker: webpBuffer }, { quoted: m });
    } catch (err) {
        console.error('Error:', err);
        m.reply(`Terjadi kesalahan: ${err.message}`);
    }
};

handler.command = ['ttp'];
handler.tags = ['sticker'];
handler.help = ['ttp <text>'];
export default handler;