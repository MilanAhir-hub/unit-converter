import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Density Converter', () => {
  const cat = getCategoryBySlug('density')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1000, from: 'kg-m3', to: 'g-cm3', expected: 1 },
    { val: 1, from: 'g-cm3', to: 'kg-m3', expected: 1000 },
    { val: 1, from: 'lb-ft3', to: 'kg-m3', expected: 16.0185 },
    { val: 1, from: 'kg-l', to: 'kg-m3', expected: 1000 },
    { val: 1, from: 'g-ml', to: 'kg-m3', expected: 1000 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 3);
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
    expect(convert(NaN, 'kg-m3', 'g-cm3', cat)).toBeNaN();
    expect(convert(Infinity, 'kg-m3', 'g-cm3', cat)).toBeNaN();
    expect(convert(-Infinity, 'kg-m3', 'g-cm3', cat)).toBeNaN();
    expect(convert(1, '', 'g-cm3', cat)).toBeNaN();
    expect(convert(1, 'kg-m3', '', cat)).toBeNaN();
  });
});
