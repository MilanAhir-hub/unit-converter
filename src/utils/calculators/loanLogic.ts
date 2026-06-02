export interface LoanResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

/**
 * Calculates Equated Monthly Installment (EMI), Total Interest, and Total Payment.
 * Uses the banking-standard amortization formula.
 * 
 * @param principal The loan amount.
 * @param annualRate The annual interest rate in percentage.
 * @param months The loan duration in months.
 */
export function calculateLoan(principal: number, annualRate: number, months: number): LoanResult | null {
  if (
    typeof principal !== 'number' || 
    typeof annualRate !== 'number' ||
    typeof months !== 'number' ||
    isNaN(principal) || 
    isNaN(annualRate) ||
    isNaN(months) ||
    principal <= 0 || 
    annualRate < 0 ||
    months <= 0 ||
    !isFinite(principal) ||
    !isFinite(annualRate) ||
    !isFinite(months)
  ) {
    return null;
  }

  // Handle 0% interest case
  if (annualRate === 0) {
    const emi0 = principal / months;
    return {
      emi: Math.round(emi0 * 100) / 100,
      totalInterest: 0,
      totalPayment: principal
    };
  }

  // Monthly interest rate
  const r = annualRate / (12 * 100);
  
  // Banking formula for EMI: P * r * (1+r)^n / ((1+r)^n - 1)
  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  // Financial rounding to 2 decimal places
  return {
    emi: Math.round(emi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100
  };
}
