const fs = require('fs');
const path = require('path');

const i18nFilePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let content = fs.readFileSync(i18nFilePath, 'utf8');

// 1. The 9 original categories from logs
const defaultCategories = {
  'length': {
    'en': 'Length Converter', 'es': 'Conversor de Longitud', 'hi': 'लंबाई कनवर्टर', 'fr': 'Convertisseur de Longueur', 'pt': 'Conversor de Comprimento', 'de': 'Längen-Umrechner', 'ar': 'محول الطول', 'ja': '長さ変換器',
    'zh-cn': '长度转换器', 'zh-tw': '長度轉換器', 'ru': 'Конвертер длины', 'it': 'Convertitore di lunghezza', 'nl': 'Lengte omrekenen', 'tr': 'Uzunluk Dönüştürücü', 'ko': '길이 변환기', 'id': 'Konverter Panjang', 'vi': 'Bộ chuyển đổi chiều dài', 'th': 'เครื่องแปลงความยาว', 'pl': 'Konwerter długości', 'uk': 'Конвертер довжини', 'ro': 'Convertor de lungime', 'el': 'Μετατροπέας μήκους', 'sv': 'Längdkonverterare', 'no': 'Lengdekonverterer', 'da': 'Længdeomregner', 'fi': 'Pituudenmuunnin', 'cs': 'Převodník délky', 'hu': 'Hosszúság átváltó', 'he': 'ממיר אורך', 'ms': 'Penukar Panjang', 'bn': 'দৈর্ঘ্য রূপান্তরকারী', 'ta': 'நீள மாற்றி', 'te': 'పొడవు మార్పిడి', 'mr': 'लांबी कनवर्टर', 'gu': 'લંબાઈ કન્વર્ટર', 'pa': 'ਲੰਬਾਈ ਕਨਵਰਟਰ', 'ur': 'لمبائی کنورٹر', 'fa': 'مبدल طول', 'tl': 'Tagasalin ng Haba'
  },
  'weight-mass': {
    'en': 'Weight & Mass Converter', 'es': 'Conversor de Peso y Masa', 'hi': 'वजन और द्रव्यमान कनवर्टर', 'fr': 'Convertisseur de Poids et Masse', 'pt': 'Conversor de Peso e Massa', 'de': 'Gewichts-Umrechner', 'ar': 'محول الوزن والكتلة', 'ja': '重さ・質量変換器',
    'zh-cn': '重量和质量转换器', 'zh-tw': '重量和質量轉換器', 'ru': 'Конвертер वेса и массы', 'it': 'Convertitore di peso e massa', 'nl': 'Gewicht omrekenen', 'tr': 'Ağıرلık ve Kütle Dönüştürücü', 'ko': '무게 및 질량 변환기', 'id': 'Konverter Berat & Massa', 'vi': 'Bộ chuyển đổi trọng lượng & khối lượng', 'th': 'เครื่องแปลงน้ำหนักและมวล', 'pl': 'Konwerter wagi i masy', 'uk': 'Конвертер ваги та маси', 'ro': 'Convertor de greutate și masă', 'el': 'Μετατροπέας βάρους & μάζας', 'sv': 'Vikt- och masskonverterare', 'no': 'Vektkonverterer', 'da': 'Vægtomregner', 'fi': 'Painonmuunnin', 'cs': 'Převodník hmotnosti', 'hu': 'Tömeg átváltó', 'he': 'ממיר משקל ומסה', 'ms': 'Penukar Berat & Jisim', 'bn': 'ওজন এবং ভর রূপান্তরকারী', 'ta': 'எடை மற்றும் நிறை மாற்றி', 'te': 'బరువు आणि ద్రవ్యరాశి మార్పిడి', 'mr': 'वजन आणि वस्तुमान कनवर्टर', 'gu': 'વજન અને દળ કન્વર્ટર', 'pa': 'ਭਾਰ आणि ਪੁੰਜ ਕਨਵਰਟਰ', 'ur': 'وزن اور मास کنورٹر', 'fa': 'مبدل وزن و جرم', 'tl': 'Tagasalin ng Timbang'
  },
  'temperature': {
    'en': 'Temperature Converter', 'es': 'Conversor de Temperatura', 'hi': 'तापमान कनवर्टर', 'fr': 'Convertisseur de Température', 'pt': 'Conversor de Temperatura', 'de': 'Temperatur-Umrechner', 'ar': 'محول درجة الحرارة', 'ja': '温度変換器',
    'zh-cn': '温度转换器', 'zh-tw': '溫度轉換器', 'ru': 'Конвертер температуры', 'it': 'Convertitore di temperatura', 'nl': 'Temperatuur omrekenen', 'tr': 'Sıcaklık Dönüştürücü', 'ko': '온도 변환기', 'id': 'Konverter Suhu', 'vi': 'Bộ chuyển đổi nhiệt độ', 'th': 'เครื่องแปลงอุณหภูมิ', 'pl': 'Konwerter temperatury', 'uk': 'Конвертер температури', 'ro': 'Convertor de temperatură', 'el': 'Μετατροπέας θερμοκρασίας', 'sv': 'Temperaturkonverterare', 'no': 'Temperaturkonverterer', 'da': 'Temperaturomregner', 'fi': 'Lämpötilanmuunnin', 'cs': 'Převodník teploty', 'hu': 'Hőmérséklet átváltó', 'he': 'ממיר טמპერטורה', 'ms': 'Penukar Suhu', 'bn': 'तापমাত্রা रूपান্তরকারী', 'ta': 'வெப்பநிலை மாற்றி', 'te': 'ఉష్ణోగ్రత మార్పిడి', 'mr': 'तापमान कनवर्टर', 'gu': 'તાપમાન કન્વર્ટર', 'pa': 'ਤਾપમાન ਕਨਵਰਟਰ', 'ur': 'درجہ حرارت کنورٹر', 'fa': 'مبدل دما', 'tl': 'Tagasalin ng Temperatura'
  },
  'area': {
    'en': 'Area Converter', 'es': 'Conversor de Área', 'hi': 'क्षेत्रफल कनवर्टर', 'fr': 'Convertisseur de Superficie', 'pt': 'Conversor de Área', 'de': 'Flächen-Umrechner', 'ar': 'محول المساحة', 'ja': '面積変換器',
    'zh-cn': '面积转换器', 'zh-tw': '面積轉換器', 'ru': 'Конвертер площади', 'it': 'Convertitore di area', 'nl': 'Oppervlakte omrekenen', 'tr': 'Alan Dönüştürücü', 'ko': '면적 변환기', 'id': 'Konverter Luas', 'vi': 'Bộ chuyển đổi diện tích', 'th': 'เครื่องแปลงพื้นที่', 'pl': 'Konwerter powierzchni', 'uk': 'Конвертер площі', 'ro': 'Convertor de arie', 'el': 'Μετατροπέας εμβαδού', 'sv': 'Areakonverterare', 'no': 'Arealkonverterer', 'da': 'Arealomregner', 'fi': 'Pinta-alanmuunnin', 'cs': 'Převodník plochy', 'hu': 'Terület átváltó', 'he': 'ממיר שטח', 'ms': 'Penukar Luas', 'bn': 'क्षेत्रफल रूपান্তরকারী', 'ta': 'பரப்பளவு மாற்றி', 'te': 'వైశाल్యం మార్పిడి', 'mr': 'क्षेत्रफळ कनवर्टर', 'gu': 'ક્ષેત્રફળ કન્વર્ટર', 'pa': 'ખેતરફલ કનવરટર', 'ur': 'رقبے کا کنورٹر', 'fa': 'مبدل مساحت', 'tl': 'Tagasalin ng Lawak'
  },
  'volume': {
    'en': 'Volume Converter', 'es': 'Conversor de Volumen', 'hi': 'आयतन कनवर्टर', 'fr': 'Convertisseur de Volume', 'pt': 'Conversor de Volume', 'de': 'Volumen-Umrechner', 'ar': 'محول الحجم', 'ja': '体積変換器',
    'zh-cn': '体积转换器', 'zh-tw': '體積轉換器', 'ru': 'Конвертер объема', 'it': 'Convertitore di volume', 'nl': 'Inhoud omrekenen', 'tr': 'Hacim Dönüştürücü', 'ko': '부피 변환기', 'id': 'Konverter Volume', 'vi': 'Bộ chuyển đổi thể tích', 'th': 'เครื่องแปลงปริมาตร', 'pl': 'Konwerter objętości', 'uk': 'Конвертер об\'єму', 'ro': 'Convertor de volum', 'el': 'Μετατροπέας όγκου', 'sv': 'Volymkonverterare', 'no': 'Volumkonverterer', 'da': 'Volumenomregner', 'fi': 'Tilavuudenmuunnin', 'cs': 'Převodník objemu', 'hu': 'Térfogat átváltó', 'he': 'ממיר נפח', 'ms': 'Penukar Isi Padu', 'bn': 'आयतन रूपান্তরকারী', 'ta': 'கனஅளவு மாற்றி', 'te': 'ఘనపరిమాణం మార్పిడి', 'mr': 'आयतन कनवर्टर', 'gu': 'કદ કન્વર્ટર', 'pa': 'ਆਇਤਨ ਕਨਵਰਟਰ', 'ur': 'حجم کنورٹر', 'fa': 'مبدل حجم', 'tl': 'Tagasalin ng Dami'
  },
  'speed': {
    'en': 'Speed Converter', 'es': 'Conversor de Velocidad', 'hi': 'गति कनवर्टर', 'fr': 'Convertisseur de Vitesse', 'pt': 'Conversor de Velocidade', 'de': 'Geschwindigkeits-Umrechner', 'ar': 'محول السرعة', 'ja': '速度変換器',
    'zh-cn': '速度转换器', 'zh-tw': '速度轉換器', 'ru': 'Конвертер скорости', 'it': 'Convertitore di velocità', 'nl': 'Snelheid omrekenen', 'tr': 'Hız Dönüştürücü', 'ko': '속도 변환기', 'id': 'Konverter Kecepatan', 'vi': 'Bộ chuyển đổi tốc độ', 'th': 'เครื่องแปลงความเร็ว', 'pl': 'Konwerter prędkości', 'uk': 'Конвертер швидкості', 'ro': 'Convertor de viteză', 'el': 'Μετατροπέας ταχύτητας', 'sv': 'Hastighetskonverterare', 'no': 'Hastighetskonverterer', 'da': 'Hastighedsomregner', 'fi': 'Nopeudenmuunnin', 'cs': 'Převodník rychlosti', 'hu': 'Sebesség átváltó', 'he': 'ממיר מהירות', 'ms': 'Penukar Kelajuan', 'bn': 'गति रूपান্তরকারী', 'ta': 'வேக மாற்றி', 'te': 'వేగం మార్పిడి', 'mr': 'वेग कनवर्टर', 'gu': 'ઝડપ કન્વર્ટર', 'pa': 'ਗਤੀ कनवर्टर', 'ur': 'رفتار कन्वर्टर', 'fa': 'مبدل سرعت', 'tl': 'Tagasalin ng Bilis'
  },
  'time': {
    'en': 'Time Converter', 'es': 'Conversor de Time', 'hi': 'समय कनवर्टर', 'fr': 'Convertisseur de Temps', 'pt': 'Conversor de Tempo', 'de': 'Zeit-Umrechner', 'ar': 'محول الوقت', 'ja': '時間変換器',
    'zh-cn': '时间转换器', 'zh-tw': '時間轉換器', 'ru': 'Конвертер времени', 'it': 'Convertitore di tempo', 'nl': 'Tijd omrekenen', 'tr': 'Zaman Dönüştürücü', 'ko': '시간 변환기', 'id': 'Konverter Waktu', 'vi': 'Bộ chuyển đổi thời gian', 'th': 'เครื่องแปลงเวลา', 'pl': 'Konwerter czasu', 'uk': 'Конвертер часу', 'ro': 'Convertor de timp', 'el': 'Μετατροπέας χρόνου', 'sv': 'Tidskonverterare', 'no': 'Tidskonverterer', 'da': 'Tidomregner', 'fi': 'Ajanmuunnin', 'cs': 'Převodník času', 'hu': 'Idő átváltó', 'he': 'ממיר זמן', 'ms': 'Penukar Masa', 'bn': 'समय रूपান্তরকারী', 'ta': 'நேர மாற்றி', 'te': 'సమయం మార్పిడి', 'mr': 'वेळ कनवर्टर', 'gu': 'સમય કન્વર્ટર', 'pa': 'ਸਮਾਂ ਕਨਵਰਟਰ', 'ur': 'وقت کنورٹر', 'fa': 'مبدल زمان', 'tl': 'Tagasalin ng Oras'
  },
  'currency': {
    'en': 'Currency Converter', 'es': 'Conversor de Divisas', 'hi': 'मुद्रा कनवर्टर', 'fr': 'Convertisseur de Devises', 'pt': 'Conversor de Moedas', 'de': 'Währungs-Umrechner', 'ar': 'محول العملات', 'ja': '通貨変換器',
    'zh-cn': '货币转换器', 'zh-tw': '貨幣轉換器', 'ru': 'Конвертер валют', 'it': 'Convertitore di valuta', 'nl': 'Valuta omrekenen', 'tr': 'Para Birimi Dönüştürücü', 'ko': '환율 변환기', 'id': 'Konverter Mata Uang', 'vi': 'Bộ chuyển đổi tiền tệ', 'th': 'เครื่องแปลงสกุลเงิน', 'pl': 'Konwerter walut', 'uk': 'Конвертер валют', 'ro': 'Convertor valutar', 'el': 'Μετατροπέας συναλλάγματος', 'sv': 'Valutakonverterare', 'no': 'Valutakonverterer', 'da': 'Valutaomregner', 'fi': 'Valuuttamuunnin', 'cs': 'Převodník měn', 'hu': 'Pénznem átváltó', 'he': 'ממיר מטבעות', 'ms': 'Penukar Mata Wang', 'bn': 'মুদ্রা रूपান্তরকারী', 'ta': 'நாணய மாற்றி', 'te': 'కరెన్సీ మార్పిడి', 'mr': 'चलन कनवर्टर', 'gu': 'ચલણ કન્વર્ટર', 'pa': 'ਮੁਦરા ਕਨવરટર', 'ur': 'کرنسی کنورٹر', 'fa': 'مبدل ارز', 'tl': 'Tagasalin ng Salapi'
  },
  'binary': {
    'en': 'Binary Converter', 'es': 'Conversor Binario', 'hi': 'बाइनरी कनवर्टर', 'fr': 'Convertisseur Binaire', 'pt': 'Conversor Binário', 'de': 'Binär-Umrechner', 'ar': 'محول ثنائي', 'ja': '2進数変換器',
    'zh-cn': '二进制转换器', 'zh-tw': '二進位轉換器', 'ru': 'Двоичный конвертер', 'it': 'Convertitore binario', 'nl': 'Binair omrekenen', 'tr': 'İkili Dönüştürücü', 'ko': '2진수 변환기', 'id': 'Konverter Biner', 'vi': 'Bộ chuyển đổi nhị phân', 'th': 'เครื่องแปลงเลขฐานสอง', 'pl': 'Konwerter binarny', 'uk': 'Двійковий конвертер', 'ro': 'Convertor binar', 'el': 'Δυαδικός μετατροπέας', 'sv': 'Binär konverterare', 'no': 'Binærkonverterer', 'da': 'Binær omregner', 'fi': 'Binäärimuunnin', 'cs': 'Binární převodník', 'hu': 'Bináris átváltó', 'he': 'ממיר בינאሪ', 'ms': 'Penukar Perduaan', 'bn': '바이너리 রূপান্তরকারী', 'ta': 'இருநிலை மாற்றி', 'te': 'బైనరీ మార్పిడి', 'mr': 'बायनरी कनवर्टर', 'gu': 'બાયનરી કન્વર્ટર', 'pa': 'ਬਾਇਨਰੀ ਕਨવરટર', 'ur': 'بائنری کنورٹر', 'fa': 'مبدل باینری', 'tl': 'Tagasalin ng Binary'
  }
};

// 2. Read the injected 47 categories from scratch/inject_translations.js
const injectScriptPath = path.join(__dirname, 'inject_translations.js');
let injectContent = fs.readFileSync(injectScriptPath, 'utf8');

// Extract the translation object using regex
const transRegex = /const translations = (\{[\s\S]*?\n\};)/;
const transMatch = transRegex.exec(injectContent);

if (!transMatch) {
  console.error("Could not extract translations from inject_translations.js");
  process.exit(1);
}

// Evaluate it safely to a JavaScript object
let translations;
eval('translations = ' + transMatch[1]);

// 3. Combine them
const combined = { ...defaultCategories };
for (const [key, val] of Object.entries(translations)) {
  combined[key] = val;
}

// 4. Apply correct Marathi translations
const marathiFixes = {
  'pressure': 'दाब कनवर्टर',
  'power': 'पॉवर कनवर्टर',
  'current': 'विद्युत प्रवाह कनवर्टर',
  'resistance': 'रोध कनवर्टर',
  'capacitance': 'कॅपॅसिटन्स कनवर्टर',
  'inductance': 'इंडक्टन्स कनवर्टर',
  'data-transfer-rate': 'डेटा ट्रान्सफर रेट कनवर्टर',
  'bandwidth': 'बँडविड्थ कनवर्टर',
  'radiation': 'रेडिएशन कनवर्टर',
  'heat': 'उष्णता कनवर्टर',
  'engineering': 'अभियांत्रिकी कनवर्टर्स',
  'electrical': 'विद्युत कनवर्टर',
  'miscellaneous': 'विविध कनवर्टर्स',
  'percentage': 'टक्केवारी कॅल्क्युलेटर',
  'bmi': 'BMI कॅल्क्युलेटर',
  'bmr': 'BMR कॅल्क्युलेटर',
  'calorie': 'कॅलरी कॅल्क्युलेटर',
  'age': 'वय कॅल्क्युलेटर',
  'gpa': 'GPA कॅल्क्युलेटर',
  'discount': 'सवलत कॅल्क्युलेटर',
  'loan': 'कर्ज कॅल्क्युलेटर',
  'emi': 'EMI कॅल्क्युलेटर',
  'scientific': 'वैज्ञानिक कॅल्क्युलेटर',
  'interest': 'व्याज कॅल्क्युलेटर',
  'simple-interest': 'सरळ व्याज कॅल्क्युलेटर',
  'compound-interest': 'चक्रवाढ व्याज कॅल्क्युलेटर',
  'gst': 'GST कॅल्क्युलेटर',
  'marks-percentage': 'गुण टक्केवारी कॅल्क्युलेटर',
  'date-difference': 'तारीख फरक कॅल्क्युलेटर',
  'time-duration': 'वेळेचा कालावधी कॅल्क्युलेटर',
  'average': 'सरासरी कॅल्क्युलेटर',
  'scientific-notation': 'वैज्ञानिक संकेत कनवर्टर',
  'number-base': 'नंबर बेस कनवर्टर',
  'fraction': 'अपूर्णांक कॅल्क्युलेटर',
  'ratio': 'गुणोत्तर कॅल्क्युलेटर',
  'unit-prefix': 'युनिट प्रीफिक्स कनवर्टर',
  'number-system': 'संख्या प्रणाली कनवर्टर'
};

for (const [key, correctVal] of Object.entries(marathiFixes)) {
  if (combined[key]) {
    combined[key]['mr'] = correctVal;
  }
}

// 5. Serialize combined back into i18n.ts
const searchStr = 'export const unitTranslations: Record<string, Record<string, string>> = {';
const insertIndex = content.indexOf(searchStr);

if (insertIndex === -1) {
  console.error("Could not find unitTranslations export in i18n.ts");
  process.exit(1);
}

// Check if categoryTranslations already exists (just to be safe)
if (content.includes('export const categoryTranslations')) {
  console.log("categoryTranslations is already in i18n.ts! Cleaning it up first.");
  // remove existing declaration
  const catRegex = /export const categoryTranslations: Record<string, Record<string, string>> = \{[\s\S]*?\n\};\n\n/;
  content = content.replace(catRegex, '');
}

// Format categoryTranslations block
let catText = 'export const categoryTranslations: Record<string, Record<string, string>> = {\n';
for (const [key, value] of Object.entries(combined)) {
  catText += `  '${key}': {\n`;
  const entries = Object.entries(value).map(([lang, val]) => `    '${lang}': ${JSON.stringify(val)}`).join(', ');
  catText += `    ${entries}\n  },\n`;
}
catText += '};\n\n';

// Insert it right before unitTranslations
const updatedContent = content.slice(0, insertIndex) + catText + content.slice(insertIndex);
fs.writeFileSync(i18nFilePath, updatedContent, 'utf8');

console.log("Successfully recreated and injected categoryTranslations object!");
