import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Username nya mana?');
  
  try {
    const res = await githubstalk(text);
    
    const caption = `
*Username :* ${res.username}
*Nickname :* ${res.nickname || 'Tidak ada'}
*Bio :* ${res.bio || 'Tidak ada'}
*ID :* ${res.id}
*Node ID :* ${res.nodeId}
*Type :* ${res.type}
*Admin :* ${res.admin ? 'Ya' : 'Tidak'}
*Company :* ${res.company || 'Tidak ada'}
*Blog :* ${res.blog || 'Tidak ada'}
*Location :* ${res.location || 'Tidak ada'}
*Email :* ${res.email || 'Tidak ada'}
*Public Repo :* ${res.public_repo}
*Public Gists :* ${res.public_gists}
*Followers :* ${res.followers}
*Following :* ${res.following}
*Created At :* ${res.created_at}
*Updated At :* ${res.updated_at}
`;
    
    await conn.sendMessage(m.chat, { 
      image: { url: res.profile_pic }, 
      caption: caption 
    }, { quoted: m });
    
  } catch (e) {
    m.reply(`Error: ${e.message}`);
  }
};

async function githubstalk(user) {
  return new Promise((resolve, reject) => {
    axios.get('https://api.github.com/users/' + user)
    .then(({ data }) => {
      const hasil = {
        username: data.login,
        nickname: data.name,
        bio: data.bio,
        id: data.id,
        nodeId: data.node_id,
        profile_pic: data.avatar_url,
        url: data.html_url,
        type: data.type,
        admin: data.site_admin,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        public_repo: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      resolve(hasil);
    })
    .catch(reject);
  });
}

handler.help = ['githubstalk'];
handler.command = /^(ghstalk|githubstalk)$/i;
handler.tags = ['stalker'];

export default handler;