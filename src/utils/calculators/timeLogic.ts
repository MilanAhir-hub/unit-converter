export interface DateDiffResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
}

export function calculateDateDifference(date1: string, date2: string): DateDiffResult | null {
  if (!date1 || !date2) return null;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

  // Ensure d1 is the earlier date
  const start = d1 < d2 ? d1 : d2;
  const end = d1 < d2 ? d2 : d1;

  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalDays, totalWeeks };
}

export interface TimeDurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

export function calculateTimeDuration(time1: string, time2: string): TimeDurationResult | null {
  if (!time1 || !time2) return null;

  // Format expected: "HH:MM" (24-hour)
  const parseTime = (t: string) => {
    const parts = t.split(':');
    if (parts.length !== 2) return null;
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
    return h * 60 + m; // Total minutes from midnight
  };

  const m1 = parseTime(time1);
  const m2 = parseTime(time2);

  if (m1 === null || m2 === null) return null;

  let diff = m2 - m1;
  if (diff < 0) {
    // Crosses midnight
    diff += 24 * 60;
  }

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return { hours, minutes, totalMinutes: diff };
}
