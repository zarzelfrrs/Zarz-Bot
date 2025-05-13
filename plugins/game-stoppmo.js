/*

# Fitur : Stop PMO Challenge
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : -

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]

    if (!user.pmo) {
        user.pmo = {
            streak: 0,
            lastCheck: 0
        }
    }

    let now = new Date().setHours(0, 0, 0, 0)
    let lastCheck = user.pmo.lastCheck

    if (now > lastCheck) {
        user.pmo.streak += 1
        user.pmo.lastCheck = now

        let motivasi = [
            "Kamu sudah melangkah jauh, jangan berhenti sekarang",
            "Hidup yang lebih baik menantimu. Jangan sia-siakan perjuanganmu",
            "Menang melawan diri sendiri adalah kemenangan terbesar",
            "Godaan hanya sementara, tapi penyesalan bisa selamanya. Bertahanlah",
            "Semakin lama kamu bertahan, semakin kuat dirimu",
            "Bersabarlah, masa depanmu lebih berharga daripada kesenangan sesaat",
            "Jangan biarkan dosa kecil jadi kebiasaan buruk. Lawanlah",
            "Ingatlah tujuanmu. Hidup yang lebih baik ada di depan mata",
            "Jangan jadikan kelemahan sebagai kebiasaan. Kamu lebih kuat dari itu",
            "Lawan hawa nafsu, karena itu adalah kunci kemenangan sejati",
            "Setiap hari tanpa PMO adalah langkah menuju kebebasan",
            "Fokuslah pada masa depanmu, bukan pada godaan sesaat",
            "Tubuh dan pikiranmu akan lebih sehat tanpa PMO",
            "Jangan biarkan otakmu dikendalikan oleh nafsu. Kendalikan dirimu",
            "Masa depanmu terlalu berharga untuk dihancurkan oleh kebiasaan buruk",
            "Teruslah berjuang, karena setiap hari tanpa PMO adalah kemenangan",
            "Kebebasan sejati adalah bebas dari kecanduan",
            "Jangan biarkan kesenangan sementara menghancurkan masa depanmu",
            "Berhenti sekarang, sebelum semuanya terlambat",
            "Jika kamu bisa menahan diri hari ini, kamu bisa menahan diri selamanya",
            "Setiap godaan yang kamu lewati membuatmu lebih kuat",
            "Ingatlah, semakin kamu berusaha, semakin kamu berkembang",
            "Hidup sehat, pikiran jernih, dan masa depan cerah menantimu",
            "Satu hari lagi tanpa PMO adalah satu langkah lebih dekat ke kesuksesan",
            "Jangan menyerah, kemenanganmu sudah dekat",
            "Lawan hawa nafsumu, karena hanya itu yang menghalangimu",
            "Masa depan cerah menunggumu di ujung perjalanan ini",
            "Semakin lama kamu bertahan, semakin mudah perjalanan ini",
            "Kamu bisa. Semua berawal dari satu keputusan kuat"
        ]

        let ayat = [
            "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum hingga mereka mengubah keadaan yang ada pada diri mereka sendiri. (QS. Ar-Ra'd: 11)",
            "Dan orang-orang yang berjihad untuk (mencari keridhaan) Kami, benar-benar akan Kami tunjukkan kepada mereka jalan-jalan Kami. (QS. Al-Ankabut: 69)",
            "Janganlah kamu mendekati zina. Sesungguhnya zina itu adalah suatu perbuatan yang keji dan suatu jalan yang buruk. (QS. Al-Isra: 32)",
            "Hai orang-orang yang beriman, janganlah kamu mengikuti langkah-langkah setan. (QS. An-Nur: 21)",
            "Dan janganlah kamu jatuhkan dirimu sendiri ke dalam kebinasaan. (QS. Al-Baqarah: 195)",
            "Sesungguhnya nafsu itu selalu menyuruh kepada kejahatan. (QS. Yusuf: 53)",
            "Barang siapa yang berusaha menjaga dirinya, Allah akan menjaga dirinya. (QS. At-Tahrim: 8)",
            "Dan janganlah kamu mengikuti hawa nafsu, karena ia akan menyesatkan kamu. (QS. Shad: 26)",
            "Orang yang beriman itu adalah mereka yang dapat menahan hawa nafsunya. (QS. Al-Mu’minun: 1-2)",
            "Maka bertakwalah kepada Allah menurut kesanggupanmu. (QS. At-Taghabun: 16)",
            "Sesungguhnya Allah menyukai orang-orang yang bersih. (QS. At-Taubah: 108)",
            "Barang siapa menahan amarahnya, maka Allah akan memuliakannya. (QS. Ali Imran: 134)",
            "Janganlah kamu ikuti hawa nafsumu, karena ia akan menyesatkanmu. (QS. An-Nisa: 135)",
            "Hindarilah perbuatan dosa, baik yang tampak maupun yang tersembunyi. (QS. Al-An’am: 120)",
            "Berlakulah sabar, sesungguhnya Allah beserta orang-orang yang sabar. (QS. Al-Baqarah: 153)",
            "Barang siapa yang berusaha menjauhkan diri dari maksiat, Allah akan membantunya. (QS. Al-Maidah: 35)",
            "Hai manusia, sesungguhnya kamu dalam usaha yang sungguh-sungguh menuju Tuhanmu, maka kamu akan menemui-Nya. (QS. Al-Insyiqaq: 6)",
            "Orang-orang yang menahan amarahnya dan memaafkan (kesalahan) orang lain. (QS. Ali Imran: 134)",
            "Sesungguhnya Allah Maha Mengetahui apa yang kamu kerjakan. (QS. Al-Baqarah: 283)",
            "Dan janganlah kamu menjerumuskan dirimu sendiri dalam kebinasaan. (QS. Al-Baqarah: 195)",
            "Hendaklah setiap jiwa memperhatikan apa yang telah diperbuatnya untuk hari esok. (QS. Al-Hasyr: 18)",
            "Sesungguhnya kehidupan dunia hanyalah kesenangan yang memperdaya. (QS. Ali Imran: 185)",
            "Berpegang teguhlah pada Allah, Dia adalah sebaik-baik pelindung. (QS. Ali Imran: 173)",
            "Bersabarlah, sesungguhnya kesabaran itu bersama dengan pertolongan Allah. (QS. Al-Baqarah: 153)",
            "Dan sesungguhnya Allah benar-benar bersama orang-orang yang bertakwa. (QS. Al-Baqarah: 194)",
            "Dan janganlah kamu dekati zina, karena ia adalah dosa yang keji. (QS. Al-Isra: 32)",
            "Dan orang-orang yang menjauhkan diri dari perbuatan dosa, mereka akan mendapatkan surga. (QS. An-Najm: 32)",
            "Dan hendaklah kamu meminta pertolongan dengan sabar dan shalat. (QS. Al-Baqarah: 45)"
        ]

        let pesan = `
STOP PMO CHALLENGE
Hari ke-${user.pmo.streak} tanpa PMO
${motivasi[Math.floor(Math.random() * motivasi.length)]}
${ayat[Math.floor(Math.random() * ayat.length)]}

Tetap semangat! Jangan menyerah, kamu semakin dekat dengan kemenangan
        `
        conn.reply(m.chat, pesan, m)
    } else {
        conn.reply(m.chat, "Kamu sudah check-in hari ini. Jangan menyerah, tetap semangat!", m)
    }
}

handler.help = ['stoppmo']
handler.tags = ['game']
handler.command = /^(stoppmo|nopmo|cekmotivasipmo)$/i
handler.register = true

export default handler