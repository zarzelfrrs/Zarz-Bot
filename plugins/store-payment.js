const handler = async (m, { conn, command }) => {
  const footerText = '© XiterBot MD - Nabilzex AI - MD'
  const imageUrl = 'https://files.catbox.moe/h3njeb.jpg'

  if (command === 'pay3' || command === 'payment3') {
    await conn.sendMessage(m.chat, {
      caption: 'Pilih Format Payment',
      footer: footerText,
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: 'ini pesan interactiveMeta' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Silahkan Pilih Payment',
              sections: [
                {
                  title: 'List Payment',
                  rows: [
                    { title: 'DANA', id: `.dana` },
                    { title: 'GOPAY', id: `.gopay` }
                  ]
                }
              ]
            })
          }
        }
      ],
      image: { url: imageUrl },
      headerType: 1
    }, { quoted: m })
  }

  if (command === 'dana1') {
    const teks = `
*PAYMENT DANA : XITERBOT MD*

* *Nomor :* 087823745178

*[ ! ] Penting :* \`\`\`Wajib kirimkan bukti transfer demi keamanan bersama\`\`\`
`
    await conn.sendMessage(m.chat, {
      caption: teks,
      image: { url: imageUrl }
    }, { quoted: m })
  }

  if (command === 'gopay1') {
    const teks = `
*PAYMENT GOPAY : XITERBOT MD*

* *Nomor :* 087823745178

*[ ! ] Penting :* \`\`\`Wajib kirimkan bukti transfer demi keamanan bersama\`\`\`
`
    await conn.sendMessage(m.chat, {
      caption: teks,
      image: { url: imageUrl }
    }, { quoted: m })
  }
}

handler.help = ['pay1', 'payment1', 'dana1', 'gopay1']
handler.command = ['pay1', 'payment1', 'dana1', 'gopay1']
handler.tags = ['store']

export default handler