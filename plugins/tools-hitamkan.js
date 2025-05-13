import axios from "axios";

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime?.startsWith("image/")) throw `✧ Balas gambar dengan perintah *.hitamkan* untuk memproses.`;

  
  await m.reply("⏳ *Bentar bang, otw dihitamin...*");

  let buffer = await q.download();
  let payload = {
    imageData: buffer.toString("base64"),
    filter: "hitam"
  };

  try {
    let res = await axios.post("https://negro.consulting/api/process-image", payload);
    if (res.data?.status === "success" && res.data.processedImageUrl) {
      let img = await axios.get(res.data.processedImageUrl, { responseType: "arraybuffer" });

      let caption = `
╭━━━〔 *NIH BANG SUDAH HITAM* 〕━━━⬣
┃🖼️CREATE BY : *XITERBOT MD*
┃📤 Status : *Sukses diproses!*
╰━━━━━━━━━━━━━━━━━━⬣
`;

      await conn.sendFile(m.chat, Buffer.from(img.data), `hasil-hitam.jpg`, caption, m);
    } else {
      throw "✖ Gagal memproses gambar. Silakan coba lagi.";
    }
  } catch (e) {
    throw `⚠️ Terjadi kesalahan saat memproses gambar:\n${e.message || e}`;
  }
};

handler.help = ["hitamkan"];
handler.tags = ["tools"];
handler.command = /^hitamkan$/i;
handler.register = true;

export default handler;