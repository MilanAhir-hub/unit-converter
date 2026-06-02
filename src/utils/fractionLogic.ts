export interface Fraction {
  n: number;
  d: number;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a === 0 ? 1 : a;
}

export function simplify(f: Fraction): Fraction {
  if (f.d === 0) throw new Error("Division by zero");
  if (f.n === 0) return { n: 0, d: 1 };

  let isNegative = (f.n < 0 && f.d > 0) || (f.n > 0 && f.d < 0);
  let absN = Math.abs(f.n);
  let absD = Math.abs(f.d);
  
  let divisor = gcd(absN, absD);
  return {
    n: isNegative ? -(absN / divisor) : (absN / divisor),
    d: absD / divisor
  };
}

export function parseFraction(str: string): Fraction | null {
  str = str.trim();
  if (!str) return null;

  // Decimal check
  if (str.includes('.') && !str.includes('/')) {
    const num = parseFloat(str);
    if (isNaN(num)) return null;
    // convert decimal to fraction precisely
    const parts = str.split('.');
    let decimals = parts[1] ? parts[1].length : 0;
    const factor = Math.pow(10, decimals);
    return simplify({ n: Math.round(num * factor), d: factor });
  }

  // Mixed fraction: e.g. "2 1/3", "-2 1/3"
  const mixedMatch = str.match(/^(-?)\s*(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const isNeg = mixedMatch[1] === '-';
    const whole = parseInt(mixedMatch[2], 10);
    const num = parseInt(mixedMatch[3], 10);
    const den = parseInt(mixedMatch[4], 10);
    
    if (den === 0) return null;
    let totalNum = (whole * den) + num;
    return simplify({ n: isNeg ? -totalNum : totalNum, d: den });
  }

  // Simple fraction: e.g. "1/2", "-5/8"
  const fracMatch = str.match(/^(-?\d+)\/(-?\d+)$/);
  if (fracMatch) {
    const num = parseInt(fracMatch[1], 10);
    const den = parseInt(fracMatch[2], 10);
    if (den === 0) return null;
    return simplify({ n: num, d: den });
  }

  // Whole number: e.g. "5", "-5"
  const wholeMatch = str.match(/^(-?\d+)$/);
  if (wholeMatch) {
    const num = parseInt(wholeMatch[1], 10);
    return { n: num, d: 1 };
  }

  return null; // Invalid format
}

export function add(f1: Fraction, f2: Fraction): Fraction {
  return simplify({
    n: (f1.n * f2.d) + (f2.n * f1.d),
    d: f1.d * f2.d
  });
}

export function sub(f1: Fraction, f2: Fraction): Fraction {
  return simplify({
    n: (f1.n * f2.d) - (f2.n * f1.d),
    d: f1.d * f2.d
  });
}

export function mul(f1: Fraction, f2: Fraction): Fraction {
  return simplify({
    n: f1.n * f2.n,
    d: f1.d * f2.d
  });
}

export function div(f1: Fraction, f2: Fraction): Fraction {
  if (f2.n === 0) throw new Error("Cannot divide by zero fraction");
  return simplify({
    n: f1.n * f2.d,
    d: f1.d * f2.n
  });
}

export function formatFraction(f: Fraction): string {
  if (f.d === 1) return f.n.toString();
  return `${f.n}/${f.d}`;
}

export function formatMixed(f: Fraction): string | null {
  if (f.d === 1) return null; // Not mixed, just integer
  const absN = Math.abs(f.n);
  if (absN < f.d) return null; // Proper fraction
  
  const whole = Math.floor(absN / f.d);
  const rem = absN % f.d;
  
  if (rem === 0) return (f.n < 0 ? "-" : "") + whole.toString();
  
  return (f.n < 0 ? "-" : "") + `${whole} ${rem}/${f.d}`;
}

export function formatDecimal(f: Fraction): string {
  const dec = f.n / f.d;
  // Handle IEEE 754 precision issues
  return parseFloat(dec.toFixed(8)).toString();
}

export function formatPercentage(f: Fraction): string {
  const dec = (f.n / f.d) * 100;
  return parseFloat(dec.toFixed(6)).toString() + "%";
}
