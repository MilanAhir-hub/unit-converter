export interface CurrencyRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface CurrencyHistoryResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

/**
 * Fetches the last 7 days of rates against USD from the API.
 */
export async function fetchHistoricalRates(): Promise<Record<string, Record<string, number>>> {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const start = formatDate(sevenDaysAgo);
  const end = formatDate(today);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const res = await fetch(`https://api.frankfurter.app/${start}..${end}?from=USD`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API returned error: ${res.status}`);
    }

    const data = (await res.json()) as CurrencyHistoryResponse;
    if (data && data.rates && Object.keys(data.rates).length > 0) {
      // Add base currency USD = 1.0 explicitly to each date series
      const rates = data.rates;
      Object.keys(rates).forEach(date => {
        rates[date]['USD'] = 1.0;
      });
      return rates;
    }
    throw new Error('Invalid rate payload');
  } catch (error) {
    console.warn('Failed to fetch build-time currency rates, falling back to offline mock rates:', error);
    
    // Generate fallback mock rates series for the last 8 days
    const rates: Record<string, Record<string, number>> = {};
    for (let i = 0; i <= 8; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = formatDate(d);
      rates[dateStr] = {
        EUR: 0.92 + Math.sin(i) * 0.005,
        INR: 83.5 + Math.sin(i) * 0.2,
        GBP: 0.78 + Math.sin(i) * 0.004,
        JPY: 157.0 + Math.sin(i) * 0.5,
        AUD: 1.50 + Math.sin(i) * 0.006,
        CAD: 1.37 + Math.sin(i) * 0.005,
        CHF: 0.89 + Math.sin(i) * 0.004,
        CNY: 7.25 + Math.sin(i) * 0.02,
        USD: 1.0
      };
    }
    return rates;
  }
}

/**
 * Calculates a daily cross-rate list for an arbitrary pair [from] -> [to]
 */
export function calculateCrossRateSeries(
  historicalRates: Record<string, Record<string, number>>,
  fromKey: string,
  toKey: string
): number[] {
  const from = fromKey.toUpperCase();
  const to = toKey.toUpperCase();

  const sortedDates = Object.keys(historicalRates).sort();
  const ratesSeries: number[] = [];

  sortedDates.forEach(date => {
    const dateRates = historicalRates[date];
    const fromUsd = dateRates[from] ?? 1.0;
    const toUsd = dateRates[to] ?? 1.0;

    // Cross-rate calculation: 1 FROM = (toUsd / fromUsd) TO
    const crossRate = toUsd / fromUsd;
    ratesSeries.push(crossRate);
  });

  // If we don't have enough points, backfill
  while (ratesSeries.length < 7) {
    ratesSeries.unshift(ratesSeries[0] || 1.0);
  }

  return ratesSeries;
}

/**
 * Formats a 24h percentage change cleanly
 */
export function calculate24hChange(rates: number[]): { percent: number; isUp: boolean; formatted: string } {
  if (rates.length < 2) return { percent: 0, isUp: true, formatted: '+0.00%' };
  const current = rates[rates.length - 1];
  const previous = rates[rates.length - 2];
  if (previous === 0) return { percent: 0, isUp: true, formatted: '+0.00%' };

  const diff = current - previous;
  const percent = (diff / previous) * 100;
  const isUp = percent >= 0;
  const formatted = `${isUp ? '↑ +' : '↓ '}${percent.toFixed(2)}%`;

  return { percent, isUp, formatted };
}

/**
 * Generates an SVG path coordinates mapping from a list of points
 * Mapped to standard ViewBox 120 x 40
 */
export function generateSparkline(rates: number[]): string {
  const width = 120;
  const height = 40;
  const padding = 4;

  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min;

  let path = '';
  for (let i = 0; i < rates.length; i++) {
    const x = (i / (rates.length - 1)) * width;
    let y = height / 2;

    if (range > 0) {
      y = height - padding - ((rates[i] - min) / range) * (height - 2 * padding);
    }

    path += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return path;
}
