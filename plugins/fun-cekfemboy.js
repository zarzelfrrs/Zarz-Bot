/*
jangan hapus wm ini woy
author : Reza Transgender 

*/
let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, 'Masukin nama dulu, biar bisa gue nilai... seberapa layak lo dibisik "malam ini kamu punyaku ya~".', m);

    let target = text || m.pushName;

    const hash = Array.from(target).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const percent = Math.floor((hash * Date.now()) % 101);

    let rank = '';
    if (percent >= 95) {
        rank = 'UKE LEGENDARIS';
    } else if (percent >= 85) {
        rank = 'FEMBOY HOTLINE';
    } else if (percent >= 70) {
        rank = 'FEMBOY SIAGA 1';
    } else if (percent >= 50) {
        rank = 'FEMBOY NGEFLIRT';
    } else if (percent >= 30) {
        rank = 'FEMBOY TERPENDAM';
    } else {
        rank = 'TARGET FANTASI';
    }

    let komentar = '';
    if (percent >= 95) {
        komentar = 'Lo tuh femboy idaman sugar daddy. Dikit aja dikasih perhatian, langsung manja-manja sambil meringkuk di dada orang. Suara lo? ASMR-nya ngegoda setengah mati.';
    } else if (percent >= 85) {
        komentar = 'Dari cara lo ngetik aja udah kebaca: lo suka dipeluk dari belakang sambil dibisikin pelan. "Udah siap buat nakal belum?" dan lo cuma bisa ngangguk pelan.';
    } else if (percent >= 70) {
        komentar = 'Lo bukan cuma femboy... lo tuh pemicu dosa. Outfit lo selalu kebetulan *nempel banget*. Bikin yang lihat pengen langsung tarik dan bilang "ayo, kamar kosong ada nih."';
    } else if (percent >= 50) {
        komentar = 'Lo diem-diem horny. Di luar keliatan kalem, tapi pas malem sendirian, lo buka headset, pasang playlist "moan compilation", dan... ya, lo ngerti sendiri lanjutannya.';
    } else if (percent >= 30) {
        komentar = 'Aura lo tuh "aku malu, tapi mau". Sering banget dikira polos, padahal tab bookmark lo isinya *doujin* dan video-videonya full dengan tag yang... gak bisa dijelasin di sini.';
    } else {
        komentar = 'Lo bukan femboy. Tapi lo punya muka yang sering jadi thumbnail video "cowok straight dibikin leleh sama trap". Dan lo nonton... sampe habis. Diam-diam ngulang 3x.';
    }

    const notes = [
        'Note: Stop nyari "femboy gets bred" di search bar, lo ketauan.',
        'Note: Lo tuh bukan innocent, lo cuman belum ke-ekspos aja.',
        'Note: Lo suka bilang "iya kak..." pas voice? Jangan sok malu deh.',
        'Note: History lo isinya lebih orno dari VPN premium.',
        'Note: Lo udah bukan wibu biasa, lo tuh femboy enjoyer tingkat advance.',
        'Note: Kalau explore IG lo isinya cowok berseragam ketat... lo udah tau lah.',
    ];

    const pickNote = pickRandom(notes);

    conn.reply(m.chat, `👤 *${target}*\n🏅 *RANK:* ${rank}\n🔞 *${percent}% Femboy Power*\n\n${komentar}\n\n${pickNote}`, m);
};

handler.help = ['cekfemboy'];
handler.tags = ['fun'];
handler.command = /^cekfemboy$/i;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}