import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Data Transfer Rate Converter', () => {
  const cat = getCategoryBySlug('data-transfer-rate')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 1000, from: 'bit-s', to: 'kilobit-s', expected: 1 },
    { val: 1, from: 'megabit-s', to: 'kilobit-s', expected: 1000 },
    { val: 1, from: 'gigabit-s', to: 'megabit-s', expected: 1000 },
    { val: 1, from: 'megabit-s', to: 'bit-s', expected: 1000000 },
    { val: 8, from: 'bit-s', to: 'byte-s', expected: 1 },
    { val: 1, from: 'byte-s', to: 'bit-s', expected: 8 },
    { val: 1, from: 'megabyte-s', to: 'megabit-s', expected: 8 },
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
    expect(convert(NaN, 'bit-s', 'kilobit-s', cat)).toBeNaN();
    expect(convert(Infinity, 'bit-s', 'kilobit-s', cat)).toBeNaN();
    expect(convert(-Infinity, 'bit-s', 'kilobit-s', cat)).toBeNaN();
    expect(convert(1, '', 'kilobit-s', cat)).toBeNaN();
    expect(convert(1, 'bit-s', '', cat)).toBeNaN();
  });
});
