import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Torque Converter', () => {
  const cat = getCategoryBySlug('torque')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1, from: 'newton-meter', to: 'pound-foot', expected: 1 / 1.35582 },
    { val: 100, from: 'newton-meter', to: 'pound-foot', expected: 100 / 1.35582 },
    { val: 1, from: 'pound-foot', to: 'newton-meter', expected: 1.35582 },
    { val: 1, from: 'newton-meter', to: 'pound-inch', expected: 1 / 0.112985 },
    { val: 1, from: 'pound-inch', to: 'newton-meter', expected: 0.112985 },
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
    expect(convert(NaN, 'newton-meter', 'pound-foot', cat)).toBeNaN();
    expect(convert(Infinity, 'newton-meter', 'pound-foot', cat)).toBeNaN();
    expect(convert(-Infinity, 'newton-meter', 'pound-foot', cat)).toBeNaN();
    expect(convert(1, '', 'pound-foot', cat)).toBeNaN();
    expect(convert(1, 'newton-meter', '', cat)).toBeNaN();
  });
});
