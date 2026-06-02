export const prefixes: Record<string, number> = {
  quetta: 30,
  ronna: 27,
  yotta: 24,
  zetta: 21,
  exa: 18,
  peta: 15,
  tera: 12,
  giga: 9,
  mega: 6,
  kilo: 3,
  hecto: 2,
  deca: 1,
  base: 0,
  deci: -1,
  centi: -2,
  milli: -3,
  micro: -6,
  nano: -9,
  pico: -12,
  femto: -15,
  atto: -18,
  zepto: -21,
  yocto: -24,
  ronto: -27,
  quecto: -30
};

export interface ConversionResult {
  valueStr: string;
  scientificStr: string;
  formulaStr: string;
}

/**
 * Parses a numeric string (e.g., "-1.5e-4", "123", "0.005") into a mantissa and an exponent.
 * Mantissa is kept as a precise string to avoid floating point issues during extraction.
 */
function parseToScientificComponents(input: string): { mantissa: number, exponent: number } | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;
  
  const num = Number(trimmed);
  if (isNaN(num) || !isFinite(num)) return null;
  if (num === 0) return { mantissa: 0, exponent: 0 };

  // Use JS native exponential formatting to standardize the parts
  // 15 digits of precision covers double-precision safely.
  const sciStr = num.toExponential(15);
  
  const [mantissaStr, expStr] = sciStr.split('e');
  let mantissa = parseFloat(mantissaStr);
  const exponent = parseInt(expStr, 10);

  // Clean up floating point trailing zeroes from the toExponential(15) string
  mantissa = parseFloat(mantissa.toPrecision(15));
  
  return { mantissa, exponent };
}

/**
 * Converts a value between two SI prefixes using exact exponential arithmetic.
 */
export function convertPrefix(inputValue: string, fromKey: string, toKey: string): ConversionResult | null {
  const parsed = parseToScientificComponents(inputValue);
  if (!parsed) return null;

  const fromExp = prefixes[fromKey];
  const toExp = prefixes[toKey];

  if (fromExp === undefined || toExp === undefined) return null;

  const { mantissa, exponent: inputExp } = parsed;

  if (mantissa === 0) {
    return {
      valueStr: '0',
      scientificStr: '0 × 10⁰',
      formulaStr: `0 × 10^(${fromExp} - ${toExp})`
    };
  }

  // Pure exponent math: Result = Input * 10^(fromExp - toExp)
  const diffExp = fromExp - toExp;
  const finalExp = inputExp + diffExp;

  // Format Scientific String (e.g. 1.5 × 10^3)
  const scientificStr = `${mantissa} × 10${formatSuperscript(finalExp)}`;

  // Format Full Decimal String
  // We use standard Number formatting up to 1e20 / 1e-20. 
  // Beyond that, JS forces scientific notation natively, which is acceptable since "full decimal"
  // for 10^30 is unreasonably long for UI anyway, but we will try to format up to 20 decimals.
  let valueStr = '';
  const magnitude = Math.abs(finalExp);
  
  if (magnitude > 20) {
     valueStr = `${mantissa}e${finalExp >= 0 ? '+' : ''}${finalExp}`;
  } else {
     // Reconstruct decimal value using standard multiplication
     // Since magnitude <= 20, Number() handles it well without scientific notation if formatted right.
     const numVal = Number(`${mantissa}e${finalExp}`);
     valueStr = numVal.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 20 });
  }

  // Formula
  let formulaStr = '';
  if (inputExp === 0) {
     formulaStr = `${mantissa} × 10^(${fromExp} - ${toExp < 0 ? `(${toExp})` : toExp})`;
  } else {
     formulaStr = `(${mantissa} × 10^${inputExp}) × 10^(${fromExp} - ${toExp < 0 ? `(${toExp})` : toExp})`;
  }

  return {
    valueStr,
    scientificStr,
    formulaStr
  };
}

/**
 * Converts integer exponent into unicode superscript characters.
 */
export function formatSuperscript(exp: number): string {
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '-': '⁻'
  };
  return exp.toString().split('').map(char => superscripts[char] || char).join('');
}
