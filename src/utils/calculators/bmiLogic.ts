export interface BmiResult {
  bmi: number;
  category: string;
  colorClass: string;
}

/**
 * Calculates BMI based on weight in kg and height in cm.
 * Validates inputs to prevent NaN, Infinity, or negative values.
 */
export function calculateBMI(weightKg: number, heightCm: number): BmiResult | null {
  if (
    typeof weightKg !== 'number' || 
    typeof heightCm !== 'number' ||
    isNaN(weightKg) || 
    isNaN(heightCm) ||
    weightKg <= 0 || 
    heightCm <= 0 ||
    !isFinite(weightKg) ||
    !isFinite(heightCm)
  ) {
    return null;
  }

  const heightM = heightCm / 100;
  let bmi = weightKg / (heightM * heightM);

  // Fix precision to avoid JS floating point drift
  bmi = Math.round(bmi * 10) / 10;

  let category = '';
  let colorClass = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    colorClass = 'text-blue-500';
  } else if (bmi < 25) {
    category = 'Normal weight';
    colorClass = 'text-green-500';
  } else if (bmi < 30) {
    category = 'Overweight';
    colorClass = 'text-orange-500';
  } else {
    category = 'Obesity';
    colorClass = 'text-red-500';
  }

  return { bmi, category, colorClass };
}
