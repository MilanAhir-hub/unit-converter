export interface GstResult {
  netPrice: number;    // Price without GST
  gstAmount: number;   // Amount of tax
  grossPrice: number;  // Price with GST
}

/**
 * Calculates GST additions or removals.
 * @param price The base price
 * @param rate The GST percentage
 * @param action 'add' | 'remove'
 */
export function calculateGST(price: number, rate: number, action: 'add' | 'remove'): GstResult | null {
  if (
    typeof price !== 'number' || 
    typeof rate !== 'number' ||
    isNaN(price) || 
    isNaN(rate) ||
    price < 0 || 
    rate < 0 ||
    !isFinite(price) ||
    !isFinite(rate) ||
    (action !== 'add' && action !== 'remove')
  ) {
    return null;
  }

  let netPrice = 0;
  let gstAmount = 0;
  let grossPrice = 0;

  if (action === 'add') {
    netPrice = price;
    gstAmount = price * (rate / 100);
    grossPrice = netPrice + gstAmount;
  } else {
    // action === 'remove'
    grossPrice = price;
    netPrice = grossPrice / (1 + (rate / 100));
    gstAmount = grossPrice - netPrice;
  }

  return {
    netPrice: Math.round(netPrice * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    grossPrice: Math.round(grossPrice * 100) / 100
  };
}
