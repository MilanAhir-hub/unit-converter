import { describe, it, expect } from 'vitest';
import { gcd, simplify, parseFraction, add, sub, mul, div, formatFraction, formatMixed, formatDecimal, formatPercentage } from '../src/utils/fractionLogic';

describe('Fraction Logic Mathematical Accuracy', () => {

  describe('GCD', () => {
    it('finds gcd of positive numbers', () => expect(gcd(12, 8)).toBe(4));
    it('finds gcd of negative numbers', () => expect(gcd(-12, -8)).toBe(4));
    it('finds gcd with one negative', () => expect(gcd(12, -8)).toBe(4));
    it('gcd of coprime is 1', () => expect(gcd(7, 13)).toBe(1));
    it('gcd with zero is the other number', () => expect(gcd(5, 0)).toBe(5));
  });

  describe('Simplify', () => {
    it('simplifies 2/4 to 1/2', () => expect(simplify({n: 2, d: 4})).toEqual({n: 1, d: 2}));
    it('handles negative numerator', () => expect(simplify({n: -2, d: 4})).toEqual({n: -1, d: 2}));
    it('handles negative denominator', () => expect(simplify({n: 2, d: -4})).toEqual({n: -1, d: 2}));
    it('handles double negative', () => expect(simplify({n: -2, d: -4})).toEqual({n: 1, d: 2}));
    it('throws on division by zero', () => expect(() => simplify({n: 5, d: 0})).toThrow("Division by zero"));
    it('simplifies 0/5 to 0/1', () => expect(simplify({n: 0, d: 5})).toEqual({n: 0, d: 1}));
  });

  describe('Parsing', () => {
    it('parses simple fraction', () => expect(parseFraction("1/2")).toEqual({n: 1, d: 2}));
    it('parses negative fraction', () => expect(parseFraction("-3/4")).toEqual({n: -3, d: 4}));
    it('parses negative denominator', () => expect(parseFraction("3/-4")).toEqual({n: -3, d: 4}));
    
    it('parses mixed positive fraction', () => expect(parseFraction("2 1/3")).toEqual({n: 7, d: 3}));
    it('parses mixed negative fraction', () => expect(parseFraction("-2 1/3")).toEqual({n: -7, d: 3}));
    
    it('parses whole positive number', () => expect(parseFraction("5")).toEqual({n: 5, d: 1}));
    it('parses whole negative number', () => expect(parseFraction("-5")).toEqual({n: -5, d: 1}));
    
    it('parses decimal (0.75)', () => expect(parseFraction("0.75")).toEqual({n: 3, d: 4}));
    it('parses negative decimal', () => expect(parseFraction("-1.5")).toEqual({n: -3, d: 2}));
    it('parses whole decimal (5.0)', () => expect(parseFraction("5.0")).toEqual({n: 5, d: 1}));
    
    it('returns null for empty string', () => expect(parseFraction("")).toBeNull());
    it('returns null for invalid string', () => expect(parseFraction("abc")).toBeNull());
    it('returns null for denominator 0', () => expect(parseFraction("1/0")).toBeNull());
    it('returns null for mixed with denom 0', () => expect(parseFraction("2 1/0")).toBeNull());
  });

  describe('Addition', () => {
    it('1/2 + 1/2 = 1', () => expect(add({n:1, d:2}, {n:1, d:2})).toEqual({n: 1, d: 1}));
    it('1/3 + 1/6 = 1/2', () => expect(add({n:1, d:3}, {n:1, d:6})).toEqual({n: 1, d: 2}));
    it('-1/2 + 1/4 = -1/4', () => expect(add({n:-1, d:2}, {n:1, d:4})).toEqual({n: -1, d: 4}));
    it('2 1/3 + 1/3 = 8/3', () => expect(add({n:7, d:3}, {n:1, d:3})).toEqual({n: 8, d: 3}));
    it('large numbers', () => expect(add({n:1000, d:1001}, {n:1, d:1001})).toEqual({n: 1, d: 1}));
  });

  describe('Subtraction', () => {
    it('3/4 - 1/2 = 1/4', () => expect(sub({n:3, d:4}, {n:1, d:2})).toEqual({n: 1, d: 4}));
    it('1/2 - 3/4 = -1/4', () => expect(sub({n:1, d:2}, {n:3, d:4})).toEqual({n: -1, d: 4}));
    it('-1/2 - 1/2 = -1', () => expect(sub({n:-1, d:2}, {n:1, d:2})).toEqual({n: -1, d: 1}));
  });

  describe('Multiplication', () => {
    it('2/3 * 3/4 = 1/2', () => expect(mul({n:2, d:3}, {n:3, d:4})).toEqual({n: 1, d: 2}));
    it('-1/2 * 1/2 = -1/4', () => expect(mul({n:-1, d:2}, {n:1, d:2})).toEqual({n: -1, d: 4}));
    it('-1/2 * -1/2 = 1/4', () => expect(mul({n:-1, d:2}, {n:-1, d:2})).toEqual({n: 1, d: 4}));
    it('5 * 1/5 = 1', () => expect(mul({n:5, d:1}, {n:1, d:5})).toEqual({n: 1, d: 1}));
  });

  describe('Division', () => {
    it('5/6 / 1/2 = 5/3', () => expect(div({n:5, d:6}, {n:1, d:2})).toEqual({n: 5, d: 3}));
    it('1/2 / -1/2 = -1', () => expect(div({n:1, d:2}, {n:-1, d:2})).toEqual({n: -1, d: 1}));
    it('throws on division by 0/1', () => expect(() => div({n:1, d:2}, {n:0, d:1})).toThrow("Cannot divide by zero fraction"));
  });

  describe('Formatting', () => {
    it('formatFraction 1/2', () => expect(formatFraction({n: 1, d: 2})).toBe("1/2"));
    it('formatFraction 5/1', () => expect(formatFraction({n: 5, d: 1})).toBe("5"));
    it('formatFraction -3/4', () => expect(formatFraction({n: -3, d: 4})).toBe("-3/4"));

    it('formatMixed proper fraction', () => expect(formatMixed({n: 1, d: 2})).toBeNull());
    it('formatMixed integer', () => expect(formatMixed({n: 5, d: 1})).toBeNull());
    it('formatMixed improper fraction 7/3', () => expect(formatMixed({n: 7, d: 3})).toBe("2 1/3"));
    it('formatMixed negative improper -7/3', () => expect(formatMixed({n: -7, d: 3})).toBe("-2 1/3"));
    
    it('formatDecimal 1/2', () => expect(formatDecimal({n: 1, d: 2})).toBe("0.5"));
    it('formatDecimal 1/3', () => expect(formatDecimal({n: 1, d: 3})).toBe("0.33333333"));
    
    it('formatPercentage 1/2', () => expect(formatPercentage({n: 1, d: 2})).toBe("50%"));
    it('formatPercentage 1/3', () => expect(formatPercentage({n: 1, d: 3})).toBe("33.333333%"));
    it('formatPercentage 1/8', () => expect(formatPercentage({n: 1, d: 8})).toBe("12.5%"));
  });

});
