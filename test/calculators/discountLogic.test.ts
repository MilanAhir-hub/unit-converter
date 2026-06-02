import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../../src/utils/calculators/discountLogic';

describe('Discount Calculator Logic', () => {
  it('calculates simple discount correctly', () => {
    const res = calculateDiscount(100, 20);
    expect(res).not.toBeNull();
    expect(res!.discountAmount).toBe(20);
    expect(res!.finalPrice).toBe(80);
  });

  it('calculates decimal discount and rounds to 2 places', () => {
    const res = calculateDiscount(49.99, 15);
    // 49.99 * 0.15 = 7.4985 => 7.50
    // 49.99 - 7.50 = 42.49
    expect(res).not.toBeNull();
    expect(res!.discountAmount).toBe(7.50);
    expect(res!.finalPrice).toBe(42.49);
  });

  it('handles >100% discount by clamping to 0 final price', () => {
    const res = calculateDiscount(100, 150);
    expect(res).not.toBeNull();
    expect(res!.discountAmount).toBe(100);
    expect(res!.finalPrice).toBe(0);
  });

  it('rejects invalid inputs', () => {
    expect(calculateDiscount(-100, 20)).toBeNull();
    expect(calculateDiscount(100, -20)).toBeNull();
    expect(calculateDiscount(NaN, 20)).toBeNull();
    expect(calculateDiscount(100, Infinity)).toBeNull();
  });
});
