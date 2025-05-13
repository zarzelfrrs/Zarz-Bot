let handler = async (m, { conn }) => {
    const hour = new Date().getHours()
    const timeOfDay = hour < 12 ? "Pagi" : hour < 15 ? "Siang" : hour < 18 ? "Sore" : "Malam"
    const timeEmoji = hour < 12 ? "🌅" : hour < 15 ? "☀️" : hour < 18 ? "🌤️" : "🌙"

    // Fungsi untuk mengubah huruf kecil menjadi small caps, huruf besar tetap biasa
    const toSmallCaps = (text) => {
        const smallCapsMap = {
            'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
            'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
            'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
        }
        return text.split('').map(char => smallCapsMap[char.toLowerCase()] || char).join('')
    }

    let baseMessage = `
┏━━━━『 *ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴋᴇᴘᴀᴅᴀ* 』━━━━┓
┃ ⌨︎︎ᴛᴜʜᴀɴ ʏɢ ᴍᴀʜᴀ ᴇsᴀ
┗━━━━━━━━━━━━━━━━━━━━━┛
`

    let msg = await conn.reply(m.chat, baseMessage, m)
    let key = msg.key

    setTimeout(async () => {
        baseMessage = `
┏━━━━『 *ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴋᴇᴘᴀᴅᴀ* 』━━━━┓
┃ ⌨︎︎ᴛᴜʜᴀɴ ʏɢ ᴍᴀʜᴀ ᴇsᴀ
┃ ⌨︎︎ᴢᴇɴ [ ᴄʀᴇᴀᴛᴏʀ ]
┃ ⌨︎︎ᴄᴜᴋɪ ᴅɪɢɪᴛᴀʟ [ ᴄʀᴇᴀᴛᴏʀ ]
┗━━━━━━━━━━━━━━━━━━━━━┛`
        
        await conn.sendMessage(m.chat, { text: baseMessage, edit: key })

        setTimeout(async () => {
            baseMessage += `
┏━━━━『 *ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴋᴇᴘᴀᴅᴀ* 』━━━━┓
┃ ⌨︎︎ᴛᴜʜᴀɴ ʏɢ ᴍᴀʜᴀ ᴇsᴀ
┃ ⌨︎︎ᴢᴇɴ [ ᴄʀᴇᴀᴛᴏʀ ]
┃ ⌨︎︎ᴄᴜᴋɪ ᴅɪɢɪᴛᴀʟ [ ᴄʀᴇᴀᴛᴏʀ ]
┗━━━━━━━━━━━━━━━━━━━━━┛`
            
            await conn.sendMessage(m.chat, { text: baseMessage, edit: key })

            setTimeout(async () => {
                baseMessage = `
┏━━━━『 *ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴋᴇᴘᴀᴅᴀ* 』━━━━┓
┃ ⌨︎︎ᴛᴜʜᴀɴ ʏɢ ᴍᴀʜᴀ ᴇsᴀ
┃ ⌨︎︎ᴢᴇɴ [ ᴄʀᴇᴀᴛᴏʀ ]
┃ ⌨︎︎ᴄᴜᴋɪ ᴅɪɢɪᴛᴀʟ [ ᴄʀᴇᴀᴛᴏʀ ]
┃ ⌨︎︎ᴘᴇɴʏᴇᴅɪᴀ ᴀᴘɪ 
┃ ⌨︎︎ᴘᴇɴʏᴇᴅɪᴀ ʙᴀsᴇ
┗━━━━━━━━━━━━━━━━━━━━━┛

${generateRandomQuote()}`

                await conn.sendMessage(m.chat, { text: baseMessage, edit: key })
            }, 2000)
        }, 2000)
    }, 2000)
}

function generateRandomQuote() {
    const quotes = [
        "Terimakasih atas kepercayaan anda! 🙏",
        "Bersama kita bisa lebih baik! ✨",
        "Sukses selalu untuk kita semua! 🌟",
        "Semangat terus, para pengguna setia! 💪",
        "Mari berinovasi untuk masa depan! 🚀",
        "Setiap langkah adalah kemajuan! 👣",
        "Bersama Furina AI, semua menjadi mudah! 🤖",
        "Kreativitas tidak mengenal batas! 🎨",
        "Teknologi untuk kemajuan bersama! 💡",
        "Melayani dengan sepenuh hati! ❤️",
        "Kepuasan anda adalah prioritas kami! 🎯",
        "Terus berkarya tanpa henti! ⚡",
        "Bersama membangun masa depan! 🌈",
        "Inovasi tiada henti! 🔄",
        "Kepercayaan anda adalah motivasi kami! 🎖️",
        "Selalu ada untuk anda! 🌟",
        "Kualitas adalah prioritas! 💎",
        "Mendukung kreativitas tanpa batas! �",
        "Bersama meraih mimpi! 🌠",
        "Pelayanan terbaik untuk anda! 👑",
        "Kreativitas adalah kunci kesuksesan! 🗝️",
        "Membangun komunikasi yang lebih baik! 📱",
        "Selalu siap membantu! 🤝",
        "Berinovasi untuk kemajuan! 📈",
        "Menghadirkan solusi terbaik! 💫",
        "Kepuasan pengguna adalah kebahagiaan kami! 😊",
        "Terus berkembang bersama anda! 🌱",
        "Memberikan yang terbaik setiap saat! ⭐",
        "Kreativitas tanpa batas! 🎭",
        "Bersama menuju kesuksesan! 🏆",
        "Melayani dengan ketulusan! 💖",
        "Inovasi untuk masa depan! 🔮",
        "Mengutamakan kualitas! 💯",
        "Selalu ada untuk membantu! 🆘",
        "Berkarya tanpa henti! ⚡",
        "Membangun mimpi bersama! 🌈",
        "Memberikan inspirasi setiap hari! 💭",
        "Kreativitas adalah jalan kami! 🎨",
        "Bersama meraih bintang! ⭐",
        "Melangkah maju tanpa kenal lelah! 🏃‍♂️"
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
}

handler.help = ['credits', 'tqto', 'thanks']
handler.tags = ['info', 'main']
handler.command = /^(credits?|tqto|thanks?)$/i

export default handler