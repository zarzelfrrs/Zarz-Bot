import os from 'os';
import { performance } from 'perf_hooks';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
    let start = performance.now();
    let end = performance.now();
    let speed = (end - start).toFixed(4);

    let uptime = moment.duration(process.uptime(), 'seconds'); // Uptime bot
    let formattedUptime = `${uptime.hours()}h ${uptime.minutes()}m ${uptime.seconds()}s`;

    let totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    let freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
    let usedMem = (totalMem - freeMem).toFixed(2);

    let linkTujuan = "https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg";
    let thumbnail = "https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg";

    let messageContent = {
        text: `*「 PING BOT 」*\n\n🚀 *Speed:* ${speed} ms\n🕐 *Uptime:* ${formattedUptime}\n💾 *RAM:* ${usedMem} MB / ${totalMem} MB`,
        contextInfo: {
            externalAdReply: {
                title: "🚀 Speed Test",
                body: "⚠️info ping Zenrix-MD",
                thumbnailUrl: thumbnail,
                sourceUrl: linkTujuan,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    };

    conn.sendMessage(m.chat, messageContent, { quoted: m });
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping|speed|info-speed)$/i;

export default handler;