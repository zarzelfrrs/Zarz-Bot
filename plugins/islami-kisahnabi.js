const handler = async (m, { text }) => {
  if (!text) return m.reply(`Masukkan nama nabi!\nContoh: *kisahnabi adam*`);

  try {
    const res = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text.toLowerCase()}.json`);
    if (!res.ok) throw new Error('Data tidak ditemukan');

    const kisah = await res.json();
    const hasil = `*👳 Nabi :* ${kisah.name}
*- Tanggal Lahir :* ${kisah.thn_kelahiran}
*- Tempat Lahir :* ${kisah.tmp}
*- Usia :* ${kisah.usia}

*—————— \`[ K I S A H ]\` ——————*

${kisah.description}`;

    m.reply(hasil);
  } catch (e) {
    m.reply("*Nabi tidak ditemukan atau terjadi kesalahan.*");
  }
};

handler.help = ['kisahnabi <nama>'];
handler.tags = ['islami'];
handler.command = /^kisahnabi$/i;

export default handler;