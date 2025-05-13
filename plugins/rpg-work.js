let handler = async (m, { conn, usedPrefix }) => {
    try {
        const wm = 'VynaaAi'; // Ganti dengan nama bot atau teks watermark Anda
        let __timers = (new Date - global.db.data.users[m.sender].lastadventure);
        let _timers = (300000 - __timers);
        let timers = clockString(_timers);
        
        if (global.db.data.users[m.sender].healt > 79) {
            if (new Date - global.db.data.users[m.sender].lastadventure > 300000) {
                let armor = global.db.data.users[m.sender].armor;
                let rubah = global.db.data.users[m.sender].rubah;
                let kuda = global.db.data.users[m.sender].kuda;
                let kucing = global.db.data.users[m.sender].kucing;
                let anjing = global.db.data.users[m.sender].anjing;
                
                let healt = calculateHealth(kucing, armor);
                let exp = (Math.floor(Math.random() * 400) + (kuda * 70));
                let uang = (Math.floor(Math.random() * 400) + (anjing * 70));
                let message = `
Petualangan selesai!

${rpg.emoticon('healt')} Nyawa berkurang: -${healt}
${rpg.emoticon('exp')} EXP diperoleh: ${exp}
${rpg.emoticon('money')} Uang diperoleh: ${uang}

Silakan cek inventori Anda untuk melihat hasilnya.
`.trim();

                conn.sendMessage(m.chat, message, { quoted: m });
                global.db.data.users[m.sender].healt -= healt;
                global.db.data.users[m.sender].exp += exp;
                global.db.data.users[m.sender].money += uang;
                global.db.data.users[m.sender].lastadventure = new Date * 1;
            } else {
                conn.sendMessage(m.chat, `Anda harus menunggu ${timers} sebelum dapat berpetualang lagi.`, { quoted: m });
            }
        } else {
            conn.sendMessage(m.chat, `
Health Anda terlalu rendah untuk berpetualang.
Silakan gunakan potion untuk memulihkan health Anda.

Gunakan perintah:
- *${usedPrefix}shop buy potion <jumlah>* untuk membeli potion.
- *${usedPrefix}use potion <jumlah>* untuk menggunakannya.
            `.trim(), { quoted: m });
        }
    } catch (e) {
        console.log(e);
        throw e; // Menangkap error dan memberikan detailnya
    }
};

function calculateHealth(kucing, armor) {
    let healthReduction = Math.floor(Math.random() * 101);
    let kucingBonus = kucing > 0 ? kucing * 5 : 0;
    let armorBonus = armor > 0 ? armor * 5 : 0;
    return healthReduction - kucingBonus - armorBonus;
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

handler.help = ['work'];
handler.tags = ['rpg'];
handler.command = /^(work)$/i;

handler.fail = null;
handler.register = false;
handler.group = true;

export default handler;