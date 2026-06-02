import { describe, it, expect } from 'vitest';
import { calculateBMI } from '../../src/utils/calculators/bmiLogic';

describe('BMI Calculator Logic', () => {
  it('calculates normal BMI correctly', () => {
    const res = calculateBMI(70, 175); // 70kg, 1.75m -> 70 / 3.0625 = 22.857
    expect(res).not.toBeNull();
    expect(res!.bmi).toBe(22.9);
    expect(res!.category).toBe('Normal weight');
  });

  it('calculates underweight BMI correctly', () => {
    const res = calculateBMI(50, 175); // 50 / 3.0625 = 16.3
    expect(res).not.toBeNull();
    expect(res!.bmi).toBe(16.3);
    expect(res!.category).toBe('Underweight');
  });

  it('calculates overweight BMI correctly', () => {
    const res = calculateBMI(85, 175); // 85 / 3.0625 = 27.8
    expect(res).not.toBeNull();
    expect(res!.bmi).toBe(27.8);
    expect(res!.category).toBe('Overweight');
  });

  it('calculates obese BMI correctly', () => {
    const res = calculateBMI(100, 175); // 100 / 3.0625 = 32.7
    expect(res).not.toBeNull();
    expect(res!.bmi).toBe(32.7);
    expect(res!.category).toBe('Obesity');
  });

  it('rejects zero or negative weight', () => {
    expect(calculateBMI(0, 175)).toBeNull();
    expect(calculateBMI(-10, 175)).toBeNull();
  });

  it('rejects zero or negative height', () => {
    expect(calculateBMI(70, 0)).toBeNull();
    expect(calculateBMI(70, -175)).toBeNull();
  });

  it('rejects NaN and Infinity', () => {
    expect(calculateBMI(NaN, 175)).toBeNull();
    expect(calculateBMI(70, NaN)).toBeNull();
    expect(calculateBMI(Infinity, 175)).toBeNull();
    expect(calculateBMI(70, Infinity)).toBeNull();
  });
});
