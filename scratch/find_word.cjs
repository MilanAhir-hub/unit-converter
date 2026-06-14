const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const content = fs.readFileSync(filePath, 'utf8');

const searchWord = "length";
const index = content.toLowerCase().indexOf(searchWord);
console.log(`Searching for "${searchWord}":`, index === -1 ? "NOT FOUND" : `Found at char ${index}`);

const preview = index !== -1 ? content.slice(index - 50, index + 150) : "";
console.log("Preview around match:", JSON.stringify(preview));
