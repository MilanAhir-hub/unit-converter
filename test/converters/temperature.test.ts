import { describe, it, expect } from 'vitest';
import { convert, getCategoryBySlug } from '../../src/utils/converter';

describe('Temperature Converter', () => {
  const cat = getCategoryBySlug('temperature')!;

  it('exists', () => {
    expect(cat).toBeDefined();
    expect(cat.units.length).toBeGreaterThan(0);
  });

  const testCases = [
    { val: 0, from: 'celsius', to: 'fahrenheit', expected: 32 },
    { val: 0, from: 'celsius', to: 'kelvin', expected: 273.15 },
    { val: 100, from: 'celsius', to: 'fahrenheit', expected: 212 },
    { val: 100, from: 'celsius', to: 'kelvin', expected: 373.15 },

    { val: 32, from: 'fahrenheit', to: 'celsius', expected: 0 },
    { val: 212, from: 'fahrenheit', to: 'celsius', expected: 100 },
    { val: 98.6, from: 'fahrenheit', to: 'celsius', expected: 37 },
    { val: -40, from: 'fahrenheit', to: 'celsius', expected: -40 },
    { val: -40, from: 'celsius', to: 'fahrenheit', expected: -40 },

    { val: 273.15, from: 'kelvin', to: 'celsius', expected: 0 },
    { val: 373.15, from: 'kelvin', to: 'celsius', expected: 100 },
    { val: 0, from: 'kelvin', to: 'celsius', expected: -273.15 },

    { val: 491.67, from: 'rankine', to: 'fahrenheit', expected: 32 },
    { val: 671.67, from: 'rankine', to: 'fahrenheit', expected: 212 },
    { val: 108667766, from: 'kelvin', to: 'rankine', expected: 195601978.8 }, // 108667766 * 9/5 = 195601978.8
  ];

  it('performs standard accurate conversions', () => {
    testCases.forEach(tc => {
      expect(convert(tc.val, tc.from, tc.to, cat)).toBeCloseTo(tc.expected, 4);
    });
  });

  it('throws specific absolute zero errors', () => {
    expect(() => convert(-1, 'kelvin', 'celsius', cat)).toThrow('Temperature below absolute zero.');
    expect(() => convert(-274, 'celsius', 'fahrenheit', cat)).toThrow('Temperature below absolute zero.');
    expect(() => convert(-460, 'fahrenheit', 'celsius', cat)).toThrow('Temperature below absolute zero.');
    expect(() => convert(-1, 'rankine', 'celsius', cat)).toThrow('Temperature below absolute zero.');
    expect(() => convert(-220, 'reaumur', 'celsius', cat)).toThrow('Temperature below absolute zero.');
  });
  
  it('allows exact absolute zero', () => {
    expect(convert(0, 'kelvin', 'celsius', cat)).toBeCloseTo(-273.15, 2);
    expect(convert(-273.15, 'celsius', 'kelvin', cat)).toBeCloseTo(0, 2);
    expect(convert(-459.67, 'fahrenheit', 'rankine', cat)).toBeCloseTo(0, 2);
  });
});
