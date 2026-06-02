import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Frequency Converter', () => {
  const cat = getCategoryBySlug('frequency')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1000, from: 'hertz', to: 'kilohertz', expected: 1 },
    { val: 1, from: 'megahertz', to: 'hertz', expected: 1000000 },
    { val: 2.4, from: 'gigahertz', to: 'megahertz', expected: 2400 },
    { val: 1, from: 'terahertz', to: 'gigahertz', expected: 1000 },
    { val: 60, from: 'rpm', to: 'hertz', expected: 1 },
    { val: 1, from: 'hertz', to: 'rpm', expected: 60 },
    { val: 1, from: 'hertz', to: 'rps', expected: 1 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 5);
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
    expect(convert(NaN, 'hertz', 'kilohertz', cat)).toBeNaN();
    expect(convert(Infinity, 'hertz', 'kilohertz', cat)).toBeNaN();
    expect(convert(-Infinity, 'hertz', 'kilohertz', cat)).toBeNaN();
    expect(convert(1, '', 'kilohertz', cat)).toBeNaN();
    expect(convert(1, 'hertz', '', cat)).toBeNaN();
  });
});
