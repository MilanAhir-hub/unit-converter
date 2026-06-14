const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let content = fs.readFileSync(targetFilePath, 'utf8');

const newTranslations = {
  'megabyte': {
    'en': 'Megabyte', 'es': 'Megabyte', 'hi': 'मेगाबाइट', 'fr': 'Mégaoctet', 'pt': 'Megabyte', 'de': 'Megabyte', 'ar': 'ميجابايت', 'ja': 'メガバイト',
    'zh-cn': '兆字节', 'zh-tw': '百萬位元組', 'ru': 'Мегабайт', 'it': 'Megabyte', 'nl': 'Megabyte', 'tr': 'Megabayt', 'ko': '메가바이트',
    'id': 'Megabita', 'vi': 'Megabyte', 'th': 'เมกะไบต์', 'pl': 'Megabajt', 'uk': 'Мегабайт', 'ro': 'Megabyte', 'el': 'Megabyte',
    'sv': 'Megabyte', 'no': 'Megabyte', 'da': 'Megabyte', 'fi': 'Megatavu', 'cs': 'Megabajt', 'hu': 'Megabyte', 'he': 'מגה-בייט',
    'ms': 'Megabait', 'bn': 'মেগাবাইট', 'ta': 'மெகாபைட்', 'te': 'మెగాబైట్', 'mr': 'मेगाबाइट', 'gu': 'મેગાબાઇટ', 'pa': 'ਮੈਗਾਬਾਈਟ',
    'ur': 'میگا بائٹ', 'fa': 'مگابایت', 'tl': 'Megabyte'
  },
  'gigabyte': {
    'en': 'Gigabyte', 'es': 'Gigabyte', 'hi': 'गीगाबाइट', 'fr': 'Gigaoctet', 'pt': 'Gigabyte', 'de': 'Gigabyte', 'ar': 'جيجابايت', 'ja': 'ギガバイト',
    'zh-cn': '吉字节', 'zh-tw': '吉位元組', 'ru': 'Гигабайт', 'it': 'Gigabyte', 'nl': 'Gigabyte', 'tr': 'Gigabayt', 'ko': '기가바이트',
    'id': 'Gigabita', 'vi': 'Gigabyte', 'th': 'กิกะไบต์', 'pl': 'Gigabajt', 'uk': 'Гігабайт', 'ro': 'Gigabyte', 'el': 'Gigabyte',
    'sv': 'Gigabyte', 'no': 'Gigabyte', 'da': 'Gigabyte', 'fi': 'Gigatavu', 'cs': 'Gigabajt', 'hu': 'Gigabyte', 'he': 'גיגה-בייט',
    'ms': 'Gigabait', 'bn': 'গিগাবাইট', 'ta': 'ஜிகாபைட்', 'te': 'గిగాబైట్', 'mr': 'गिगाबाइट', 'gu': 'ગીગાબાઇટ', 'pa': 'ਗੀਗਾਬਾਈਟ',
    'ur': 'گیگا بائต์', 'fa': 'گیگابایت', 'tl': 'Gigabyte'
  },
  'terabyte': {
    'en': 'Terabyte', 'es': 'Terabyte', 'hi': 'टेराबाइट', 'fr': 'Téraoctet', 'pt': 'Terabyte', 'de': 'Terabyte', 'ar': 'تيرابايت', 'ja': 'テラバイト',
    'zh-cn': '太字节', 'zh-tw': '兆位元組', 'ru': 'Терабайт', 'it': 'Terabyte', 'nl': 'Terabyte', 'tr': 'Terabayt', 'ko': '테라바이트',
    'id': 'Terabita', 'vi': 'Terabyte', 'th': 'เทราไบต์', 'pl': 'Terabajt', 'uk': 'Терабайт', 'ro': 'Terabyte', 'el': 'Terabyte',
    'sv': 'Terabyte', 'no': 'Terabyte', 'da': 'Terabyte', 'fi': 'Teratavu', 'cs': 'Terabajt', 'hu': 'Terabyte', 'he': 'טרה-בייט',
    'ms': 'Terabait', 'bn': 'টেরাবাইট', 'ta': 'டெராபைட்', 'te': 'టెరాబైట్', 'mr': 'टेराबाइट', 'gu': 'ટેરાબાઇટ', 'pa': 'ਟੈਰਾਬਾਈਟ',
    'ur': 'ٹیرا بائٹ', 'fa': 'ترابایت', 'tl': 'Terabyte'
  },
  'binary': {
    'en': 'Binary', 'es': 'Binario', 'hi': 'बाइनरी', 'fr': 'Binaire', 'pt': 'Binário', 'de': 'Binär', 'ar': 'ثنائي', 'ja': '2進数',
    'zh-cn': '二进制', 'zh-tw': '二進位', 'ru': 'Двоичный', 'it': 'Binario', 'nl': 'Binair', 'tr': 'İkili', 'ko': '2진수',
    'id': 'Biner', 'vi': 'Nhị phân', 'th': 'ฐานสอง', 'pl': 'Binarny', 'uk': 'Двійковий', 'ro': 'Binar', 'el': 'Δυαδικός',
    'sv': 'Binär', 'no': 'Binær', 'da': 'Binær', 'fi': 'Binääri', 'cs': 'Binární', 'hu': 'Bináris', 'he': 'בינארי',
    'ms': 'Perduaan', 'bn': 'বাইনারি', 'ta': 'இருநிலை', 'te': 'బైనరీ', 'mr': 'बायनरी', 'gu': 'બાયનરી', 'pa': 'ਬਾਇਨਰੀ',
    'ur': 'بائنری', 'fa': 'باینری', 'tl': 'Binary'
  },
  'decimal': {
    'en': 'Decimal', 'es': 'Decimal', 'hi': 'दशमलव', 'fr': 'Décimal', 'pt': 'Decimal', 'de': 'Dezimal', 'ar': 'عشري', 'ja': '10進数',
    'zh-cn': '十进制', 'zh-tw': '十進位', 'ru': 'Десятичный', 'it': 'Decimale', 'nl': 'Decimaal', 'tr': 'Ondalık', 'ko': '10진수',
    'id': 'Desimal', 'vi': 'Thập phân', 'th': 'ทศนิยม', 'pl': 'Dziesiętny', 'uk': 'Десятковий', 'ro': 'Zecimal', 'el': 'Δεκαδικός',
    'sv': 'Decimal', 'no': 'Desimal', 'da': 'Decimal', 'fi': 'Desimaali', 'cs': 'Desetinný', 'hu': 'Tizedes', 'he': 'עשרוני',
    'ms': 'Perpuluhan', 'bn': 'দশমিক', 'ta': 'தசம', 'te': 'దశాంశ', 'mr': 'दशांश', 'gu': 'દશાંશ', 'pa': 'ਦਸ਼ਮਲਵ',
    'ur': 'اعشاریہ', 'fa': 'اعشاری', 'tl': 'Decimal'
  }
};

const searchStr = 'export const unitTranslations: Record<string, Record<string, string>> = {';
const index = content.indexOf(searchStr);

if (index === -1) {
  console.error("Could not find unitTranslations declaration!");
  process.exit(1);
}

const insertIndex = index + searchStr.length;
let insertionText = '\n';

for (const [key, value] of Object.entries(newTranslations)) {
  insertionText += `  '${key}': {\n`;
  const entries = Object.entries(value).map(([lang, val]) => `    '${lang}': ${JSON.stringify(val)}`).join(', ');
  insertionText += `    ${entries}\n  },\n`;
}

content = content.slice(0, insertIndex) + insertionText + content.slice(insertIndex);

fs.writeFileSync(targetFilePath, content, 'utf8');
console.log("Successfully injected megabyte, gigabyte, terabyte, binary, and decimal translations into i18n.ts");
