import fetch from 'node-fetch'
import { FormData, File } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload file (image, video, etc) to catbox.moe
 * @param {Buffer} buffer - File buffer
 * @param {string} [filename='upload'] - Optional filename
 * @returns {Promise<string>} - URL hasil upload
 */
export default async function uploadToCatbox(buffer, filename = 'upload') {
  const { ext, mime } = await fileTypeFromBuffer(buffer) || {}
  const finalName = ext ? `${filename}.${ext}` : filename
  const file = new File([buffer], finalName, { type: mime || 'application/octet-stream' })

  const form = new FormData()
  form.set('reqtype', 'fileupload')
  form.set('fileToUpload', file)

  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form
  })

  const url = await res.text()
  if (!url.startsWith('https://')) throw new Error('Upload failed: ' + url)
  return url
}