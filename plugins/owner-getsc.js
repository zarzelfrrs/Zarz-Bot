import fs from 'fs';
import { exec } from 'child_process';

let handler = async (m, { conn, text, command }) => {
  m.reply('Tunggu Sebentar, Sedang membuat dan mengirimkan arsip file.');

  // Proses membuat file zip, mengecualikan node_modules
  exec('zip -r "Zenzz AI - MD.zip" . -x "node_modules/*" ".npm/*" "Zenzz AI - MD.zip"', async (err) => {
    if (err) {
      console.error(err);
      return m.reply('Terjadi kesalahan saat membuat file arsip.');
    }

    // Membaca file zip yang telah dibuat
    let db = await fs.readFileSync('./Zenzz AI - MD.zip');
    await conn.sendMessage(
      m.chat,
      { document: db, mimetype: 'application/zip', fileName: 'Zenzz AI - MD.zip' },
      { quoted: m }
    );
  });
};

handler.help = ['getscript'];
handler.tags = ['owner'];
handler.command = /^(getsc|getscript)$/i;
handler.owner = true;

export default handler;