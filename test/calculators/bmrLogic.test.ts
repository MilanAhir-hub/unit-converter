import { describe, it, expect } from 'vitest';
import { calculateBMR } from '../../src/utils/calculators/bmrLogic';

describe('BMR Calculator Logic', () => {
  it('calculates BMR for a male correctly', () => {
    // 70kg, 175cm, 25 years, male
    // 10*70 + 6.25*175 - 5*25 + 5 = 700 + 1093.75 - 125 + 5 = 1673.75 => 1674
    expect(calculateBMR(70, 175, 25, true)).toBe(1674);
  });

  it('calculates BMR for a female correctly', () => {
    // 60kg, 160cm, 30 years, female
    // 10*60 + 6.25*160 - 5*30 - 161 = 600 + 1000 - 150 - 161 = 1289
    expect(calculateBMR(60, 160, 30, false)).toBe(1289);
  });

  it('rejects invalid inputs', () => {
    expect(calculateBMR(-70, 175, 25, true)).toBeNull();
    expect(calculateBMR(70, -175, 25, true)).toBeNull();
    expect(calculateBMR(70, 175, -5, true)).toBeNull();
    expect(calculateBMR(70, 175, 151, true)).toBeNull();
    expect(calculateBMR(NaN, 175, 25, true)).toBeNull();
    expect(calculateBMR(70, 175, Infinity, true)).toBeNull();
  });
});
