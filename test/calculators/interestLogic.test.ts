import { describe, it, expect } from 'vitest';
import { calculateSimpleInterest, calculateCompoundInterest } from '../../src/utils/calculators/interestLogic';

describe('Interest Calculator Logic', () => {
  describe('Simple Interest', () => {
    it('calculates simple interest correctly', () => {
      // 10,000 at 5% for 3 years -> 1500
      const res = calculateSimpleInterest(10000, 5, 3);
      expect(res).not.toBeNull();
      expect(res!.interestAmount).toBe(1500);
      expect(res!.totalAmount).toBe(11500);
    });

    it('rejects invalid inputs', () => {
      expect(calculateSimpleInterest(-10000, 5, 3)).toBeNull();
      expect(calculateSimpleInterest(10000, -5, 3)).toBeNull();
      expect(calculateSimpleInterest(NaN, 5, 3)).toBeNull();
    });
  });

  describe('Compound Interest', () => {
    it('calculates compound interest correctly (annual)', () => {
      // 10,000 at 5% for 3 years, compounded annually
      // 10000 * (1 + 0.05)^3 = 11576.25
      const res = calculateCompoundInterest(10000, 5, 3, 1);
      expect(res).not.toBeNull();
      expect(res!.totalAmount).toBe(11576.25);
      expect(res!.interestAmount).toBe(1576.25);
    });

    it('calculates compound interest correctly (monthly)', () => {
      // 10,000 at 5% for 3 years, compounded monthly (12)
      // 10000 * (1 + 0.05/12)^(36) = 11614.72
      const res = calculateCompoundInterest(10000, 5, 3, 12);
      expect(res).not.toBeNull();
      expect(res!.totalAmount).toBe(11614.72);
      expect(res!.interestAmount).toBe(1614.72);
    });

    it('rejects invalid inputs', () => {
      expect(calculateCompoundInterest(-10000, 5, 3, 12)).toBeNull();
      expect(calculateCompoundInterest(10000, 5, 3, 0)).toBeNull(); // 0 compounds per year invalid
      expect(calculateCompoundInterest(10000, 5, -3, 12)).toBeNull();
    });
  });
});
