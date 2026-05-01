import sharp from 'sharp'
import { existsSync, statSync } from 'node:fs'
import { join, parse } from 'node:path'

const PHOTOS_DIR = 'public/photos'

// Source images that need responsive variants (LCP-critical only).
// Add more entries here if other above-the-fold images need srcset.
const SOURCES = [
    'tali-style1.webp',
    'tali-pics35-eurovision-2025.webp',
]

const WIDTHS = [540, 800]

// One-off small variants for tiny UI slots (e.g. popup thumbnails).
// Format: { src, width, format }
const ONE_OFFS = [
    { src: 'tali picsnew 4.jpg', width: 400, format: 'webp', outName: 'tali-picsnew-4-popup.webp' },
]

async function generateVariant(srcPath, width) {
    const { dir, name, ext } = parse(srcPath)
    const outPath = join(dir, `${name}-${width}${ext}`)

    if (existsSync(outPath)) {
        const srcM = statSync(srcPath).mtimeMs
        const outM = statSync(outPath).mtimeMs
        if (outM >= srcM) return { outPath, skipped: true }
    }

    await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(outPath)

    return { outPath, skipped: false }
}

async function generateOneOff({ src, width, format, outName }) {
    const srcPath = join(PHOTOS_DIR, src)
    const outPath = join(PHOTOS_DIR, outName)
    if (!existsSync(srcPath)) {
        console.warn(`[skip] missing: ${srcPath}`)
        return
    }
    if (existsSync(outPath)) {
        const srcM = statSync(srcPath).mtimeMs
        const outM = statSync(outPath).mtimeMs
        if (outM >= srcM) { console.log(`[skip] ${outPath}`); return }
    }
    const pipeline = sharp(srcPath).resize({ width, withoutEnlargement: true })
    if (format === 'webp') pipeline.webp({ quality: 80, effort: 5 })
    await pipeline.toFile(outPath)
    console.log(`[ok]   ${outPath}`)
}

async function main() {
    for (const file of SOURCES) {
        const srcPath = join(PHOTOS_DIR, file)
        if (!existsSync(srcPath)) {
            console.warn(`[skip] missing: ${srcPath}`)
            continue
        }
        for (const w of WIDTHS) {
            const { outPath, skipped } = await generateVariant(srcPath, w)
            console.log(`${skipped ? '[skip]' : '[ok]  '} ${outPath}`)
        }
    }
    for (const job of ONE_OFFS) await generateOneOff(job)
}

main().catch(err => { console.error(err); process.exit(1) })
