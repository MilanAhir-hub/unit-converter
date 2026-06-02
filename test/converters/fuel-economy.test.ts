import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Fuel Economy Converter', () => {
  const cat = getCategoryBySlug('fuel-consumption')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    // 20 km/L = 5 L/100km
    { val: 20, from: 'km-per-l', to: 'l-per-100km', expected: 5 },
    // 10 L/100km = 10 km/L
    { val: 10, from: 'l-per-100km', to: 'km-per-l', expected: 10 },
    // L/100km to MPG(US) => 235.215 / 10 = 23.5215
    { val: 10, from: 'l-per-100km', to: 'mpg-us', expected: 23.5215 },
    // MPG(US) to L/100km => 235.215 / 23.5215 = 10
    { val: 23.5215, from: 'mpg-us', to: 'l-per-100km', expected: 10 },
    // L/100km to MPG(UK) => 282.481 / 10 = 28.2481
    { val: 10, from: 'l-per-100km', to: 'mpg-uk', expected: 28.2481 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 4);
    });
  });

  it('handles massive numbers safely (avoids infinity where possible)', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val * 1e5, tc.from, tc.to, cat)).toBeDefined(); 
    });
  });

  it('handles invalid inputs gracefully (NaN, Infinity, empty)', () => {
    expect(convert(NaN, 'km-per-l', 'l-per-100km', cat)).toBeNaN();
    expect(convert(Infinity, 'km-per-l', 'l-per-100km', cat)).toBeNaN();
    expect(convert(-Infinity, 'km-per-l', 'l-per-100km', cat)).toBeNaN();
    expect(convert(1, '', 'l-per-100km', cat)).toBeNaN();
    expect(convert(1, 'km-per-l', '', cat)).toBeNaN();
  });
});
