/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation.
 * Validates against NaN, negatives, and invalid ages.
 * 
 * Formula:
 * Men: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
 * Women: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
 */
export function calculateBMR(weightKg: number, heightCm: number, age: number, isMale: boolean): number | null {
  if (
    typeof weightKg !== 'number' || 
    typeof heightCm !== 'number' ||
    typeof age !== 'number' ||
    isNaN(weightKg) || 
    isNaN(heightCm) ||
    isNaN(age) ||
    weightKg <= 0 || 
    heightCm <= 0 ||
    age < 0 || age > 150 ||
    !isFinite(weightKg) ||
    !isFinite(heightCm) ||
    !isFinite(age)
  ) {
    return null;
  }

  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  
  if (isMale) {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Avoid JS floating point inaccuracies like .30000000004
  return Math.round(bmr);
}
