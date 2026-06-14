import type { LearnData } from './index';

export const weightLearnData: LearnData = {
  title: "Learn About Weight & Mass Conversion",
  introduction: "Mass represents the absolute amount of matter in an object, while weight is the gravitational force acting on that mass. In daily life, these terms are used interchangeably, and converting between their units is essential for trade, science, cooking, and heavy industry.",
  whatIsTitle: "What is Mass and Weight?",
  whatIsDescription: "Mass is an intrinsic property of a physical body that does not change regardless of location (a brick has the same mass on Earth as it does on the Moon). Weight measures the pull of gravity on that mass and changes based on gravitational strength. Measuring mass precisely is core to chemical engineering, shipping weights, health trackers, and grocery scales.",
  systemComparisonTitle: "Metric vs Imperial Mass",
  systemComparisonDescription: "The metric system uses the gram as its baseline, scaling with decimal values like milligrams, grams, kilograms, and metric tons. The imperial and US customary systems rely on grains, ounces, pounds, stones, and short/long tons, which are common in shipping, retail weight scales, and package shipping.",
  units: [
    { name: "Kilogram", symbol: "kg", description: "The SI base unit of mass, defined by the physical Planck constant and standard quantum scaling." },
    { name: "Gram", symbol: "g", description: "A metric unit equal to 1/1,000 of a kilogram. Extensively used in laboratories, nutrition cards, and cooking recipes." },
    { name: "Milligram", symbol: "mg", description: "Equal to 1/1,000 of a gram. Vital for pharmaceutical dosages and precision chemical parameters." },
    { name: "Pound", symbol: "lb", description: "An imperial unit equal to exactly 0.45359237 kilograms. The standard daily weight unit in the US." },
    { name: "Ounce", symbol: "oz", description: "An imperial unit equal to 1/16 of a pound or 28.3495 grams. Used for packaged foods and small shipping packages." },
    { name: "Stone", symbol: "st", description: "An imperial unit equal to 14 pounds or 6.35029 kilograms. Commonly used in the UK for personal body weight." },
    { name: "Metric Ton", symbol: "t", description: "Equal to 1,000 kilograms. Used for industrial shipping, bulk materials, and cargo limits." },
    { name: "Carat", symbol: "ct", description: "Equal to 200 milligrams. The standard unit for measuring precious gems and diamonds." }
  ],
  formulas: [
    { label: "Pounds to Kilograms", formula: "Multiply pounds by 0.453592 (or divide by 2.20462)" },
    { label: "Kilograms to Pounds", formula: "Multiply kilograms by 2.20462" },
    { label: "Grams to Ounces", formula: "Multiply grams by 0.035274" },
    { label: "Ounces to Grams", formula: "Multiply ounces by 28.3495" }
  ],
  realWorldExamples: [
    "Formulating medication weights and active chemical compounds in pharmaceutical laboratories.",
    "Measuring food ingredients for precise baking recipes and packaging weights.",
    "Declaring heavy cargo and container masses for international maritime shipping logistics."
  ],
  faqs: [
    { q: "What is the difference between mass and weight?", a: "Mass is the constant quantity of matter in an object, while weight is the variable gravitational pull on that matter depending on where it is measured." },
    { q: "How many grams are in a kilogram?", a: "There are exactly 1,000 grams in 1 kilogram." },
    { q: "How many pounds are in a kilogram?", a: "There are approximately 2.20462 pounds in 1 kilogram." },
    { q: "What is a stone in weight?", a: "A stone is a unit of mass in the British Imperial system equal to exactly 14 pounds (approx. 6.35 kilograms)." }
  ],
  relatedCategories: ["density", "force", "volume"]
};
