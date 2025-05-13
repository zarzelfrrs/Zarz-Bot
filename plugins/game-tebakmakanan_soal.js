const soalList = [
  {
    soal: "Aku makanan khas Padang, identik dengan daging dan santan.",
    jawaban: "Rendang",
    deskripsi: "Rendang adalah masakan daging asli Minangkabau yang mendunia."
  },
  {
    soal: "Aku makanan bulat dari ketan, diisi kacang hijau, ditaburi wijen.",
    jawaban: "Onde-onde",
    deskripsi: "Onde-onde adalah jajanan tradisional yang digoreng dan manis."
  },
  {
    soal: "Aku gorengan isi sayur, kadang disebut bala-bala.",
    jawaban: "Bakwan",
    deskripsi: "Bakwan adalah gorengan berbahan sayuran dan tepung terigu."
  },
  {
    soal: "Aku makanan khas Bandung dari singkong fermentasi.",
    jawaban: "Peuyeum",
    deskripsi: "Peuyeum sering dijadikan oleh-oleh khas Jawa Barat."
  },
  {
    soal: "Aku makanan manis dari tepung beras, warna-warni, kenyal.",
    jawaban: "Klepon",
    deskripsi: "Klepon berisi gula merah cair dan dilapisi kelapa parut."
  },
  {
    soal: "Aku makanan gurih berbentuk segitiga dari beras dan santan.",
    jawaban: "Lemper",
    deskripsi: "Lemper dibungkus daun pisang dan biasanya berisi ayam."
  },
  {
    soal: "Aku makanan dari tepung dan telur, biasa diisi sosis dan digulung.",
    jawaban: "Martabak telur",
    deskripsi: "Martabak telur gurih biasanya dijual di pinggir jalan."
  },
  {
    soal: "Aku jajanan berwarna putih, kenyal, dan biasanya berbentuk persegi panjang.",
    jawaban: "Kue lapis",
    deskripsi: "Kue lapis disusun dari lapisan warna-warni dan dikukus."
  },
  {
    soal: "Aku makanan khas Betawi, pakai bihun, sayur, dan kuah kacang.",
    jawaban: "Ketoprak",
    deskripsi: "Ketoprak disajikan dengan kerupuk dan tahu goreng."
  },
  {
    soal: "Aku camilan berbentuk panjang, dari singkong goreng yang dibumbui pedas.",
    jawaban: "Cilok",
    deskripsi: "Cilok adalah aci dicolok, makanan khas Bandung."
  },
  {
    soal: "Aku makanan berbentuk bulat, disajikan dengan kuah, biasanya daging sapi.",
    jawaban: "Bakso",
    deskripsi: "Bakso disajikan dengan mie, tahu, dan sambal."
  },
  {
    soal: "Aku makanan dari nasi yang digoreng, sering dicampur telur dan ayam.",
    jawaban: "Nasi goreng",
    deskripsi: "Nasi goreng adalah makanan khas Indonesia yang populer."
  },
  {
    soal: "Aku makanan khas Solo, mirip sosis tapi dibungkus daun pisang.",
    jawaban: "Timlo",
    deskripsi: "Timlo biasanya berisi daging ayam, telur, dan sosis Solo."
  },
  {
    soal: "Aku makanan dari lontong, sayur labu, tahu, dan sambal.",
    jawaban: "Lontong sayur",
    deskripsi: "Lontong sayur biasa disajikan untuk sarapan."
  },
  {
    soal: "Aku makanan manis berbentuk bulat pipih, rasa kelapa, dan dibakar.",
    jawaban: "Serabi",
    deskripsi: "Serabi bisa manis atau gurih, tergantung topping-nya."
  },
  {
    soal: "Aku makanan dari mie, disiram saus kacang, pakai telur dan kerupuk.",
    jawaban: "Mie ayam",
    deskripsi: "Mie ayam sering ditambah bakso dan sawi rebus."
  },
  {
    soal: "Aku makanan khas Palembang, kenyal dan disajikan dengan kuah cuko.",
    jawaban: "Pempek",
    deskripsi: "Pempek terbuat dari ikan dan sagu, sering disajikan dengan ebi dan timun."
  },
  {
    soal: "Aku makanan dari campuran ketan dan daging ayam, dibungkus daun pisang.",
    jawaban: "Arem-arem",
    deskripsi: "Arem-arem mirip lemper tapi lebih lembut dan berbumbu."
  },
  {
    soal: "Aku camilan dari tepung tapioka, kecil-kecil dan ditusuk seperti sate.",
    jawaban: "Sempol",
    deskripsi: "Sempol adalah camilan khas Malang yang digoreng dan dilumuri sambal."
  },
  {
    soal: "Aku makanan khas dari betawi yang berkuah kuning dan berisi jeroan sapi.",
    jawaban: "Soto Betawi",
    deskripsi: "Soto Betawi menggunakan santan atau susu, rasanya gurih dan kaya rempah."
  }
  // ... (soal lainnya seperti versi panjang di atas)
]

const handler = async (m, { conn }) => {
  conn.tebakmakanan = conn.tebakmakanan || {}

  const item = soalList[Math.floor(Math.random() * soalList.length)]
  const soalText = `*🍽️ Tebak Makanan Tradisional!*\n\n${item.soal}\n\n*Balas pesan ini atau ketik .jawab <jawabanmu>*\n⏳ Waktu: *30 detik*`

  const sent = await conn.sendMessage(m.chat, { text: soalText }, { quoted: m })

  conn.tebakmakanan[m.chat] = {
    id: sent.key.id,
    jawaban: item.jawaban.toLowerCase(),
    deskripsi: item.deskripsi,
    timeout: setTimeout(() => {
      if (conn.tebakmakanan[m.chat]) {
        conn.sendMessage(m.chat, {
          text: `⏱️ *Waktu habis!*\nJawaban yang benar: *${item.jawaban}*\n\n${item.deskripsi}`
        })
        delete conn.tebakmakanan[m.chat]
      }
    }, 30000)
  }
}

handler.help = ['tebakmakanan']
handler.tags = ['game']
handler.command = /^tebakmakanan$/i

export default handler