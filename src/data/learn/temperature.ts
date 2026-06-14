import type { LearnData } from './index';

export const tempLearnData: LearnData = {
  title: "Learn About Temperature Conversion",
  introduction: "Temperature is a physical property that measures the average kinetic energy of the particles in a substance (essentially how hot or cold it is). Converting between temperature scales is critical for weather reporting, aerospace engineering, culinary arts, and industrial metallurgy.",
  whatIsTitle: "What is Temperature?",
  whatIsDescription: "Temperature scales are designed around specific physical reference points (like the freezing and boiling points of water). While Celsius and Fahrenheit are standard for global household reports, scientists and engineers rely on Kelvin and Rankine for thermodynamic modeling because they start at absolute zero, where all molecular motion stops.",
  systemComparisonTitle: "Celsius vs Fahrenheit vs Kelvin Scales",
  systemComparisonDescription: "The Celsius (°C) scale divides the interval between the freezing and boiling points of water into exactly 100 degrees. The Fahrenheit (°F) scale is commonly used in the United States and has freezing at 32°F and boiling at 212°F. The Kelvin (K) scale is the scientific SI standard, shifting Celsius values by 273.15 to align with absolute zero.",
  units: [
    { name: "Celsius", symbol: "°C", description: "The standard metric temperature scale, where water freezes at 0°C and boils at 100°C under normal atmospheric pressure." },
    { name: "Fahrenheit", symbol: "°F", description: "Commonly used in the US, where water freezes at 32°F and boils at 212°F under normal atmospheric pressure." },
    { name: "Kelvin", symbol: "K", description: "The thermodynamic base SI unit, where 0 K represents absolute zero (-273.15°C). It does not use the degree symbol." },
    { name: "Rankine", symbol: "°R", description: "An absolute scale aligned with Fahrenheit, where 0°R represents absolute zero and shifts Fahrenheit values by 459.67." },
    { name: "Réaumur", symbol: "°Ré", description: "A historic temperature scale where water freezes at 0°Ré and boils at 80°Ré. Used historically in Europe." }
  ],
  formulas: [
    { label: "Celsius to Fahrenheit", formula: "Multiply Celsius by 9/5 (or 1.8) and add 32" },
    { label: "Fahrenheit to Celsius", formula: "Subtract 32 from Fahrenheit, then multiply by 5/9" },
    { label: "Celsius to Kelvin", formula: "Add 273.15 to the Celsius value" },
    { label: "Kelvin to Celsius", formula: "Subtract 273.15 from the Kelvin value" }
  ],
  realWorldExamples: [
    "Setting home thermostat schedules and assessing meteorological weather patterns.",
    "Formulating precision temperature parameters for biological cultures and scientific chemical reactions.",
    "Setting oven values for culinary cooking, baking, and professional food processing."
  ],
  faqs: [
    { q: "What is Absolute Zero?", a: "Absolute zero is the theoretical lowest possible temperature where all molecular activity stops. It equals 0 K, -273.15°C, or -459.67°F." },
    { q: "At what temperature do Celsius and Fahrenheit match?", a: "Celsius and Fahrenheit are exactly equal at -40° (-40°C is equal to -40°F)." },
    { q: "Why does Kelvin not use degrees?", a: "Because Kelvin is an absolute scale that directly measures thermodynamic physical energy, not an arbitrary interval scale, so it is referred to simply as Kelvin (e.g. 300 Kelvin, not 300 degrees Kelvin)." },
    { q: "How many Fahrenheit degrees equal a Celsius degree?", a: "A change of 1°C is equivalent to a change of 1.8°F." }
  ],
  relatedCategories: ["heat", "energy", "pressure"]
};
