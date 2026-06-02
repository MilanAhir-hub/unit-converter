import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Power Converter', () => {
  const cat = getCategoryBySlug('power')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1000, from: 'watt', to: 'kilowatt', expected: 1 },
    { val: 1, from: 'horsepower', to: 'watt', expected: 745.7 },
    { val: 1, from: 'megawatt', to: 'kilowatt', expected: 1000 },
    { val: 1, from: 'hp-metric', to: 'watt', expected: 735.499 },
    { val: 1, from: 'btu-hr', to: 'watt', expected: 0.293071 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 4);
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
    expect(convert(NaN, 'watt', 'kilowatt', cat)).toBeNaN();
    expect(convert(Infinity, 'watt', 'kilowatt', cat)).toBeNaN();
    expect(convert(-Infinity, 'watt', 'kilowatt', cat)).toBeNaN();
    expect(convert(1, '', 'kilowatt', cat)).toBeNaN();
    expect(convert(1, 'watt', '', cat)).toBeNaN();
  });
});
