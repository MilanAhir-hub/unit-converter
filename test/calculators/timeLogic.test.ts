import { describe, it, expect } from 'vitest';
import { calculateDateDifference, calculateTimeDuration } from '../../src/utils/calculators/timeLogic';

describe('Time & Date Logic', () => {
  describe('calculateDateDifference', () => {
    it('calculates date difference correctly', () => {
      const res = calculateDateDifference('2023-01-01', '2024-02-15');
      expect(res).not.toBeNull();
      expect(res!.years).toBe(1);
      expect(res!.months).toBe(1);
      expect(res!.days).toBe(14);
      expect(res!.totalDays).toBe(410);
    });

    it('calculates backwards dates correctly', () => {
      const res = calculateDateDifference('2024-02-15', '2023-01-01');
      expect(res).not.toBeNull();
      expect(res!.years).toBe(1);
      expect(res!.months).toBe(1);
      expect(res!.days).toBe(14);
    });

    it('rejects invalid dates', () => {
      expect(calculateDateDifference('abc', '2024-02-15')).toBeNull();
      expect(calculateDateDifference('', '2024-02-15')).toBeNull();
    });
  });

  describe('calculateTimeDuration', () => {
    it('calculates time duration within same day', () => {
      const res = calculateTimeDuration('09:30', '17:45');
      expect(res).not.toBeNull();
      expect(res!.hours).toBe(8);
      expect(res!.minutes).toBe(15);
      expect(res!.totalMinutes).toBe(495);
    });

    it('calculates time duration crossing midnight', () => {
      const res = calculateTimeDuration('22:00', '02:30');
      expect(res).not.toBeNull();
      expect(res!.hours).toBe(4);
      expect(res!.minutes).toBe(30);
    });

    it('rejects invalid times', () => {
      expect(calculateTimeDuration('25:00', '12:00')).toBeNull();
      expect(calculateTimeDuration('12:65', '12:00')).toBeNull();
      expect(calculateTimeDuration('', '12:00')).toBeNull();
    });
  });
});
