import { describe, it, expect } from 'vitest';
import { calculateLoan } from '../../src/utils/calculators/loanLogic';

describe('Loan/EMI Calculator Logic', () => {
  it('calculates standard loan EMI correctly', () => {
    // 100,000 at 10% for 12 months
    // r = 0.1 / 12 = 0.00833333
    // EMI = 100000 * r * (1+r)^12 / ((1+r)^12 - 1) = ~8791.59
    const res = calculateLoan(100000, 10, 12);
    expect(res).not.toBeNull();
    expect(res!.emi).toBe(8791.59);
    expect(res!.totalPayment).toBe(105499.06); // 8791.588... * 12
    // total interest = 5499.06
    expect(res!.totalInterest).toBe(5499.06); // Allow rounding buffer
  });

  it('handles 0% interest', () => {
    const res = calculateLoan(12000, 0, 12);
    expect(res).not.toBeNull();
    expect(res!.emi).toBe(1000);
    expect(res!.totalInterest).toBe(0);
    expect(res!.totalPayment).toBe(12000);
  });

  it('rejects invalid inputs', () => {
    expect(calculateLoan(-100000, 10, 12)).toBeNull();
    expect(calculateLoan(100000, -10, 12)).toBeNull();
    expect(calculateLoan(100000, 10, -12)).toBeNull();
    expect(calculateLoan(NaN, 10, 12)).toBeNull();
  });
});
