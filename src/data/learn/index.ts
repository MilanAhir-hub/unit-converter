import { lengthLearnData } from './length';
import { weightLearnData } from './weight';
import { tempLearnData } from './temperature';
import { speedLearnData } from './speed';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FormulaItem {
  label: string;
  formula: string;
}

export interface UnitInfo {
  name: string;
  symbol: string;
  description: string;
}

export interface LearnData {
  title: string;
  introduction: string;
  whatIsTitle: string;
  whatIsDescription: string;
  systemComparisonTitle?: string;
  systemComparisonDescription?: string;
  units: UnitInfo[];
  formulas: FormulaItem[];
  realWorldExamples: string[];
  faqs: FAQItem[];
  relatedCategories: string[];
}

const learnDataRegistry: Record<string, LearnData> = {
  'length': lengthLearnData,
  'weight-mass': weightLearnData,
  'temperature': tempLearnData,
  'speed': speedLearnData
};

/**
 * Returns dynamic learning data for a given category slug.
 * If the category does not have a customized learning file, 
 * the fallback generator creates rich, mathematically correct educational content.
 */
export function getLearnData(
  slug: string, 
  title: string, 
  categoryTitle: string, 
  units: { key: string; label: string; symbol: string }[]
): LearnData {
  if (learnDataRegistry[slug]) {
    return learnDataRegistry[slug];
  }

  // Fallback generation logic
  const cleanTitle = title.replace(" Converter", "").replace(" & Mass", "").replace("s", "").trim();
  const baseUnit = units[0]?.label || "base unit";
  
  // Choose related categories dynamically
  const relatedCategories = ['length', 'weight-mass', 'temperature', 'speed', 'area', 'volume']
    .filter(s => s !== slug)
    .slice(0, 3);

  // Generate generic common formulas
  const formulas: FormulaItem[] = [];
  if (units.length > 1) {
    const first = units[0];
    const second = units[1];
    formulas.push({
      label: `Conversion between ${first.label} and ${second.label}`,
      formula: `Standard calculations are performed by multiplying the starting value by the conversion factor relative to the canonical ${baseUnit.toLowerCase()} scale.`
    });
  }

  return {
    title: `Learn About ${cleanTitle} Conversion`,
    introduction: `Convert between standard units of ${cleanTitle.toLowerCase()} instantly. Our tools help students, engineers, and professionals make quick, precise scientific calculations.`,
    whatIsTitle: `What is ${cleanTitle}?`,
    whatIsDescription: `${cleanTitle} is a physical and scientific quantity used to measure standard systems. Accurate calculations of ${cleanTitle.toLowerCase()} are essential across mathematics, science, building systems, and global engineering trades.`,
    units: units.slice(0, 8).map(u => ({
      name: u.label,
      symbol: u.symbol,
      description: `A standard unit of measurement in the ${cleanTitle.toLowerCase()} scale, commonly used for high-precision scientific and everyday calculations.`
    })),
    formulas: formulas.length > 0 ? formulas : [
      {
        label: `Standard ${cleanTitle} Formula`,
        formula: `Standard base conversions are calculated directly relative to the canonical ${baseUnit.toLowerCase()} unit using standard NIST conversion tables.`
      }
    ],
    realWorldExamples: [
      `Measuring scientific and physical parameters in laboratory environments.`,
      `Industrial engineering specifications and trade blueprints.`,
      `Daily calculations for global logistics, shipping, and travel plans.`
    ],
    faqs: [
      {
        q: `How do I use this ${cleanTitle.toLowerCase()} converter?`,
        a: `Select your starting unit and value in the left section, and choose your target unit on the right. The calculation updates instantly as you type.`
      },
      {
        q: `What is the standard base unit for ${cleanTitle.toLowerCase()}?`,
        a: `The standard base unit used in scientific applications is the ${baseUnit}. All other units are calculated relative to this standard.`
      },
      {
        q: `Are these ${cleanTitle.toLowerCase()} conversions accurate?`,
        a: `Yes, our conversion engines use double-precision arithmetic and high-precision scientific factors matching global SI standards.`
      }
    ],
    relatedCategories
  };
}
