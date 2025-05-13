import moment from 'moment-timezone';
import fs from 'fs';
import axios from 'axios';

export async function all(m) {
    let setting = global.db.data.settings[this.user.jid];
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1800000) {
            let d = new Date();
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            const githubToken = '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';
            const owner = 'RayhanZuck';
            const repo = 'forup';
            const branch = 'main';

            let media = await fs.readFileSync('./system/database.json');
            let fileName = 'database.json';
            let filePath = `${this.user.jid}/${fileName}`;
            let base64Content = Buffer.from(media).toString('base64');

            try {
                // Cek apakah file sudah ada di repositori
                let sha = null;
                try {
                    let existingFileResponse = await axios.get(
                        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                        {
                            headers: {
                                Authorization: `Bearer ${githubToken}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    sha = existingFileResponse.data.sha;
                } catch (e) {
                    console.log("File baru akan diunggah.");
                }

                // Unggah atau perbarui file di GitHub
                let response = await axios.put(
                    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                    {
                        message: `Upload atau perbarui file ${fileName}`,
                        content: base64Content,
                        branch: branch,
                        ...(sha && { sha }), // Tambahkan SHA jika file sudah ada
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${githubToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log("File berhasil diunggah/diperbarui:", response.data);
                setting.backupDB = new Date() * 1;
            } catch (error) {
                console.error("Gagal mengunggah/memperbarui file:", error.response?.data || error.message);
            }
        }
    }
    return true;
}