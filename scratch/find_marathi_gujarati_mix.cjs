const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const content = fs.readFileSync(targetFilePath, 'utf8');

const regex = /'mr'\s*:\s*(['"`])(.*?)\1/g;
let match;
const mixedList = [];

while ((match = regex.exec(content)) !== null) {
  const fullMatch = match[0];
  const value = match[2];
  
  // Check for Gujarati characters (Unicode range U+0A80 to U+0AFF)
  const containsGujarati = /[\u0A80-\u0AFF]/.test(value);
  if (containsGujarati) {
    // Find the parent key by looking backwards from the match index
    const beforeMatch = content.slice(0, match.index);
    const lines = beforeMatch.split('\n');
    let parentKey = 'unknown';
    // Look for the last line that starts a key definition, e.g. 'key': {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      const keyMatch = line.match(/^['"]?([a-zA-Z0-9\-_]+)['"]?\s*:\s*\{/);
      if (keyMatch) {
        parentKey = keyMatch[1];
        break;
      }
    }
    mixedList.push({ parentKey, value, index: match.index, fullMatch });
  }
}

console.log("Found mixed Marathi translations:");
console.log(JSON.stringify(mixedList, null, 2));
