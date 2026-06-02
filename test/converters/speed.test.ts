import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Speed Converter', () => {
  const cat = getCategoryBySlug('speed')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 100, from: 'kmh', to: 'mps', expected: 100 * (1/3.6) },
    { val: 60, from: 'mph', to: 'kmh', expected: 60 * 0.44704 * 3.6 },
    { val: 1, from: 'mph', to: 'mps', expected: 0.44704 },
    { val: 1, from: 'knot', to: 'mps', expected: 0.514444 },
    { val: 1, from: 'mach', to: 'mps', expected: 340.29 },
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
    expect(convert(NaN, 'kmh', 'mps', cat)).toBeNaN();
    expect(convert(Infinity, 'kmh', 'mps', cat)).toBeNaN();
    expect(convert(-Infinity, 'kmh', 'mps', cat)).toBeNaN();
    expect(convert(1, '', 'mps', cat)).toBeNaN();
    expect(convert(1, 'kmh', '', cat)).toBeNaN();
  });
});
