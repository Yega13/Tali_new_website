const fs = require('fs');
const path = require('path');

// Helper to recursively find files
function findFiles(dir, exts) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(findFiles(filePath, exts));
        } else {
            if (exts.some(ext => file.endsWith(ext))) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const publicPhotosDir = path.join(__dirname, 'public', 'photos');
const srcDir = path.join(__dirname, 'src');

// 1. Get all files
const files = fs.readdirSync(publicPhotosDir);
const srcFiles = findFiles(srcDir, ['.js', '.jsx', '.css', '.html']); // verify index.html too

// 2. Process each file
files.forEach(file => {
    const oldPath = path.join(publicPhotosDir, file);

    // Skip if directory
    if (fs.statSync(oldPath).isDirectory()) return;

    // Generate new safe name
    let newName = file.toLowerCase();
    newName = newName.replace(/\s+/g, '-'); // spaces to dashes
    newName = newName.replace(/\(|\)/g, ''); // remove parentheses
    newName = newName.replace(/-+/g, '-'); // collapse dashes
    newName = newName.replace(/\.jpeg$/, '.jpg'); // Normalize jpeg to jpg

    if (newName === file) return; // No change needed

    const newPath = path.join(publicPhotosDir, newName);

    // 3. Rename File
    try {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${newName}`);
    } catch (e) {
        console.error(`Error renaming ${file}:`, e);
        return;
    }

    // 4. Update References in Code
    // We need to handle:
    // - Exact match: "/photos/Old Name.jpg"
    // - Encoded match: "/photos/Old%20Name.jpg"
    // - Mismatched extension: "/photos/Old Name.webp" -> "/photos/new-name.jpg"

    const oldBase = path.parse(file).name;
    const newBase = path.parse(newName).name;
    const newExt = path.parse(newName).ext;

    // Regex to match the file name with ANY extension in the code
    // Matches: /photos/Old Name.any OR /photos/Old%20Name.any
    // We escape special chars for regex
    const escapedOldBase = oldBase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const pattern = new RegExp(`\/photos\/${escapedOldBase}\\.[a-zA-Z0-9]+`, 'gi');

    // Also try to match simplified versions if code had spaces? 
    // Actually, simple string replacement is safer if we target the specific string

    srcFiles.forEach(srcFile => {
        let content = fs.readFileSync(srcFile, 'utf8');
        let needsWrite = false;

        // Strategy: Look for the old basename + any extension
        // We know the OLD file had `file` (e.g. "Tali pics(10).jpg")
        // The code might have "Tali pics(10).webp" or "Tali pics(10).jpg"

        // We perform a replacement for the exact OLD filename first
        if (content.includes(file)) {
            content = content.replaceAll(file, newName);
            needsWrite = true;
        }

        // Now handle the "Same Name Different Extension" case
        // e.g. Code has .webp, File was .jpg. We renamed .jpg -> .jpg (safe).
        // Code still has .webp. We want to update it to new safe .jpg.

        // Construct potential "old" references that might exist in code
        // e.g. "Tali pics(10).webp"
        const oldWebp = `${oldBase}.webp`;
        const oldPng = `${oldBase}.png`;
        const oldJpg = `${oldBase}.jpg`; // Already handled above typically

        // Check for .webp version
        if (content.includes(oldWebp)) {
            content = content.replaceAll(oldWebp, newName); // Replace with new safe name (which has correct ext)
            needsWrite = true;
            console.log(`  Updated ${srcFile}: ${oldWebp} -> ${newName}`);
        }
        if (content.includes(oldPng)) {
            content = content.replaceAll(oldPng, newName);
            needsWrite = true;
            console.log(`  Updated ${srcFile}: ${oldPng} -> ${newName}`);
        }

        // Also handle Space -> %20 encoding if present
        const encodedOld = encodeURIComponent(file).replace(/%2F/g, '/'); // simple check
        if (content.includes(encodedOld)) {
            content = content.replaceAll(encodedOld, newName);
            needsWrite = true;
        }

        if (needsWrite) {
            fs.writeFileSync(srcFile, content, 'utf8');
        }
    });
});

console.log("Sanitization Complete.");
