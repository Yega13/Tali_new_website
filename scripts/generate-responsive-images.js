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
}

main().catch(err => { console.error(err); process.exit(1) })
