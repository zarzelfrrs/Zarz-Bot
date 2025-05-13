/*
• untuk siapa pun yang ketahuan menjual script ini tanpa  developer mohon untuk dilaporkan !
*/

//import fetch from "node-fetch"
export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    if (id in this.autosholat) {
        return false
    }
    //let data = await (await fetch("https://api.aladhan.com/v1/timingsByCity?city=Makassar&country=Indonesia&method=8")).json();
    //let jadwalSholat = data.data.timings;
    let jadwalSholat = {
        Shubuh : "04:16",
        Dhuha: "05:34",
        Dzuhur: "11:37",
        Ashar: "14:49",
        Maghrib: "17:41",
        Isyak: "18:50",
        Tahajud: "01:55"
    }
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            let caption = `Hai kak @${who.split`@`[0]},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat🙂.\n\n*${waktu}*\n_untuk wwilayah Surabaya dan sekitarnya._`
            this.autosholat[id] = [
                this.reply(m.chat, caption, null, {
                    contextInfo: {
                        mentionedJid: [who]
                    }
                }),
                setTimeout(() => {
                    delete this.autosholat[id]
                }, 57000)
            ]
        }
    }
}
export const disabled = false