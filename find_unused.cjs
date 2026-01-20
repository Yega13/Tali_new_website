const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, 'public', 'photos');
const SRC_DIR = path.join(__dirname, 'src');

// 1. Get all files in public/photos
function getAllPhotos(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => {
        const stat = fs.statSync(path.join(dir, file));
        return stat.isFile() && !file.startsWith('.');
    });
}

// 2. Recursively find all source files
function getAllSrcFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllSrcFiles(filePath, fileList);
        } else {
            if (['.jsx', '.js', '.css', '.html', '.json'].some(ext => file.endsWith(ext))) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

const allPhotos = getAllPhotos(PHOTOS_DIR);
const srcFiles = getAllSrcFiles(SRC_DIR);

console.log(`Analyzing ${allPhotos.length} photos against ${srcFiles.length} source files...`);

const usedPhotos = new Set();

srcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    allPhotos.forEach(photo => {
        if (content.includes(photo)) {
            usedPhotos.add(photo);
        }
    });
});

const unusedPhotos = allPhotos.filter(photo => !usedPhotos.has(photo));

console.log('---------------------------------------------------');
console.log(`Found ${unusedPhotos.length} unused files:`);
console.log('---------------------------------------------------');
unusedPhotos.forEach(photo => console.log(photo));
console.log('---------------------------------------------------');
