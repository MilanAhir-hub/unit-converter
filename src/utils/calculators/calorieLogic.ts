import { calculateBMR } from './bmrLogic';

/**
 * Valid activity multiplier ranges.
 */
export const activityLevels: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9
};

/**
 * Calculates total daily energy expenditure (TDEE) based on BMR and activity level.
 */
export function calculateCalories(weightKg: number, heightCm: number, age: number, isMale: boolean, activityKey: string): number | null {
  const bmr = calculateBMR(weightKg, heightCm, age, isMale);
  if (bmr === null) return null;

  const multiplier = activityLevels[activityKey];
  if (multiplier === undefined) return null;

  return Math.round(bmr * multiplier);
}
