export function calculateAverage(numbers: number[]): number | null {
  if (!Array.isArray(numbers) || numbers.length === 0) return null;
  
  let sum = 0;
  for (const num of numbers) {
    if (isNaN(num) || !isFinite(num)) return null;
    sum += num;
  }
  
  return sum / numbers.length;
}

export interface Course {
  credits: number;
  gradePoint: number;
}

export function calculateGPA(courses: Course[]): number | null {
  if (!Array.isArray(courses) || courses.length === 0) return null;

  let totalCredits = 0;
  let totalPoints = 0;

  for (const c of courses) {
    if (
      typeof c.credits !== 'number' || 
      typeof c.gradePoint !== 'number' || 
      isNaN(c.credits) || 
      isNaN(c.gradePoint) || 
      c.credits <= 0 || 
      c.gradePoint < 0
    ) {
      return null;
    }
    totalCredits += c.credits;
    totalPoints += (c.credits * c.gradePoint);
  }

  if (totalCredits === 0) return null;

  const gpa = totalPoints / totalCredits;
  return Math.round(gpa * 100) / 100;
}
