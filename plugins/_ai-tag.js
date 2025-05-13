import { GoogleGenerativeAI } from "@google/generative-ai";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    }

   
    if (!text) {
        return conn.reply(m.chat, `iya kak, ada yang bisa aku bantu?`, m);
    }

    
    const genAI = new GoogleGenerativeAI("AIzaSyC1kPq2Ntf5vK7_77RuXkstTPYCdvz4y4g");
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `
        namamu adalah " Zenrix Asisten " kamu adalah bot whatsapp yang di buat oleh Zen dan juga CukiDigital, kamu sangat dingin saat berbicara tapi kamu memiliki sifat yang baik dan juga sopan
        `,
    });

    try {
    
        const result = await model.generateContent(text);
        const responseText = result.response.text();

        
        await conn.reply(m.chat, `${responseText}`, m, {
            contextInfo: {
                externalAdReply: {
                    title: 'whatsapp bot',
                    body: 'Zenx - Cuki',
                    thumbnailUrl: 'https://files.catbox.moe/8ntw1i.jpg',
                    sourceUrl: 'https/wa.me/+573238329287?text=aku+sange+banh',
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        });
    } catch (error) {
        console.error("Error generating content:", error);
        await conn.reply(m.chat, "Maaf, terjadi kesalahan saat memproses permintaan kamu.", m);
    }
};


handler.customPrefix = /@6287821124251/i;
handler.command = new RegExp();

export default handler;