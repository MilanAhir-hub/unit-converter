export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

/**
 * Calculates exact age in years, months, and days.
 * Prevents future dates and NaN outputs.
 */
export function calculateAge(dob: string, targetDate: string = new Date().toISOString().split('T')[0]): AgeResult | null {
  if (!dob) return null;

  const d1 = new Date(dob);
  const d2 = new Date(targetDate);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

  if (d1 > d2) return null; // Future date validation

  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in the previous month
    const previousMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}
