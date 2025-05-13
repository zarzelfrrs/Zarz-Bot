import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  try {
    const charMap = {
      a: "ᔑ", b: "ʖ", c: "ᓵ", d: "↸", e: "ᒷ",
      f: "⎓", g: "⊣", h: "⍑", i: "╎", j: "⋮",
      k: "ꖌ", l: "ꖎ", m: "ᒲ", n: "リ", o: "𝙹",
      p: "!¡", q: "ᑑ", r: "∷", s: "ᓭ", t: "ℸ ̣",
      u: "⚍", v: "⍊", w: "∴", x: "̇/", y: "||", z: "⨅"
    };

    if (!text) return conn.sendMessage(m.chat, { text: "Harap masukkan teks yang ingin dikonversi!" }, { quoted: m });

    const convertToEnchant = (text) => {
      return text.toLowerCase().split("").map((char) => charMap[char] || char).join("");
    };

    const result = convertToEnchant(text);
    const message = `*Input:*\n${text}\n\n*Hasil convert:*\n${result}`;
    
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (err) {
    console.error(err);
    conn.sendMessage(m.chat, { text: "Terjadi kesalahan dalam konversi." }, { quoted: m });
  }
};

handler.command = ['toenchant'];
handler.tags = ['fun'];

export default handler;