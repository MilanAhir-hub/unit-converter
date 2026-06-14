import { converterCategories, type UnitDef, type ConverterCategory } from './converter';

export interface SEOUnitMeta {
  singular: string;
  plural: string;
  symbol: string;
  definition: string;
  context: string;
}

export const curatedUnitMeta: Record<string, SEOUnitMeta> = {
  // Length
  'inch': {
    singular: 'inch',
    plural: 'inches',
    symbol: 'in',
    definition: 'An inch is a unit of length in the imperial and US customary systems of measurement. It was historically defined as the width of a human thumb, but since 1959, it has been internationally defined as exactly 25.4 millimeters.',
    context: 'Inches are widely used in the United States, United Kingdom, and Canada for everyday measurements, such as screen sizes (television and computer monitors), clothing measurements, tire diameters, and woodworking.'
  },
  'centimeter': {
    singular: 'centimeter',
    plural: 'centimeters',
    symbol: 'cm',
    definition: 'A centimeter is a unit of length in the metric system, equal to one-hundredth of a meter. It is based on the SI base unit, the meter.',
    context: 'Centimeters are used globally in medical records (to record height and wound size), everyday measurements, clothing sizes, science, and education in metric-adopting countries.'
  },
  'meter': {
    singular: 'meter',
    plural: 'meters',
    symbol: 'm',
    definition: 'The meter is the base unit of length in the International System of Units (SI). It is defined as the distance traveled by light in a vacuum in 1/299,792,458 of a second.',
    context: 'Meters are the global standard for measuring heights, short distances, sports tracks, construction dimensions, and in scientific research worldwide.'
  },
  'kilometer': {
    singular: 'kilometer',
    plural: 'kilometers',
    symbol: 'km',
    definition: 'A kilometer is a metric unit of length equal to 1,000 meters. It is the standard unit for expressing geographical distances on land in most of the world.',
    context: 'Kilometers are used for road signs, speed limits, maps, hiking routes, and athletic racing distances (like 5K and 10K runs) in almost all countries except the US and UK.'
  },
  'mile': {
    singular: 'mile',
    plural: 'miles',
    symbol: 'mi',
    definition: 'A mile is an imperial unit of length equal to 5,280 feet, 1,760 yards, or exactly 1,609.344 meters. It originated from the Roman mile, which was defined as 1,000 paces.',
    context: 'Miles are the official unit for measuring road distances and vehicle speeds in the United States, United Kingdom, and several island nations.'
  },
  'foot': {
    singular: 'foot',
    plural: 'feet',
    symbol: 'ft',
    definition: 'A foot is an imperial and US customary unit of length equal to 12 inches or 0.3048 meters.',
    context: 'Feet are commonly used to measure human height, building elevations, room dimensions, aviation altitudes (expressed in feet above sea level), and in sports fields.'
  },
  'yard': {
    singular: 'yard',
    plural: 'yards',
    symbol: 'yd',
    definition: 'A yard is an imperial unit of length equal to 3 feet or 36 inches, which is exactly 0.9144 meters.',
    context: 'Yards are primarily used in American football field markings, golf courses, fabric measurements, and gardening/landscaping in the US and UK.'
  },
  'millimeter': {
    singular: 'millimeter',
    plural: 'millimeters',
    symbol: 'mm',
    definition: 'A millimeter is a metric unit of length equal to one-thousandth of a meter, or one-tenth of a centimeter.',
    context: 'Millimeters are used for high-precision engineering, manufacturing, blueprints, science, and recording small precipitation amounts in weather reports.'
  },

  // Weight & Mass
  'kilogram': {
    singular: 'kilogram',
    plural: 'kilograms',
    symbol: 'kg',
    definition: 'The kilogram is the base unit of mass in the International System of Units (SI). It is defined in terms of the Planck constant.',
    context: 'Kilograms are the standard unit of mass globally for body weight, grocery scales, postal shipping, scientific measurements, and industrial weighing.'
  },
  'pound': {
    singular: 'pound',
    plural: 'pounds',
    symbol: 'lb',
    definition: 'The pound is a unit of mass used in the imperial and US customary measurement systems, defined as exactly 0.45359237 kilograms.',
    context: 'Pounds are the primary unit for body weight, recipes, fitness weights, and commercial shipping packages in the US and parts of the UK.'
  },
  'gram': {
    singular: 'gram',
    plural: 'grams',
    symbol: 'g',
    definition: 'A gram is a metric unit of mass equal to one-thousandth of a kilogram, or approximately the mass of one cubic centimeter of water.',
    context: 'Grams are standard in cooking recipes, nutritional labeling, scientific lab measurements, and weighing lightweight commodities like jewelry and postage.'
  },
  'ounce': {
    singular: 'ounce',
    plural: 'ounces',
    symbol: 'oz',
    definition: 'An ounce is an imperial unit of mass equal to 1/16 of a pound, which is approximately 28.3495 grams.',
    context: 'Ounces are commonly used in recipes, weighing postage envelopes, and measuring food portion sizes in the United States.'
  },

  // Temperature
  'celsius': {
    singular: 'degree Celsius',
    plural: 'degrees Celsius',
    symbol: '°C',
    definition: 'Celsius is a temperature scale based on the freezing point of water at 0°C and the boiling point of water at 100°C under standard atmospheric pressure.',
    context: 'Celsius is the official scale for weather forecasting, science, cooking, and medical readings in almost every country globally, except the US.'
  },
  'fahrenheit': {
    singular: 'degree Fahrenheit',
    plural: 'degrees Fahrenheit',
    symbol: '°F',
    definition: 'Fahrenheit is a temperature scale where water freezes at 32°F and boils at 212°F under standard atmospheric pressure.',
    context: 'Fahrenheit is the standard scale for weather reporting, thermostats, and ovens in the United States, its territories, and a few Caribbean countries.'
  },
  'kelvin': {
    singular: 'Kelvin',
    plural: 'Kelvin',
    symbol: 'K',
    definition: 'The Kelvin is the SI base unit of thermodynamic temperature. The scale starts at absolute zero (0 K), which is the theoretical absence of all thermal energy.',
    context: 'Kelvin is primarily used in scientific research, thermodynamics, astronomy, and lighting color temperatures (e.g., 5000K daylight bulb).'
  },

  // Volume
  'liter': {
    singular: 'liter',
    plural: 'liters',
    symbol: 'L',
    definition: 'A liter is a metric unit of volume equal to one cubic decimeter, 1,000 cubic centimeters, or 1,000 milliliters.',
    context: 'Liters are used worldwide for measuring beverage sizes, automobile engine displacements, fuel volumes, and liquid packaging.'
  },
  'gallon-us': {
    singular: 'US gallon',
    plural: 'US gallons',
    symbol: 'gal',
    definition: 'A US gallon is an imperial-derived unit of volume in the US customary system, defined as exactly 231 cubic inches or 3.785411784 liters.',
    context: 'US gallons are the standard unit for buying gasoline, milk jugs, paint cans, and monitoring water consumption in the United States.'
  },
  'milliliter': {
    singular: 'milliliter',
    plural: 'milliliters',
    symbol: 'mL',
    definition: 'A milliliter is a metric unit of volume equal to one-thousandth of a liter, or exactly one cubic centimeter.',
    context: 'Milliliters are the primary unit for medication dosages, chemistry experiments, cosmetics, beverages, and liquid baking ingredients.'
  },
  'fluid-ounce-us': {
    singular: 'US fluid ounce',
    plural: 'US fluid ounces',
    symbol: 'fl oz',
    definition: 'A US fluid ounce is a unit of volume equal to 1/128 of a US gallon, which is approximately 29.5735 milliliters.',
    context: 'Fluid ounces are standard in the United States for nutritional labeling, drink sizes, perfume bottles, and liquid recipe measurements.'
  },

  // Area
  'square-foot': {
    singular: 'square foot',
    plural: 'square feet',
    symbol: 'sq ft',
    definition: 'A square foot is an imperial unit of area defined as the area of a square with sides of exactly 1 foot.',
    context: 'Square feet are the primary unit of measurement for real estate (houses, apartments, commercial offices), carpet flooring, and building blueprints in the United States.'
  },
  'square-meter': {
    singular: 'square meter',
    plural: 'square meters',
    symbol: 'sq m',
    definition: 'A square meter is the SI derived unit of area defined as the area of a square with sides of exactly 1 meter.',
    context: 'Square meters are the international standard for real estate, floor space, land layout, and construction measurements in metric countries.'
  },
  'acre': {
    singular: 'acre',
    plural: 'acres',
    symbol: 'ac',
    definition: 'An acre is a unit of land area equal to 43,560 square feet or approximately 4,046.86 square meters.',
    context: 'Acres are heavily used in farming, real estate, forestry, and public land administration to describe properties, parks, and fields in the US and UK.'
  },

  // Speed
  'kmh': {
    singular: 'kilometer per hour',
    plural: 'kilometers per hour',
    symbol: 'km/h',
    definition: 'Kilometer per hour is a unit of speed expressing the number of kilometers traveled in one hour.',
    context: 'Used globally for vehicle speeds, speed limits, and road transit speedometers in almost all countries.'
  },
  'mph': {
    singular: 'mile per hour',
    plural: 'miles per hour',
    symbol: 'mph',
    definition: 'Mile per hour is an imperial unit of speed expressing the number of miles traveled in one hour.',
    context: 'The official speed unit on road signs and speedometers in the United States, United Kingdom, and their territories.'
  },

  // Time
  'second': {
    singular: 'second',
    plural: 'seconds',
    symbol: 's',
    definition: 'The second is the base unit of time in the International System of Units (SI), defined in terms of the cesium frequency.',
    context: 'The fundamental unit of time used globally in science, sports timing, computers, and everyday life.'
  },
  'minute': {
    singular: 'minute',
    plural: 'minutes',
    symbol: 'min',
    definition: 'A minute is a unit of time equal to 60 seconds or 1/60 of an hour.',
    context: 'Used universally to express short durations, schedules, cooking times, and time-tracking.'
  },
  'hour': {
    singular: 'hour',
    plural: 'hours',
    symbol: 'hr',
    definition: 'An hour is a unit of time equal to 60 minutes or 3,600 seconds.',
    context: 'Used worldwide as the standard division of the day for labor schedules, travel time, and daily planning.'
  },

  // Data Storage
  'megabyte': {
    singular: 'Megabyte',
    plural: 'Megabytes',
    symbol: 'MB',
    definition: 'A Megabyte is a unit of digital information storage equal to 1,024 Kilobytes or 1,048,576 bytes in binary prefixing (or 1,000,000 bytes in decimal SI).',
    context: 'Used to measure sizes of photos, songs, documents, email attachments, and network transmission logs.'
  },
  'gigabyte': {
    singular: 'Gigabyte',
    plural: 'Gigabytes',
    symbol: 'GB',
    definition: 'A Gigabyte is a unit of digital information storage equal to 1,024 Megabytes or 1,073,741,824 bytes in binary representation.',
    context: 'Commonly used to measure storage capacities of smartphones, computer SSDs, USB drives, movie files, and cloud allocations.'
  }
};

/**
 * Resolves standard name, plural names, symbol or alias case-insensitively to its matching UnitDef and ConverterCategory
 */
export function findUnitAndCategory(labelOrSymbol: string): { unit: UnitDef; category: ConverterCategory } | null {
  if (!labelOrSymbol) return null;
  let clean = labelOrSymbol.toLowerCase().trim();

  // Custom mapping for popular aliases
  const aliasMap: Record<string, string> = {
    'inch': 'inch',
    'inches': 'inch',
    'in': 'inch',
    'cm': 'centimeter',
    'centimeter': 'centimeter',
    'centimeters': 'centimeter',
    'm': 'meter',
    'meter': 'meter',
    'meters': 'meter',
    'km': 'kilometer',
    'kilometer': 'kilometer',
    'kilometers': 'kilometer',
    'mile': 'mile',
    'miles': 'mile',
    'mi': 'mile',
    'foot': 'foot',
    'feet': 'foot',
    'ft': 'foot',
    'yard': 'yard',
    'yards': 'yard',
    'yd': 'yard',
    'millimeter': 'millimeter',
    'millimeters': 'millimeter',
    'mm': 'millimeter',
    'kg': 'kilogram',
    'kilogram': 'kilogram',
    'kilograms': 'kilogram',
    'g': 'gram',
    'gram': 'gram',
    'grams': 'gram',
    'lb': 'pound',
    'lbs': 'pound',
    'pound': 'pound',
    'pounds': 'pound',
    'oz': 'ounce',
    'ounce': 'ounce',
    'ounces': 'ounce',
    'celsius': 'celsius',
    'c': 'celsius',
    'fahrenheit': 'fahrenheit',
    'f': 'fahrenheit',
    'kelvin': 'kelvin',
    'k': 'kelvin',
    'liter': 'liter',
    'liters': 'liter',
    'l': 'liter',
    'gallon': 'gallon-us',
    'gallons': 'gallon-us',
    'gal': 'gallon-us',
    'ml': 'milliliter',
    'milliliters': 'milliliter',
    'fluid-ounce': 'fluid-ounce-us',
    'fluid-ounces': 'fluid-ounce-us',
    'fl-oz': 'fluid-ounce-us',
    'square-foot': 'square-foot',
    'square-feet': 'square-foot',
    'sq-ft': 'square-foot',
    'square-meter': 'square-meter',
    'square-meters': 'square-meter',
    'sq-m': 'square-meter',
    'acre': 'acre',
    'acres': 'acre',
    'kmh': 'kmh',
    'mph': 'mph',
    'second': 'second',
    'seconds': 'second',
    'minute': 'minute',
    'minutes': 'minute',
    'hour': 'hour',
    'hours': 'hour',
    'mb': 'megabyte',
    'gb': 'gigabyte',
    'tb': 'terabyte'
  };

  if (aliasMap[clean]) {
    clean = aliasMap[clean];
  }

  // Linear scan across categories
  for (const cat of converterCategories) {
    // 1. Exact key match
    let found = cat.units.find(u => u.key.toLowerCase() === clean);
    if (found) return { unit: found, category: cat };

    // 2. Symbol match
    found = cat.units.find(u => u.symbol && u.symbol.toLowerCase() === clean);
    if (found) return { unit: found, category: cat };

    // 3. Label match
    found = cat.units.find(u => u.label.toLowerCase() === clean);
    if (found) return { unit: found, category: cat };

    // 4. Strip plurals
    let stripped = clean;
    if (clean.endsWith('es')) stripped = clean.slice(0, -2);
    else if (clean.endsWith('s')) stripped = clean.slice(0, -1);

    if (stripped !== clean) {
      found = cat.units.find(u => 
        u.key.toLowerCase() === stripped || 
        u.label.toLowerCase() === stripped || 
        (u.symbol && u.symbol.toLowerCase() === stripped)
      );
      if (found) return { unit: found, category: cat };
    }
  }

  // Fallback: substring lookup
  for (const cat of converterCategories) {
    const found = cat.units.find(u => 
      u.key.toLowerCase().includes(clean) || 
      u.label.toLowerCase().includes(clean)
    );
    if (found) return { unit: found, category: cat };
  }

  return null;
}

/**
 * Gets clean singular, plural and symbol descriptors
 */
export function getUnitSEOData(unit: UnitDef): SEOUnitMeta {
  const curated = curatedUnitMeta[unit.key];
  if (curated) return curated;

  // Fallback generic descriptors derived from unit structure
  const label = unit.label.split(' (')[0];
  const symbol = unit.symbol || '';
  return {
    singular: label.toLowerCase(),
    plural: `${label.toLowerCase()}s`,
    symbol: symbol,
    definition: `A ${label} (${symbol}) is a standard unit of measurement in the ${unit.factor !== undefined ? 'conversion system' : 'system of units'}.`,
    context: `This unit is utilized for various technical, scientific, and everyday calculation workflows.`
  };
}

/**
 * Renders live educational content blocks
 */
export function generateEducationalContent(
  value: number,
  fromUnit: UnitDef,
  toUnit: UnitDef,
  category: ConverterCategory,
  factor: number
) {
  const fromMeta = getUnitSEOData(fromUnit);
  const toMeta = getUnitSEOData(toUnit);
  
  const fromName = value === 1 ? fromMeta.singular : fromMeta.plural;
  const toName = toMeta.plural;

  return {
    intro: `Converting ${fromMeta.plural} to ${toMeta.plural} is a common calculation task. In this article, we explain the definition of each unit, showcase the step-by-step mathematical conversion formulas, provide standard reference guides, and answer popular questions about converting ${value} ${fromName} to ${toMeta.plural}.`,
    fromSection: {
      title: `What is a ${fromUnit.label}?`,
      text: `${fromMeta.definition} ${fromMeta.context}`
    },
    toSection: {
      title: `What is a ${toUnit.label}?`,
      text: `${toMeta.definition} ${toMeta.context}`
    },
    useCases: `This conversion is heavily utilized in physics, engineering calculations, academic research, industrial logistics, trade shipping documentation, and daily travel or sizing checks depending on the regional system.`
  };
}

/**
 * Generates structured FAQs dynamically
 */
export function generateFAQs(
  value: number,
  fromUnit: UnitDef,
  toUnit: UnitDef,
  category: ConverterCategory,
  resultStr: string
) {
  const fromMeta = getUnitSEOData(fromUnit);
  const toMeta = getUnitSEOData(toUnit);

  const fromLabel = value === 1 ? fromMeta.singular : fromMeta.plural;
  const unitFactorText = category.slug === 'temperature' ? 'temperature scaling values' : `a multiplication factor of ${fromUnit.factor !== undefined && toUnit.factor !== undefined ? parseFloat((fromUnit.factor / toUnit.factor).toFixed(8)) : 'conversion formulas'}`;

  return [
    {
      q: `How many ${toMeta.plural} are in ${value} ${fromLabel}?`,
      a: `There are exactly ${resultStr} ${toMeta.plural} in ${value} ${fromLabel}.`
    },
    {
      q: `How do I manually convert ${fromMeta.plural} to ${toMeta.plural}?`,
      a: `To convert ${fromMeta.plural} to ${toMeta.plural} manually, you apply the conversion factor. For this pair, it uses ${unitFactorText}. Multiply the input value (${value}) by the factor to get the result.`
    },
    {
      q: `Is the conversion from ${fromMeta.plural} to ${toMeta.plural} linear?`,
      a: category.slug === 'temperature' 
        ? `No, temperature conversions like Celsius and Fahrenheit are non-linear because they have different zero-point offsets in addition to scaling differences. For standard calculations, exact offsets (+32 or -273.15) must be incorporated.`
        : `Yes, this is a linear conversion. All metric and imperial conversions (outside of temperature scales) use constant multipliers, ensuring a direct proportion between inputs and outputs.`
    }
  ];
}

/**
 * Generates BreadcrumbList, HowTo, FAQPage, and WebPage schemas
 */
export function generateSchemas(
  value: number,
  fromUnit: UnitDef,
  toUnit: UnitDef,
  category: ConverterCategory,
  resultStr: string,
  canonicalUrl: string,
  pageTitle: string,
  pageDescription: string
) {
  const fromMeta = getUnitSEOData(fromUnit);
  const toMeta = getUnitSEOData(toUnit);
  const fromLabel = value === 1 ? fromMeta.singular : fromMeta.plural;
  
  const origin = 'https://realunitconverter.com';

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${origin}/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.label,
        'item': `${origin}/unit-converters/${category.slug}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': `${value} ${fromLabel} to ${toMeta.plural}`,
        'item': canonicalUrl
      }
    ]
  };

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to Convert ${value} ${fromLabel} to ${toMeta.plural}`,
    'description': `Complete walkthrough showing how to convert ${value} ${fromLabel} to ${toMeta.plural} using mathematical steps.`,
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Identify starting value and units',
        'text': `Starting value is ${value} in ${fromMeta.plural} (${fromUnit.symbol || ''}).`,
        'url': `${canonicalUrl}#step1`
      },
      {
        '@type': 'HowToStep',
        'name': 'Apply conversion formula',
        'text': category.slug === 'temperature'
          ? `Use the temperature translation formula based on Celsius/Fahrenheit alignments.`
          : `Multiply the value (${value}) by the conversion multiplier ${fromUnit.factor !== undefined && toUnit.factor !== undefined ? parseFloat((fromUnit.factor / toUnit.factor).toFixed(8)) : 'derived factor'}.`,
        'url': `${canonicalUrl}#step2`
      },
      {
        '@type': 'HowToStep',
        'name': 'Obtain the result',
        'text': `The final result is calculated as ${resultStr} ${toMeta.plural} (${toUnit.symbol || ''}).`,
        'url': `${canonicalUrl}#step3`
      }
    ]
  };

  const faqsData = generateFAQs(value, fromUnit, toUnit, category, resultStr);
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsData.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': pageTitle,
    'description': pageDescription,
    'breadcrumb': {
      '@id': `${canonicalUrl}#breadcrumb`
    }
  };

  return {
    breadcrumbs,
    howTo,
    faqPage,
    webPage
  };
}
