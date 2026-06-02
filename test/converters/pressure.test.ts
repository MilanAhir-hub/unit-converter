import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Pressure Converter', () => {
  const cat = getCategoryBySlug('pressure')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1, from: 'atm', to: 'pascal', expected: 101325 },
    { val: 1, from: 'bar', to: 'pascal', expected: 100000 },
    { val: 14.695948775, from: 'psi', to: 'atm', expected: 1 },
    { val: 1, from: 'atm', to: 'psi', expected: 14.695948775 },
    { val: 1, from: 'megapascal', to: 'pascal', expected: 1000000 },
    { val: 1000, from: 'pascal', to: 'kilopascal', expected: 1 },
    { val: 1, from: 'atm', to: 'torr', expected: 101325 / 133.322 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 1);
    });
  });

  it('handles massive numbers (scientific bounds)', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val * 1e10, tc.from, tc.to, cat)).toBeCloseTo(tc.expected * 1e10, -5); 
    });
  });

  it('handles micro numbers (scientific bounds)', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val * 1e-10, tc.from, tc.to, cat)).toBeCloseTo(tc.expected * 1e-10, 14); 
    });
  });

  it('handles invalid inputs gracefully (NaN, Infinity, empty)', () => {
    expect(convert(NaN, 'pascal', 'bar', cat)).toBeNaN();
    expect(convert(Infinity, 'pascal', 'bar', cat)).toBeNaN();
    expect(convert(-Infinity, 'pascal', 'bar', cat)).toBeNaN();
    expect(convert(1, '', 'bar', cat)).toBeNaN();
    expect(convert(1, 'pascal', '', cat)).toBeNaN();
  });
});
