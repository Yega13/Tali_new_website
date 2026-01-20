const fs = require('fs');
const path = require('path');

// Helper to recursively find files
function findFiles(dir, exts) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findFiles(filePath, exts));
        } else {
            if (exts.some(ext => file.endsWith(ext))) {
                results.push(filePath);
            }
        }
    });
    return results;
}

// 1. Get all actual files in public/photos
const publicPhotosDir = path.join(__dirname, 'public', 'photos');
let actualFiles = [];
try {
    actualFiles = fs.readdirSync(publicPhotosDir);
} catch (e) {
    console.error("Could not read public/photos");
    process.exit(1);
}

const actualFilesSet = new Set(actualFiles);
const lowerCaseFilesMap = new Map();
actualFiles.forEach(f => lowerCaseFilesMap.set(f.toLowerCase(), f));

console.log(`Found ${actualFiles.length} files in public/photos`);

// 2. Find all source files
const srcDir = path.join(__dirname, 'src');
const srcFiles = findFiles(srcDir, ['.js', '.jsx', '.css']);

// 3. Regex to find image paths
// Looking for "/photos/..."
const imgRegex = /\/photos\/[^"'\`\)]+/g;

let missingCount = 0;
let mismatchCount = 0;

srcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(imgRegex);

    if (matches) {
        matches.forEach(matchPath => {
            // Clean up the path (remove query params, etc if any)
            let cleanPath = matchPath.trim();

            // We only care about the filename part for now
            const filename = path.basename(cleanPath);

            // Check exact match
            if (actualFilesSet.has(filename)) {
                // OK
            } else {
                // Check case-insensitive match
                const lower = filename.toLowerCase();
                if (lowerCaseFilesMap.has(lower)) {
                    const actual = lowerCaseFilesMap.get(lower);
                    console.log(`[CASE MISMATCH] ${filename} -> ${actual}`);
                    console.log(`  File: ${path.relative(__dirname, file)}`);
                    mismatchCount++;
                } else {
                    // Check if maybe extension is wrong
                    const namePart = path.parse(filename).name;
                    const foundExt = actualFiles.find(f => path.parse(f).name.toLowerCase() === namePart.toLowerCase());

                    if (foundExt) {
                        console.log(`[EXT MISMATCH] ${filename} -> ${foundExt}`);
                        console.log(`  File: ${path.relative(__dirname, file)}`);
                        mismatchCount++;
                    } else {
                        console.log(`[MISSING] ${filename}`);
                        console.log(`  File: ${path.relative(__dirname, file)}`);
                        missingCount++;
                    }
                }
            }
        });
    }
});

console.log('---');
console.log(`Total Case/Ext Mismatches: ${mismatchCount}`);
console.log(`Total Missing Files: ${missingCount}`);
