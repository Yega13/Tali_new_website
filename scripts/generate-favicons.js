// Regenerates the favicon set from public/apple-touch-icon.png.
// Produces multi-size PNGs and a full-color (32-bit) favicon.ico that
// embeds PNG data for each size — fixes the grey/low-quality favicon issue.

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
// Load source into memory first so we can safely overwrite apple-touch-icon.png
const sourceBuf = await fs.readFile(path.join(publicDir, 'apple-touch-icon.png'))

const pngTargets = [
    { size: 16, file: 'favicon-16x16.png' },
    { size: 32, file: 'favicon-32x32.png' },
    { size: 48, file: 'favicon-48x48.png' },
    { size: 96, file: 'favicon-96x96.png' },
    { size: 180, file: 'apple-touch-icon.png' },
    { size: 192, file: 'favicon-192x192.png' },
    { size: 512, file: 'favicon-512x512.png' },
]

// Sizes embedded inside favicon.ico
const icoSizes = [16, 32, 48, 64]

async function makePngs() {
    const outputs = {}
    for (const { size, file } of pngTargets) {
        const buf = await sharp(sourceBuf)
            .resize(size, size, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
            .png({ compressionLevel: 9 })
            .toBuffer()
        await fs.writeFile(path.join(publicDir, file), buf)
        outputs[size] = buf
        console.log(`wrote ${file} (${buf.length} bytes)`)
    }
    return outputs
}

async function makeIco() {
    // Build a PNG buffer for each size we want inside the .ico
    const pngs = []
    for (const size of icoSizes) {
        const buf = await sharp(sourceBuf)
            .resize(size, size, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
            .png({ compressionLevel: 9 })
            .toBuffer()
        pngs.push({ size, buf })
    }

    // ICO header: reserved(2) + type(2) + count(2) = 6 bytes
    // ICONDIRENTRY: 16 bytes per image
    const header = Buffer.alloc(6)
    header.writeUInt16LE(0, 0)            // reserved
    header.writeUInt16LE(1, 2)            // type 1 = icon
    header.writeUInt16LE(pngs.length, 4)  // image count

    const entries = []
    let offset = 6 + 16 * pngs.length
    for (const { size, buf } of pngs) {
        const entry = Buffer.alloc(16)
        entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
        entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
        entry.writeUInt8(0, 2)                       // color palette count (0 = no palette)
        entry.writeUInt8(0, 3)                       // reserved
        entry.writeUInt16LE(1, 4)                    // color planes
        entry.writeUInt16LE(32, 6)                   // bits per pixel
        entry.writeUInt32LE(buf.length, 8)           // image size
        entry.writeUInt32LE(offset, 12)              // image offset
        entries.push(entry)
        offset += buf.length
    }

    const ico = Buffer.concat([header, ...entries, ...pngs.map(p => p.buf)])
    await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico)
    console.log(`wrote favicon.ico (${ico.length} bytes, ${pngs.length} sizes: ${icoSizes.join(', ')})`)
}

await makePngs()
await makeIco()
console.log('done')
