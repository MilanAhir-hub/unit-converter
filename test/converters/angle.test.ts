import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Angle Converter', () => {
  const cat = getCategoryBySlug('angle')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    // 180 degrees = PI radians
    { val: 180, from: 'degree', to: 'radian', expected: Math.PI },
    { val: 90, from: 'degree', to: 'radian', expected: Math.PI / 2 },
    { val: Math.PI, from: 'radian', to: 'degree', expected: 180 },
    // 180 degrees = 200 gradians
    { val: 180, from: 'degree', to: 'gradian', expected: 200 },
    { val: 200, from: 'gradian', to: 'degree', expected: 180 },
    // 1 turn = 360 degrees
    { val: 1, from: 'turn', to: 'degree', expected: 360 },
    { val: 360, from: 'degree', to: 'turn', expected: 1 },
    // 1 degree = 60 arcminute
    { val: 1, from: 'degree', to: 'arcminute', expected: 60 },
    { val: 60, from: 'arcminute', to: 'degree', expected: 1 },
    // 1 degree = 3600 arcsecond
    { val: 1, from: 'degree', to: 'arcsecond', expected: 3600 },
    { val: 3600, from: 'arcsecond', to: 'degree', expected: 1 },
    // Milliradian to radian
    { val: 1000, from: 'milliradian', to: 'radian', expected: 1 },
    { val: 1, from: 'radian', to: 'milliradian', expected: 1000 },
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 5);
    });
  });

  it('handles massive numbers (scientific bounds)', () => {
    // scale up by 1e10
    testCases.forEach(tc => {
      expect(convert(tc.val * 1e10, tc.from, tc.to, cat)).toBeCloseTo(tc.expected * 1e10, -5); 
    });
  });

  it('handles micro numbers (scientific bounds)', () => {
    // scale down by 1e-10
    testCases.forEach(tc => {
      expect(convert(tc.val * 1e-10, tc.from, tc.to, cat)).toBeCloseTo(tc.expected * 1e-10, 14); 
    });
  });

  it('handles invalid inputs gracefully (NaN, Infinity, empty)', () => {
    expect(convert(NaN, 'degree', 'radian', cat)).toBeNaN();
    expect(convert(Infinity, 'degree', 'radian', cat)).toBeNaN();
    expect(convert(-Infinity, 'degree', 'radian', cat)).toBeNaN();
    expect(convert(1, '', 'radian', cat)).toBeNaN();
    expect(convert(1, 'degree', '', cat)).toBeNaN();
  });
});
