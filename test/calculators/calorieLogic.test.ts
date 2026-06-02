import { describe, it, expect } from 'vitest';
import { calculateCalories } from '../../src/utils/calculators/calorieLogic';

describe('Calorie Calculator Logic', () => {
  it('calculates calories for sedentary male correctly', () => {
    // 70kg, 175cm, 25y, male => BMR = 1674
    // 1674 * 1.2 = 2008.8 => 2009
    expect(calculateCalories(70, 175, 25, true, 'sedentary')).toBe(2009);
  });

  it('calculates calories for active female correctly', () => {
    // 60kg, 160cm, 30y, female => BMR = 1289
    // 1289 * 1.725 = 2223.525 => 2224
    expect(calculateCalories(60, 160, 30, false, 'active')).toBe(2224);
  });

  it('rejects invalid inputs', () => {
    expect(calculateCalories(-70, 175, 25, true, 'sedentary')).toBeNull();
    expect(calculateCalories(70, 175, 25, true, 'non-existent')).toBeNull();
  });
});
