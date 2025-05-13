module.exports = {
  name: 'ping',
  aliases: ['test'],
  description: 'Tes respon bot',
  async execute(m, { conn }) {
    m.reply('Bot aktif bang!');
  }
}