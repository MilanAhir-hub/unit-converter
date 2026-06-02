import { describe, it, expect } from 'vitest';
import { calculateGST } from '../../src/utils/calculators/gstLogic';

describe('GST Calculator Logic', () => {
  it('adds GST correctly', () => {
    // 100 + 18% = 118
    const res = calculateGST(100, 18, 'add');
    expect(res).not.toBeNull();
    expect(res!.netPrice).toBe(100);
    expect(res!.gstAmount).toBe(18);
    expect(res!.grossPrice).toBe(118);
  });

  it('removes GST correctly', () => {
    // 118 with 18% GST included -> 100 net
    const res = calculateGST(118, 18, 'remove');
    expect(res).not.toBeNull();
    expect(res!.netPrice).toBe(100);
    expect(res!.gstAmount).toBe(18);
    expect(res!.grossPrice).toBe(118);
  });

  it('handles decimal rounding', () => {
    // 50 + 12% = 56
    const res = calculateGST(50.55, 12, 'add');
    // 50.55 * 0.12 = 6.066 => 6.07
    // 50.55 + 6.07 = 56.62
    expect(res).not.toBeNull();
    expect(res!.netPrice).toBe(50.55);
    expect(res!.gstAmount).toBe(6.07);
    expect(res!.grossPrice).toBe(56.62);
  });

  it('rejects invalid inputs', () => {
    expect(calculateGST(-100, 18, 'add')).toBeNull();
    expect(calculateGST(100, -18, 'add')).toBeNull();
    expect(calculateGST(NaN, 18, 'remove')).toBeNull();
  });
});
