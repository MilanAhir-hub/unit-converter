import { describe, it, expect } from 'vitest';
import { calculateAge } from '../../src/utils/calculators/ageLogic';

describe('Age Calculator Logic', () => {
  it('calculates simple age correctly', () => {
    const res = calculateAge('2000-01-01', '2020-01-01');
    expect(res).not.toBeNull();
    expect(res!.years).toBe(20);
    expect(res!.months).toBe(0);
    expect(res!.days).toBe(0);
  });

  it('calculates leap year correctly', () => {
    // 2000-02-29 to 2001-02-28
    const res = calculateAge('2000-02-29', '2001-02-28');
    expect(res).not.toBeNull();
    expect(res!.years).toBe(0);
    expect(res!.months).toBe(11);
    expect(res!.days).toBe(30);
  });

  it('rejects future birth dates', () => {
    expect(calculateAge('2025-01-01', '2020-01-01')).toBeNull();
  });

  it('rejects invalid dates', () => {
    expect(calculateAge('not-a-date')).toBeNull();
    expect(calculateAge('')).toBeNull();
  });
});
