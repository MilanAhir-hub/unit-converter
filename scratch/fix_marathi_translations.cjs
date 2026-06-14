const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let content = fs.readFileSync(targetFilePath, 'utf8');

const marathiFixes = {
  'age': 'वय कॅल्क्युलेटर'
};

let count = 0;

for (const [key, correctVal] of Object.entries(marathiFixes)) {
  const keyRegex = new RegExp(`'${key}'\\s*:\\s*\\{`);
  const match = keyRegex.exec(content);
  
  if (match) {
    const startIndex = match.index;
    // Find the end of this block (closing curly brace)
    const blockEndIndex = content.indexOf('}', startIndex);
    if (blockEndIndex !== -1) {
      const blockContent = content.slice(startIndex, blockEndIndex);
      
      // Look for the 'mr' key inside this block
      const mrRegex = /'mr'\s*:\s*(['"`]).*?\1/;
      const mrMatch = mrRegex.exec(blockContent);
      
      if (mrMatch) {
        const originalMrLine = mrMatch[0];
        const newMrLine = `'mr': ${JSON.stringify(correctVal)}`;
        
        // Replace inside the block
        const updatedBlockContent = blockContent.replace(originalMrLine, newMrLine);
        content = content.slice(0, startIndex) + updatedBlockContent + content.slice(blockEndIndex);
        count++;
      } else {
        console.warn(`Could not find 'mr' key inside block for: ${key}`);
      }
    }
  } else {
    console.warn(`Could not find block for key: ${key}`);
  }
}

fs.writeFileSync(targetFilePath, content, 'utf8');
console.log(`Successfully updated ${count} Marathi translations in i18n.ts`);
