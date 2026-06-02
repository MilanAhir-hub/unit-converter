export interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export const navigationData: (NavCategory | NavItem)[] = [
  {
    title: "Home",
    href: "/",
    icon: "hugeicons:home-11"
  },
  {
    title: "Unit Converters",
    items: [
      { title: "Length Converter", href: "/unit-converters/length" },
      { title: "Weight & Mass Converter", href: "/unit-converters/weight-mass" },
      { title: "Temperature Converter", href: "/unit-converters/temperature" },
      { title: "Area Converter", href: "/unit-converters/area" },
      { title: "Volume Converter", href: "/unit-converters/volume" },
      { title: "Speed Converter", href: "/unit-converters/speed" },
      { title: "Time Converter", href: "/unit-converters/time" },
      { title: "Pressure Converter", href: "/unit-converters/pressure" },
      { title: "Energy Converter", href: "/unit-converters/energy" },
      { title: "Power Converter", href: "/unit-converters/power" },
      { title: "Data Storage Converter", href: "/unit-converters/data-storage" },
      { title: "Currency Converter", href: "/unit-converters/currency" },
      { title: "Angle Converter", href: "/unit-converters/angle" },
      { title: "Frequency Converter", href: "/unit-converters/frequency" },
      { title: "Fuel Consumption Converter", href: "/unit-converters/fuel-consumption" },
      { title: "Engineering Converters", href: "/unit-converters/engineering" },
      { title: "Electrical Converters", href: "/unit-converters/electrical" },
      { title: "Miscellaneous Converters", href: "/unit-converters/miscellaneous" },
      { title: "Bandwidth Converter", href: "/unit-converters/bandwidth" },
      { title: "Binary Converter", href: "/unit-converters/binary" },
      { title: "Data Transfer Rate Converter", href: "/unit-converters/data-transfer-rate" },
      { title: "Force Converter", href: "/unit-converters/force" },
      { title: "Torque Converter", href: "/unit-converters/torque" },
      { title: "Density Converter", href: "/unit-converters/density" },
      { title: "Flow Rate Converter", href: "/unit-converters/flow-rate" },
      { title: "Radiation Converter", href: "/unit-converters/radiation" },
      { title: "Heat Converter", href: "/unit-converters/heat" },
      { title: "Voltage Converter", href: "/unit-converters/voltage" },
      { title: "Current Converter", href: "/unit-converters/current" },
      { title: "Resistance Converter", href: "/unit-converters/resistance" },
      { title: "Capacitance Converter", href: "/unit-converters/capacitance" },
      { title: "Inductance Converter", href: "/unit-converters/inductance" },
    ]
  },
  {
    title: "Popular Conversions",
    items: [
      { title: "Inches to CM", href: "/popular/inches-to-cm" },
      { title: "CM to Inches", href: "/popular/cm-to-inches" },
      { title: "Feet to CM", href: "/popular/feet-to-cm" },
      { title: "CM to Feet", href: "/popular/cm-to-feet" },
      { title: "KM to Miles", href: "/popular/km-to-miles" },
      { title: "Miles to KM", href: "/popular/miles-to-km" },
      { title: "KG to Pounds", href: "/popular/kg-to-pounds" },
      { title: "Pounds to KG", href: "/popular/pounds-to-kg" },
      { title: "Liters to Gallons", href: "/popular/liters-to-gallons" },
      { title: "Gallons to Liters", href: "/popular/gallons-to-liters" },
      { title: "MB to GB", href: "/popular/mb-to-gb" },
      { title: "GB to TB", href: "/popular/gb-to-tb" },
      { title: "Binary to Decimal", href: "/popular/binary-to-decimal" },
      { title: "Decimal to Binary", href: "/popular/decimal-to-binary" },
    ]
  },
  {
    title: "Calculators",
    items: [
      { title: "Percentage Calculator", href: "/calculators/percentage" },
      { title: "BMI Calculator", href: "/calculators/bmi" },
      { title: "BMR Calculator", href: "/calculators/bmr" },
      { title: "Calorie Calculator", href: "/calculators/calorie" },
      { title: "Age Calculator", href: "/calculators/age" },
      { title: "GPA Calculator", href: "/calculators/gpa" },
      { title: "Discount Calculator", href: "/calculators/discount" },
      { title: "Loan Calculator", href: "/calculators/loan" },
      { title: "EMI Calculator", href: "/calculators/emi" },
      { title: "Scientific Calculator", href: "/calculators/scientific" },
      { title: "Interest Calculator", href: "/calculators/interest" },
      { title: "Simple Interest Calculator", href: "/calculators/simple-interest" },
      { title: "Compound Interest Calculator", href: "/calculators/compound-interest" },
      { title: "GST Calculator", href: "/calculators/gst" },
      { title: "Marks Percentage Calculator", href: "/calculators/marks-percentage" },
      { title: "Date Difference Calculator", href: "/calculators/date-difference" },
      { title: "Time Duration Calculator", href: "/calculators/time-duration" },
      { title: "Average Calculator", href: "/calculators/average" },
    ]
  },
  {
    title: "Scientific Tools",
    items: [
      { title: "Scientific Notation Converter", href: "/tools/scientific-notation" },
      { title: "Number Base Converter", href: "/tools/number-base" },
      { title: "Fraction Calculator", href: "/tools/fraction" },
      { title: "Ratio Calculator", href: "/tools/ratio" },
      { title: "Unit Prefix Converter", href: "/tools/unit-prefix" },
      { title: "Number System Converter", href: "/tools/number-system" },
    ]
  },
  {
    title: "Blog & Guides",
    href: "/blog",
    icon: "hugeicons:book-open-01"
  },
  {
    title: "About",
    href: "/about",
    icon: "hugeicons:information-circle"
  },
  {
    title: "Contact",
    href: "/contact",
    icon: "hugeicons:mail-01"
  }
];

export const isCategory = (item: NavCategory | NavItem): item is NavCategory => {
  return 'items' in item;
};
