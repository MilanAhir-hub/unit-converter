import type { LearnData } from './index';

export const lengthLearnData: LearnData = {
  title: "Learn About Length Conversion",
  introduction: "Length is the measurement of the physical distance between two points. It is a fundamental dimension in all sciences and trades, used globally to define space, coordinates, engineering specifications, and geography.",
  whatIsTitle: "What is Length?",
  whatIsDescription: "Length represents a one-dimensional measure of distance. In physics and daily measurements, it is a primary quantity. It describes the span of objects, height, depth, and spatial distance. Precise length calculation is critical for construction, mapping, manufacturing, and spatial sciences.",
  systemComparisonTitle: "Metric vs Imperial System",
  systemComparisonDescription: "The Metric System (based on powers of 10 like millimeters, centimeters, meters, and kilometers) is used globally for science and standard industrial specs. The Imperial System (based on inches, feet, yards, and miles) is widely utilized in the United States and the United Kingdom for everyday measurements, construction, and road travel.",
  units: [
    { name: "Meter", symbol: "m", description: "The SI base unit of length, defined by the distance light travels in a vacuum in 1/299,792,458 of a second." },
    { name: "Centimeter", symbol: "cm", description: "A metric unit equal to 1/100 of a meter. Commonly used for daily sizes and height measurements." },
    { name: "Millimeter", symbol: "mm", description: "A metric unit equal to 1/1,000 of a meter. Essential for technical engineering and fine structural precision." },
    { name: "Kilometer", symbol: "km", description: "Equal to 1,000 meters. The standard unit for geographical distances and road speeds globally." },
    { name: "Inch", symbol: "in", description: "An imperial unit equal to 2.54 centimeters. Commonly used for screen sizes, tools, and personal heights." },
    { name: "Foot", symbol: "ft", description: "Equal to 12 inches or 30.48 centimeters. Used in construction, flight altitudes, and height scaling." },
    { name: "Yard", symbol: "yd", description: "Equal to 3 feet or 36 inches. Often used in sports tracking, textiles, and building yards." },
    { name: "Mile", symbol: "mi", description: "Equal to 1,760 yards or 1.609 kilometers. The standard unit for vehicle distance in the US and UK." }
  ],
  formulas: [
    { label: "Centimeters to Meters", formula: "Multiply centimeters by 0.01 (or divide by 100)" },
    { label: "Meters to Centimeters", formula: "Multiply meters by 100" },
    { label: "Inches to Centimeters", formula: "Multiply inches by 2.54" },
    { label: "Kilometers to Miles", formula: "Multiply kilometers by 0.621371" },
    { label: "Miles to Kilometers", formula: "Multiply miles by 1.609344" }
  ],
  realWorldExamples: [
    "Drafting architectural plans and structural dimensions for house construction.",
    "Mapping driving routes, flight coordinates, and long-range shipping logistics.",
    "Measuring product screen sizes (TVs, smartphones) and standard consumer goods."
  ],
  faqs: [
    { q: "How many centimeters are in a meter?", a: "There are exactly 100 centimeters in 1 meter." },
    { q: "How many feet are in a meter?", a: "There are approximately 3.28084 feet in 1 meter." },
    { q: "What is the SI unit of length?", a: "The International System of Units (SI) base unit of length is the Meter (m)." },
    { q: "How many inches are in a foot?", a: "There are exactly 12 inches in a foot." }
  ],
  relatedCategories: ["area", "volume", "speed"]
};
