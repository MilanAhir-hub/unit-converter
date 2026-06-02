/**
 * What is X% of Y?
 */
export function calculatePercentageOf(x: number, y: number): number | null {
  if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) return null;
  return Math.round(((x / 100) * y) * 100) / 100;
}

/**
 * X is what percentage of Y?
 */
export function calculatePercentageIs(x: number, y: number): number | null {
  if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y) || y === 0) return null;
  return Math.round(((x / y) * 100) * 100) / 100;
}

/**
 * Percentage change (increase/decrease) from X to Y.
 */
export function calculatePercentageChange(x: number, y: number): number | null {
  if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y) || x === 0) return null;
  return Math.round((((y - x) / x) * 100) * 100) / 100;
}

/**
 * Marks Percentage: Total Obtained / Total Max
 */
export function calculateMarksPercentage(obtained: number, maximum: number): number | null {
  if (
    isNaN(obtained) || isNaN(maximum) || 
    !isFinite(obtained) || !isFinite(maximum) || 
    maximum <= 0 || obtained < 0
  ) return null;
  return Math.round(((obtained / maximum) * 100) * 100) / 100;
}
