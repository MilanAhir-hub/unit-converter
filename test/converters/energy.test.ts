import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Energy Converter', () => {
  const cat = getCategoryBySlug('energy')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1000, from: 'joule', to: 'kilojoule', expected: 1 },
    { val: 1, from: 'kwh', to: 'joule', expected: 3600000 },
    { val: 500, from: 'calorie', to: 'joule', expected: 2092 },
    { val: 1, from: 'btu', to: 'joule', expected: 1055.06 },
    { val: 1, from: 'ev', to: 'joule', expected: 1.60218e-19 },
    { val: 1, from: 'kilocalorie', to: 'joule', expected: 4184 },
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
    expect(convert(NaN, 'joule', 'kilojoule', cat)).toBeNaN();
    expect(convert(Infinity, 'joule', 'kilojoule', cat)).toBeNaN();
    expect(convert(-Infinity, 'joule', 'kilojoule', cat)).toBeNaN();
    expect(convert(1, '', 'kilojoule', cat)).toBeNaN();
    expect(convert(1, 'joule', '', cat)).toBeNaN();
  });
});
