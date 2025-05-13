import axios from "axios";

const url = "https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv";

let dataWilayah = null;

const parseCSV = (csv) => {
  return csv.split("\n").map((line) => {
    const [kode, nama] = line.split(",");
    return { kode: kode.trim(), nama: nama?.trim() };
  });
};

const fetchData = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    dataWilayah = parseCSV(data);
    console.log("Data berhasil di-fetch dan di-parse.");
  } catch (error) {
    console.error("Error fetching CSV:", error);
  }
};

const searchWilayah = async (query) => {
  if (!dataWilayah) {
    await fetchData();
  }

  const queryWords = query.toLowerCase().split(" ");
  return dataWilayah.filter((item) => {
    const searchString = `${item.kode} ${item.nama}`.toLowerCase();
    return queryWords.every((word) => searchString.includes(word));
  });
};

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("⚠️ Masukkan nama wilayah yang ingin dicari!");

  try {
    await conn.sendMessage(m.chat, {
      react: {
        text: "🔍",
        key: m.key,
      },
    });

    let results = await searchWilayah(text);

    if (!results.length) {
      return m.reply("❌ Wilayah tidak ditemukan!");
    }

    let caption = `📌 *Hasil Pencarian Wilayah*\n\n`;
    results.slice(0, 10).forEach((result, i) => {
      caption += `📍 ${i + 1}. *Kode:* ${result.kode} - *Nama:* ${result.nama}\n`;
    });

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });

    // Reaksi selesai ✅
    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

  } catch (error) {
    console.error(error);
    m.reply("⚠️ Terjadi kesalahan, coba lagi nanti.");
  }
};

handler.command = /^wilayah$/i;
handler.help = ["wilayah (nama daerah)"];
handler.tags = ["search"];

export default handler;