import { createCanvas, loadImage } from 'canvas';

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

async function generateQuoteImage(ppUrl, username, quoteText) {
  const width = 1000;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  const avatar = await loadImage(ppUrl);
  ctx.save();
  ctx.beginPath();
  ctx.arc(180, 250, 120, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 60, 130, 240, 240);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = '28px sans-serif';
  let lines = wrapText(ctx, quoteText, 600);
  lines.forEach((line, i) => {
    ctx.fillText(line, 350, 180 + i * 35);
  });

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '22px italic';
  ctx.fillText(`- ${username}`, 350, 180 + lines.length * 35 + 10);

  return canvas.toBuffer();
}

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply('Kirim teks quotesnya!\nContoh: .quoteimg Jangan pernah menyerah, bro.');
  }

  let pushname = m.pushName || m.sender.split('@')[0];
  let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/h3njeb.jpg');
  let buffer = await generateQuoteImage(ppUrl, pushname, text);

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `📝 Quote dari *${pushname}*\n\n> Zenzz AI - MD`,
    contextInfo: { mentionedJid: [m.sender] }
  }, { quoted: m });
};

handler.help = ['createquote', 'quoteimg'].map(v => v + ' <teks>');
handler.tags = ['maker'];
handler.command = /^createquote|quoteimg$/i;

export default handler;