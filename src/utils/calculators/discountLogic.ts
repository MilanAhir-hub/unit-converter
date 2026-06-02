export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
}

/**
 * Calculates discount amount and final price.
 * Ensures financial precision by rounding to 2 decimal places.
 */
export function calculateDiscount(originalPrice: number, discountPercentage: number): DiscountResult | null {
  if (
    typeof originalPrice !== 'number' || 
    typeof discountPercentage !== 'number' ||
    isNaN(originalPrice) || 
    isNaN(discountPercentage) ||
    originalPrice < 0 || 
    discountPercentage < 0 ||
    !isFinite(originalPrice) ||
    !isFinite(discountPercentage)
  ) {
    return null;
  }

  let discountAmount = originalPrice * (discountPercentage / 100);
  let finalPrice = originalPrice - discountAmount;

  // Financial rounding to 2 decimal places to avoid floating point drift
  discountAmount = Math.round(discountAmount * 100) / 100;
  finalPrice = Math.round(finalPrice * 100) / 100;

  // Prevent final price from dropping below 0 if percentage > 100
  if (finalPrice < 0) {
    finalPrice = 0;
    discountAmount = originalPrice;
  }

  return { discountAmount, finalPrice };
}
