import { describe, it, expect } from 'vitest';
import { calculatePercentageOf, calculatePercentageIs, calculatePercentageChange, calculateMarksPercentage } from '../../src/utils/calculators/percentageLogic';

describe('Percentage Calculator Logic', () => {
  it('calculates X% of Y', () => {
    expect(calculatePercentageOf(20, 100)).toBe(20);
    expect(calculatePercentageOf(15, 200)).toBe(30);
    expect(calculatePercentageOf(33.33, 100)).toBe(33.33);
  });

  it('calculates X is what % of Y', () => {
    expect(calculatePercentageIs(20, 100)).toBe(20);
    expect(calculatePercentageIs(50, 200)).toBe(25);
    expect(calculatePercentageIs(10, 0)).toBeNull();
  });

  it('calculates % change from X to Y', () => {
    expect(calculatePercentageChange(100, 150)).toBe(50); // 50% increase
    expect(calculatePercentageChange(100, 80)).toBe(-20); // 20% decrease
    expect(calculatePercentageChange(0, 100)).toBeNull();
  });

  it('calculates marks percentage', () => {
    expect(calculateMarksPercentage(450, 500)).toBe(90);
    expect(calculateMarksPercentage(0, 500)).toBe(0);
    expect(calculateMarksPercentage(450, 0)).toBeNull();
    expect(calculateMarksPercentage(-10, 500)).toBeNull();
  });
});
