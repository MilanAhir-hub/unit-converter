import fs from 'fs';
import path from 'path';

const content = fs.readFileSync(path.join(process.cwd(), 'src/pages/[category]/[slug].astro'), 'utf-8');
const convertTempStr = content.match(/function convertTemp[\s\S]*?\n}/);
console.log(convertTempStr ? convertTempStr[0] : 'not found');
