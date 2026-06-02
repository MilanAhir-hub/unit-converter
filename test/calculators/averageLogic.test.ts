import { describe, it, expect } from 'vitest';
import { calculateAverage, calculateGPA } from '../../src/utils/calculators/averageLogic';

describe('Average & GPA Logic', () => {
  describe('calculateAverage', () => {
    it('calculates average correctly', () => {
      expect(calculateAverage([10, 20, 30])).toBe(20);
      expect(calculateAverage([-10, 10])).toBe(0);
      expect(calculateAverage([1.5, 2.5])).toBe(2);
    });

    it('handles empty arrays and invalid inputs', () => {
      expect(calculateAverage([])).toBeNull();
      expect(calculateAverage([1, NaN])).toBeNull();
      expect(calculateAverage([1, Infinity])).toBeNull();
    });
  });

  describe('calculateGPA', () => {
    it('calculates GPA correctly', () => {
      // 3 credits A (4.0), 4 credits B (3.0) -> (12 + 12) / 7 = 3.43
      const courses = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 4, gradePoint: 3.0 }
      ];
      expect(calculateGPA(courses)).toBe(3.43);
    });

    it('rejects invalid courses', () => {
      expect(calculateGPA([])).toBeNull();
      expect(calculateGPA([{ credits: -3, gradePoint: 4.0 }])).toBeNull();
      expect(calculateGPA([{ credits: 3, gradePoint: -1.0 }])).toBeNull();
      expect(calculateGPA([{ credits: NaN, gradePoint: 4.0 }])).toBeNull();
    });
  });
});
