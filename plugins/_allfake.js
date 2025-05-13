import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'

let handler = m => m
handler.all = async function (m) {
    let name = await conn.getName(m.sender)
    let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    let fotonyu = 'https://telegra.ph/file/e1047817d256d9e372144.jpg'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) { }

    global.emror = 'https://telegra.ph/file/a6294049a1863a69154cf.jpg'
    global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])

    
    global.axios = (await import('axios')).default
    global.fetch = (await import('node-fetch')).default
    global.cheerio = (await import('cheerio')).default
    global.fs = (await import('fs')).default

    global.kontak2 = [
        [owner[0], await conn.getName(owner[0] + '6287823745178@s.whatsapp.net'), 'ZenzzXD', 'https://whatsapp.com', true],
    ]

    global.fkon = {
        key: {
            fromMe: false,
            participant: m.sender,
            ...(m.chat ? {
                remoteJid: 'BROADCAST GROUP'
            } : {})
        },
        message: {
            contactMessage: {
                displayName: `${name}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    }

    global.ephemeral = '86400'

    global.ucapan = ucapan()
    global.botdate = date()

    global.adReply = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                "newsletterJid": "120363410793796223@newsletter",
                "serverMessageId": 103,
                "newsletterName": `⌜ zenzz AI - MD ⌟ ©ZenzzXD`
            },
            externalAdReply: {
                showAdAttribution: true,
                title: info.namebot,
                body: ucapan(),
                previewType: "VIDEO",
                thumbnailUrl: 'https://files.catbox.moe/h3njeb.jpg',
                sourceUrl: 'https://ZenzzXD.com',
            }
        }
    }

    global.fakeig = {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: info.namebot,
                body: ucapan(),
                thumbnailUrl: pp,
                sourceUrl: url.sig
            }
        }
    }
}

export default handler

function date() {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return `${week}, ${date}`
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "🌃 Selamat malam "
    if (time >= 4) res = "🌅 Selamat pagi "
    if (time > 10) res = "🏙️ Selamat siang "
    if (time >= 15) res = "🌇 Selamat sore "
    if (time >= 18) res = "🌃 Selamat malam "
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}