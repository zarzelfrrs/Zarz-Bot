import fetch from "node-fetch";

let handler = async(m, { text }) => {
	
	if (!text) return m.reply(
		"Harap masukkan ID pengguna. Contoh: .stalkff 12345678"
	);
	let URLS = `https://api.vreden.web.id/api/ffstalk?id=`;
	let reqs = await fetch(URLS + text);
	let json = await reqs.json();
	if (!json?.result?.account) return m.reply(
		"Akun tidak valid! Silahkan cek kembali *ID* tersebut!"
	); // WeEm YuukiModz
	let res = await json.result.account;
	let pet = await json.result.pet_info;
	let guil = await json.result.guild;
	
	let txt = `*Berikut data yg berhasil di dapatkan :*\n\n`;
	txt += ` *[ Account Info ]*\n` 
	txt += `  *• Nama:* ${res.name}\n`
	txt += `  *• ID:* ${res.id}\n`
	txt += `  *• Level:* ${res.level}\n`
	txt += `  *• XP:* ${res.xp}\n`
	txt += `  *• Like:* ${res.like}\n`
	txt += `  *• Region:* ${res.region}\n`
	txt += `  *• Honor Score:* ${res.honor_score}\n`
	txt += `  *• BR Point:* ${res.BR_points}\n`
	txt += `  *• CS Point:* ${res.CS_points}\n`
	txt += `  *• Booyah Pass:* ${res.booyah_pass}\n`
	txt += `  *• Akun Dibuat:* ${res.create_time}\n`
	txt += `  *• Last Login:* ${res.last_login}\n`
	txt += `  *• Bio:* ${res.bio}\n\n`
	txt += ` *[ Pet Info ]*\n`
	txt += `  *• Name:* ${pet.name}\n`
	txt += `  *• Level:* ${pet.level}\n`
	txt += `  *• XP:* ${pet.xp}\n\n`
	txt += ` *[ Guild Info ]*\n`
	txt += guil.id?.includes('N/A') ? 
				`*Tidak bergabung dalam guild!*\n\n` + wm : 
				`  *• Name:* ${guil.name}\n` +
				`  *• ID:* ${guil.id}\n` +
				`  *• Level:* ${guil.level}\n` + 
				`  *• Member:* ${guil.member}\n` + 
				`  *• Capacity:* ${guil.capacity}\n\n` + 
				wm
	
	await conn.reply(m.chat, txt, m)
	
}
handler.help = ["stalkff", "ffstalk"];
handler.tags = ["stalker"];
handler.command = /^stalkff$/i;

handler.limit = true;
export default handler;