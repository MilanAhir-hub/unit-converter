const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const content = fs.readFileSync(filePath, 'utf8');

console.log("File length in chars:", content.length);
console.log("Lines count:", content.split('\n').length);

// Search for export statements
const exportRegex = /export const (\w+)/g;
let match;
while ((match = exportRegex.exec(content)) !== null) {
  console.log(`Found export: ${match[1]} at char ${match.index}`);
}

// Search for any duplicate occurrences of header
const headerMatch = content.match(/\/\/ Centralized/g);
console.log("Header occurrences:", headerMatch ? headerMatch.length : 0);
