export interface InterestResult {
  interestAmount: number;
  totalAmount: number;
}

/**
 * Calculates Simple Interest
 * Formula: SI = (P * R * T) / 100
 */
export function calculateSimpleInterest(principal: number, annualRate: number, timeYears: number): InterestResult | null {
  if (
    typeof principal !== 'number' || 
    typeof annualRate !== 'number' ||
    typeof timeYears !== 'number' ||
    isNaN(principal) || 
    isNaN(annualRate) ||
    isNaN(timeYears) ||
    principal < 0 || 
    annualRate < 0 ||
    timeYears < 0 ||
    !isFinite(principal) ||
    !isFinite(annualRate) ||
    !isFinite(timeYears)
  ) {
    return null;
  }

  const interestAmount = (principal * annualRate * timeYears) / 100;
  const totalAmount = principal + interestAmount;

  return {
    interestAmount: Math.round(interestAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100
  };
}

/**
 * Calculates Compound Interest
 * Formula: A = P(1 + r/n)^(nt)
 * where r is decimal rate, n is compounding frequency
 */
export function calculateCompoundInterest(principal: number, annualRate: number, timeYears: number, compoundsPerYear: number): InterestResult | null {
  if (
    typeof principal !== 'number' || 
    typeof annualRate !== 'number' ||
    typeof timeYears !== 'number' ||
    typeof compoundsPerYear !== 'number' ||
    isNaN(principal) || 
    isNaN(annualRate) ||
    isNaN(timeYears) ||
    isNaN(compoundsPerYear) ||
    principal < 0 || 
    annualRate < 0 ||
    timeYears < 0 ||
    compoundsPerYear <= 0 ||
    !isFinite(principal) ||
    !isFinite(annualRate) ||
    !isFinite(timeYears)
  ) {
    return null;
  }

  const r = annualRate / 100;
  const n = compoundsPerYear;
  const t = timeYears;

  const amount = principal * Math.pow(1 + (r / n), n * t);
  const interestAmount = amount - principal;

  return {
    interestAmount: Math.round(interestAmount * 100) / 100,
    totalAmount: Math.round(amount * 100) / 100
  };
}
