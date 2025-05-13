import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, name }) => { // tambahkan nama ke dalam argumen
    let text;
    let apiColor = '#000000'; // warna default
    if (args.length >= 1) {
        const input = args.join(" ").split("|"); // pisahkan input menjadi warna dan teks
        if (input.length === 2) {
            const colorName = input[0].trim().toLowerCase(); // dapatkan nama warna
            text = input[1].trim(); // dapatkan teks
            // pemetaan nama warna ke nilai hex
            const colorMap = {
                'putih': '#FFFFFF',
                'hijau': '#00FF00',
                'kuning': '#FFFF00',
                'hitam': '#000000',
                'merah': '#FF0000',
                'biru': '#0000FF',
                'ungu': '#800080',
                'jingga': '#FFA500',
                'pink': '#FFC0CB',
                'abu-abu': '#808080',
                'coklat': '#A52A2A',
                'cyan': '#00FFFF',
                'magenta': '#FF00FF',
                'maroon': '#800000',
                'navy': '#000080',
                'olive': '#808000',
                'orange': '#FFA500',
                'purple': '#800080',
                'silver': '#C0C0C0',
                'teal': '#008080',
                'turquoise': '#40E0D0',
                'violet': '#EE82EE',
                'salmon': '#FA8072',
                'gold': '#FFD700',
                'indigo': '#4B0082',
                'lime': '#00FF00',
                'skyblue': '#87CEEB',
                'tan': '#D2B48C',
                'orchid': '#DA70D6',
                'coral': '#FF7F50'
                // tambahkan warna lebih banyak jika diperlukan
            };
            // atur warna berdasarkan input pengguna atau default ke hitam
            apiColor = colorMap[colorName] || apiColor;
        } else {
            throw `Format salah. Contoh penggunaan: .qc2 warna| textnya
 [ 乂 L I S T  W A R N A 乂 ]
 
 Putih
 Hijau
 Kuning
 Hitam
 Merah
 Biru
 Ungu
 Jingga
 Pink
 Abu-abu
 Coklat
 Cyan
 Magenta
 Maroon
 Navy
 Olive
 Orange
 Purple
 Silver
 Teal
 Turquoise
 Violet
 Salmon
 Gold
 Indigo
 Lime
 Skyblue
 Tan
 Orchid
 Coral
 `;
        }
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw `Format salah. Contoh penggunaan: .qc2 warna| textnya
 [ 乂 L I S T  W A R N A 乂 ]
 
 Putih
 Hijau
 Kuning
 Hitam
 Merah
 Biru
 Ungu
 Jingga
 Pink
 Abu-abu
 Coklat
 Cyan
 Magenta
 Maroon
 Navy
 Olive
 Orange
 Purple
 Silver
 Teal
 Turquoise
 Violet
 Salmon
 Gold
 Indigo
 Lime
 Skyblue
 Tan
 Orchid
 Coral
 `;
    }
    if (!text) return m.reply('Masukkan teks');
    if (text.length > 100) return m.reply('Maksimal 100 teks!');

    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": apiColor, // gunakan warna yang dipilih
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": m.name, // ubah m.sender menjadi name
                "photo": {
                    "url": pp
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    try {
        const json = await axios.post('https://btzqc.betabotz.eu.org/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const buffer = Buffer.from(json.data.result.image, 'base64');
        const stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
        if (stiker) return conn.sendFile(m.chat, stiker, 'Quotely.webp', '', m);
    } catch (error) {
        console.error(error);
        throw "Terjadi kesalahan saat membuat stiker.";
    }
}

handler.help = ['qc2'];
handler.tags = ['sticker', 'premium'];
handler.command = /^(fakechat2|qc2)$/i;
handler.premium = false
handler.onlyprem = false

export default handler;