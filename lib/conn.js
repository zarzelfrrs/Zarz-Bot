// conn.js

import { WAConnection } from '@adiwajshing/baileys';

/**

 * Koneksi ke WhatsApp

 * @type {WAConnection}

 */

export const conn = new WAConnection();

/**

 * Menghubungkan bot ke WhatsApp.

 * Memuat file dan melakukan autentikasi.

 */

export const connectToWhatsApp = async () => {

  conn.on('qr', qr => {

    console.log('Scan the QR code to authenticate the bot:', qr);

  });

  conn.on('open', () => {

    console.log('Bot successfully connected to WhatsApp!');

  });

  await conn.connect();

};

/**

 * Mengirim pesan teks.

 * @param {string} to - ID penerima (misalnya: '1234567890@s.whatsapp.net').

 * @param {string} text - Pesan teks yang akan dikirim.

 * @param {object} quotedMessage - Pesan yang akan dikutip (jika ada).

 * @returns {Promise} - Mengembalikan promise dari pengiriman pesan.

 */

export const sendText = async (to, text, quotedMessage) => {

  return await conn.sendMessage(to, { text: text }, { quoted: quotedMessage });

};

/**

 * Mengirim pesan berupa gambar.

 * @param {string} to - ID penerima.

 * @param {string} url - URL gambar.

 * @param {object} quotedMessage - Pesan yang akan dikutip (jika ada).

 * @returns {Promise} - Mengembalikan promise dari pengiriman gambar.

 */

export const sendMessage = async (to, message, quotedMessage) => {

  return await conn.sendMessage(to, message, { quoted: quotedMessage });

};

/**

 * Mengirim polling pilihan.

 * @param {string} to - ID penerima (misalnya: '1234567890@s.whatsapp.net').

 * @param {string} question - Pertanyaan yang akan diajukan.

 * @param {array} options - Pilihan polling.

 * @returns {Promise} - Mengembalikan promise pengiriman polling.

 */

export const sendPoll = async (to, question, options) => {

  return await conn.sendMessage(to, { text: question, buttons: options.map(option => ({ buttonId: option, buttonText: { displayText: option }, type: 1 })) });

};