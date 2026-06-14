import type { LearnData } from './index';

export const speedLearnData: LearnData = {
  title: "Learn About Speed Conversion",
  introduction: "Speed measures the rate at which an object covers distance in a given duration of time. Understanding speed conversions is critical for automotive safety, global aviation, aerospace physics, and daily travel plans.",
  whatIsTitle: "What is Speed?",
  whatIsDescription: "Speed is a scalar physical quantity, representing magnitude only (unlike velocity, which has direction). It is defined as distance divided by elapsed time. Converting between speed scales is necessary due to varying national speed laws (mph vs km/h), maritime navigation (knots), and supersonic flight sciences (Mach).",
  systemComparisonTitle: "Miles per Hour vs Kilometers per Hour",
  systemComparisonDescription: "Miles per Hour (mph) is the primary speed unit for vehicle travel in the United States and the United Kingdom. Kilometers per Hour (km/h) is the SI-derived standard used by almost all other countries for legal speed limits and daily traffic. Supersonic scales like Mach represent the ratio of an object's speed relative to the local speed of sound.",
  units: [
    { name: "Meter per Second", symbol: "m/s", description: "The SI base unit of speed, defined by the distance in meters covered in exactly one second." },
    { name: "Kilometer per Hour", symbol: "km/h", description: "The standard metric speed unit, widely used globally for vehicle dashboards and speed limit signs." },
    { name: "Mile per Hour", symbol: "mph", description: "The standard speed unit used for vehicle limits and road speed tracking in the US and UK." },
    { name: "Knot", symbol: "kn", description: "Equal to one nautical mile per hour (approx. 1.852 km/h). Used in marine navigation and aviation." },
    { name: "Foot per Second", symbol: "ft/s", description: "An imperial unit of speed, commonly used in ballistics, physics, and technical structural design." },
    { name: "Mach", symbol: "M", description: "A relative unit representing the speed of an object divided by the local speed of sound in air (approx. 343 m/s at 20°C)." }
  ],
  formulas: [
    { label: "Mph to Km/h", formula: "Multiply mph by 1.609344" },
    { label: "Km/h to Mph", formula: "Multiply km/h by 0.621371 (or divide by 1.609344)" },
    { label: "M/s to Km/h", formula: "Multiply m/s by 3.6" },
    { label: "Km/h to M/s", formula: "Divide km/h by 3.6" }
  ],
  realWorldExamples: [
    "Tracking standard legal speed limits and setting vehicle cruise control metrics.",
    "Formulating flight speed vectors (in knots or Mach) for commercial and military aircraft navigation.",
    "Analyzing ballistics, wind vectors, and fluid flow velocities in technical engineering blueprints."
  ],
  faqs: [
    { q: "What is the speed of sound?", a: "The speed of sound in dry air at 20°C (68°F) is approximately 343 meters per second, 1,235 kilometers per hour, or 767 miles per hour (representing Mach 1)." },
    { q: "What is a knot in speed?", a: "A knot is a unit of speed equal to exactly one nautical mile per hour, equivalent to 1.15 miles per hour or 1.852 kilometers per hour. It is widely used in maritime and aviation settings." },
    { q: "How do you convert m/s to km/h?", a: "To convert meters per second to kilometers per hour, simply multiply by exactly 3.6." },
    { q: "Is speed different from velocity?", a: "Yes, speed is a scalar quantity (only measures how fast an object is moving), whereas velocity is a vector quantity (measures both how fast and in what direction the object is traveling)." }
  ],
  relatedCategories: ["length", "time", "flow-rate"]
};
