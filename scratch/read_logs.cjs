const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Milan Gagiya\\.gemini\\antigravity-ide\\brain\\28b4c0c1-3d50-4062-b61a-28fbbaae9995\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(logPath)) {
  console.error("Log file does not exist at:", logPath);
  process.exit(1);
}

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (line.includes('export const categoryTranslations') && line.includes('Conversor de Longitud')) {
    // Parse the JSON line
    try {
      const obj = JSON.parse(line);
      const text = obj.content || (obj.output ? obj.output : null);
      if (text) {
        const startIdx = text.indexOf('export const categoryTranslations');
        if (startIdx !== -1) {
          // Find the closing brace of categoryTranslations
          // Let's print the next 20000 characters or find the end of categoryTranslations
          const endStr = '};\n\n// Common unit translations';
          const endIdx = text.indexOf(endStr, startIdx);
          if (endIdx !== -1) {
            console.log("FOUND EXACT BLOCK:");
            console.log(text.slice(startIdx, endIdx + 2));
            break;
          } else {
            console.log("Found start, but not end. Printing 15000 chars:");
            console.log(text.slice(startIdx, startIdx + 15000));
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error parsing line:", e);
    }
  }
}
