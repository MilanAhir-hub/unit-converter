/**
 * Central Conversion Engine
 * Single source of truth for all units and conversion logic.
 * Architecture: every unit stores a factor to/from a canonical base unit.
 * For non-linear units (temperature), a custom convert() function is used.
 */

export interface UnitDef {
  /** Unique machine key, e.g. "meter" */
  key: string;
  /** Human-readable label, e.g. "Meter (m)" */
  label: string;
  /** Short symbol, e.g. "m" */
  symbol: string;
  /**
   * Factor relative to the category's base unit.
   * value_in_base = input * factor
   * result = value_in_base / target.factor
   *
   * Omit when using custom convert/fromBase functions.
   */
  factor?: number;
  /** Custom forward converter: input → base */
  toBase?: (v: number) => number;
  /** Custom backward converter: base → output */
  fromBase?: (v: number) => number;
}

export interface ConverterCategory {
  /** Slug that matches the URL segment */
  slug: string;
  /** Human label */
  label: string;
  /** Short description for SEO */
  description: string;
  /** All available units */
  units: UnitDef[];
  /** Default from-unit key */
  defaultFrom: string;
  /** Default to-unit key */
  defaultTo: string;
  /** Category icon name (hugeicons) */
  icon: string;
}

// ─── Helper ────────────────────────────────────────────────────────────────────

function linearConvert(value: number, from: UnitDef, to: UnitDef): number {
  if (from.factor === undefined || to.factor === undefined) {
    return NaN; // Signal invalid factor without crashing
  }
  const baseValue = value * from.factor;
  return baseValue / to.factor;
}

export function convert(value: number, fromKey: string, toKey: string, category: ConverterCategory): number {
  if (
    typeof value !== 'number' || 
    isNaN(value) || 
    !isFinite(value) ||
    !fromKey ||
    !toKey ||
    !category
  ) {
    return NaN;
  }

  if (fromKey === toKey) return value;

  const from = category.units.find(u => u.key === fromKey);
  const to   = category.units.find(u => u.key === toKey);

  if (!from || !to) return NaN;

  if (category.slug === 'temperature') {
    if (fromKey === 'kelvin' && value < 0) throw new Error('Temperature below absolute zero.');
    if (fromKey === 'celsius' && value < -273.15) throw new Error('Temperature below absolute zero.');
    if (fromKey === 'fahrenheit' && value < -459.67) throw new Error('Temperature below absolute zero.');
    if (fromKey === 'rankine' && value < 0) throw new Error('Temperature below absolute zero.');
    if (fromKey === 'reaumur' && value < -218.52) throw new Error('Temperature below absolute zero.');
  }

  try {
    // Non-linear path
    if (from.toBase && to.fromBase) {
      const base = from.toBase(value);
      return to.fromBase(base);
    }
    if (from.toBase && to.factor !== undefined) {
      const base = from.toBase(value);
      return base / to.factor;
    }
    if (from.factor !== undefined && to.fromBase) {
      const base = value * from.factor;
      return to.fromBase(base);
    }

    // Linear path
    return linearConvert(value, from, to);
  } catch (e) {
    return NaN;
  }
}

// ─── Categories ────────────────────────────────────────────────────────────────

export const converterCategories: ConverterCategory[] = [

  // ── LENGTH (base: meter) ────────────────────────────────────────────────────
  {
    slug: 'length',
    label: 'Length Converter',
    description: 'Convert between meters, kilometers, miles, feet, inches, centimeters, and more with instant precision.',
    icon: 'hugeicons:ruler',
    defaultFrom: 'meter',
    defaultTo: 'foot',
    units: [
      { key: 'meter',       label: 'Meter',        symbol: 'm',   factor: 1 },
      { key: 'kilometer',   label: 'Kilometer',    symbol: 'km',  factor: 1000 },
      { key: 'centimeter',  label: 'Centimeter',   symbol: 'cm',  factor: 0.01 },
      { key: 'millimeter',  label: 'Millimeter',   symbol: 'mm',  factor: 0.001 },
      { key: 'micrometer',  label: 'Micrometer',   symbol: 'µm',  factor: 1e-6 },
      { key: 'nanometer',   label: 'Nanometer',    symbol: 'nm',  factor: 1e-9 },
      { key: 'mile',        label: 'Mile',         symbol: 'mi',  factor: 1609.344 },
      { key: 'yard',        label: 'Yard',         symbol: 'yd',  factor: 0.9144 },
      { key: 'foot',        label: 'Foot',         symbol: 'ft',  factor: 0.3048 },
      { key: 'inch',        label: 'Inch',         symbol: 'in',  factor: 0.0254 },
      { key: 'nautical-mile', label: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
      { key: 'light-year',  label: 'Light Year',   symbol: 'ly',  factor: 9.461e15 },
      { key: 'furlong',     label: 'Furlong',      symbol: 'fur', factor: 201.168 },
      { key: 'fathom',      label: 'Fathom',       symbol: 'ftm', factor: 1.8288 },
      { key: 'chain',       label: 'Chain',        symbol: 'ch',  factor: 20.1168 },
      { key: 'angstrom',    label: 'Ångström',     symbol: 'Å',   factor: 1e-10 },
    ]
  },

  // ── WEIGHT / MASS (base: kilogram) ─────────────────────────────────────────
  {
    slug: 'weight-mass',
    label: 'Weight & Mass Converter',
    description: 'Convert kilograms, grams, pounds, ounces, tons, and more units of weight and mass instantly.',
    icon: 'hugeicons:weight-scale',
    defaultFrom: 'kilogram',
    defaultTo: 'pound',
    units: [
      { key: 'kilogram',    label: 'Kilogram',      symbol: 'kg',  factor: 1 },
      { key: 'gram',        label: 'Gram',           symbol: 'g',   factor: 0.001 },
      { key: 'milligram',   label: 'Milligram',      symbol: 'mg',  factor: 1e-6 },
      { key: 'microgram',   label: 'Microgram',      symbol: 'µg',  factor: 1e-9 },
      { key: 'metric-ton',  label: 'Metric Ton',     symbol: 't',   factor: 1000 },
      { key: 'pound',       label: 'Pound',          symbol: 'lb',  factor: 0.453592 },
      { key: 'ounce',       label: 'Ounce',          symbol: 'oz',  factor: 0.0283495 },
      { key: 'stone',       label: 'Stone',          symbol: 'st',  factor: 6.35029 },
      { key: 'us-ton',      label: 'US Ton (Short)', symbol: 'tn',  factor: 907.185 },
      { key: 'imperial-ton',label: 'Imperial Ton',   symbol: 'LT',  factor: 1016.05 },
      { key: 'carat',       label: 'Carat',          symbol: 'ct',  factor: 0.0002 },
      { key: 'grain',       label: 'Grain',          symbol: 'gr',  factor: 0.0000647989 },
    ]
  },

  // ── TEMPERATURE (non-linear, base: Kelvin) ─────────────────────────────────
  {
    slug: 'temperature',
    label: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, and Rankine temperature scales precisely.',
    icon: 'hugeicons:thermometer',
    defaultFrom: 'celsius',
    defaultTo: 'fahrenheit',
    units: [
      {
        key: 'celsius', label: 'Celsius', symbol: '°C',
        toBase:   (v) => v,
        fromBase: (c) => c,
      },
      {
        key: 'fahrenheit', label: 'Fahrenheit', symbol: '°F',
        toBase:   (v) => (v - 32) * 5 / 9,
        fromBase: (c) => (c * 9 / 5) + 32,
      },
      {
        key: 'kelvin', label: 'Kelvin', symbol: 'K',
        toBase:   (v) => v - 273.15,
        fromBase: (c) => c + 273.15,
      },
      {
        key: 'rankine', label: 'Rankine', symbol: '°R',
        toBase:   (v) => (v - 491.67) * 5 / 9,
        fromBase: (c) => (c + 273.15) * 9 / 5,
      },
      {
        key: 'reaumur', label: 'Réaumur', symbol: '°Ré',
        toBase:   (v) => v * 5 / 4,
        fromBase: (c) => c * 4 / 5,
      },
    ]
  },

  // ── AREA (base: square meter) ───────────────────────────────────────────────
  {
    slug: 'area',
    label: 'Area Converter',
    description: 'Convert square meters, acres, hectares, square feet, and more area units instantly.',
    icon: 'hugeicons:square',
    defaultFrom: 'square-meter',
    defaultTo: 'square-foot',
    units: [
      { key: 'square-meter',      label: 'Square Meter',       symbol: 'm²',   factor: 1 },
      { key: 'square-kilometer',  label: 'Square Kilometer',   symbol: 'km²',  factor: 1e6 },
      { key: 'square-centimeter', label: 'Square Centimeter',  symbol: 'cm²',  factor: 0.0001 },
      { key: 'square-millimeter', label: 'Square Millimeter',  symbol: 'mm²',  factor: 1e-6 },
      { key: 'square-foot',       label: 'Square Foot',        symbol: 'ft²',  factor: 0.092903 },
      { key: 'square-inch',       label: 'Square Inch',        symbol: 'in²',  factor: 0.00064516 },
      { key: 'square-yard',       label: 'Square Yard',        symbol: 'yd²',  factor: 0.836127 },
      { key: 'square-mile',       label: 'Square Mile',        symbol: 'mi²',  factor: 2.58999e6 },
      { key: 'acre',              label: 'Acre',               symbol: 'ac',   factor: 4046.86 },
      { key: 'hectare',           label: 'Hectare',            symbol: 'ha',   factor: 10000 },
    ]
  },

  // ── VOLUME (base: liter) ────────────────────────────────────────────────────
  {
    slug: 'volume',
    label: 'Volume Converter',
    description: 'Convert liters, gallons, milliliters, cubic meters, fluid ounces, and more volume units.',
    icon: 'hugeicons:cylinder',
    defaultFrom: 'liter',
    defaultTo: 'gallon-us',
    units: [
      { key: 'liter',          label: 'Liter',              symbol: 'L',    factor: 1 },
      { key: 'milliliter',     label: 'Milliliter',         symbol: 'mL',   factor: 0.001 },
      { key: 'cubic-meter',    label: 'Cubic Meter',        symbol: 'm³',   factor: 1000 },
      { key: 'cubic-centimeter', label: 'Cubic Centimeter', symbol: 'cm³',  factor: 0.001 },
      { key: 'cubic-inch',     label: 'Cubic Inch',         symbol: 'in³',  factor: 0.016387 },
      { key: 'cubic-foot',     label: 'Cubic Foot',         symbol: 'ft³',  factor: 28.3168 },
      { key: 'gallon-us',      label: 'Gallon (US)',        symbol: 'gal',  factor: 3.78541 },
      { key: 'gallon-uk',      label: 'Gallon (Imperial)',  symbol: 'imp gal', factor: 4.54609 },
      { key: 'quart-us',       label: 'Quart (US)',         symbol: 'qt',   factor: 0.946353 },
      { key: 'pint-us',        label: 'Pint (US)',          symbol: 'pt',   factor: 0.473176 },
      { key: 'cup',            label: 'Cup (US)',           symbol: 'cup',  factor: 0.236588 },
      { key: 'fluid-ounce-us', label: 'Fluid Ounce (US)',  symbol: 'fl oz',factor: 0.0295735 },
      { key: 'tablespoon',     label: 'Tablespoon (US)',    symbol: 'tbsp', factor: 0.0147868 },
      { key: 'teaspoon',       label: 'Teaspoon (US)',      symbol: 'tsp',  factor: 0.00492892 },
      { key: 'barrel-oil',     label: 'Barrel (Oil)',       symbol: 'bbl',  factor: 158.987 },
    ]
  },

  // ── SPEED (base: meter per second) ─────────────────────────────────────────
  {
    slug: 'speed',
    label: 'Speed Converter',
    description: 'Convert km/h, mph, m/s, knots, Mach, and other speed units precisely.',
    icon: 'hugeicons:speed-train-01',
    defaultFrom: 'kmh',
    defaultTo: 'mph',
    units: [
      { key: 'mps',    label: 'Meter per Second',    symbol: 'm/s',   factor: 1 },
      { key: 'kmh',    label: 'Kilometer per Hour',  symbol: 'km/h',  factor: 1 / 3.6 },
      { key: 'mph',    label: 'Mile per Hour',       symbol: 'mph',   factor: 0.44704 },
      { key: 'knot',   label: 'Knot',                symbol: 'kn',    factor: 0.514444 },
      { key: 'fps',    label: 'Foot per Second',     symbol: 'ft/s',  factor: 0.3048 },
      { key: 'mach',   label: 'Mach (at sea level)', symbol: 'Ma',    factor: 340.29 },
      { key: 'light',  label: 'Speed of Light',      symbol: 'c',     factor: 299792458 },
    ]
  },

  // ── TIME (base: second) ─────────────────────────────────────────────────────
  {
    slug: 'time',
    label: 'Time Converter',
    description: 'Convert seconds, minutes, hours, days, weeks, months, years, and more time units.',
    icon: 'hugeicons:clock-01',
    defaultFrom: 'hour',
    defaultTo: 'minute',
    units: [
      { key: 'nanosecond',  label: 'Nanosecond',   symbol: 'ns',  factor: 1e-9 },
      { key: 'microsecond', label: 'Microsecond',  symbol: 'µs',  factor: 1e-6 },
      { key: 'millisecond', label: 'Millisecond',  symbol: 'ms',  factor: 0.001 },
      { key: 'second',      label: 'Second',       symbol: 's',   factor: 1 },
      { key: 'minute',      label: 'Minute',       symbol: 'min', factor: 60 },
      { key: 'hour',        label: 'Hour',         symbol: 'hr',  factor: 3600 },
      { key: 'day',         label: 'Day',          symbol: 'd',   factor: 86400 },
      { key: 'week',        label: 'Week',         symbol: 'wk',  factor: 604800 },
      { key: 'month',       label: 'Month (30d)',  symbol: 'mo',  factor: 2592000 },
      { key: 'year',        label: 'Year (365d)',  symbol: 'yr',  factor: 31536000 },
      { key: 'decade',      label: 'Decade',       symbol: 'dec', factor: 315360000 },
      { key: 'century',     label: 'Century',      symbol: 'c',   factor: 3153600000 },
    ]
  },

  // ── PRESSURE (base: pascal) ─────────────────────────────────────────────────
  {
    slug: 'pressure',
    label: 'Pressure Converter',
    description: 'Convert pascals, bar, PSI, atm, mmHg, and other pressure units accurately.',
    icon: 'hugeicons:dashboard-speed-01',
    defaultFrom: 'bar',
    defaultTo: 'psi',
    units: [
      { key: 'pascal',      label: 'Pascal',             symbol: 'Pa',   factor: 1 },
      { key: 'kilopascal',  label: 'Kilopascal',         symbol: 'kPa',  factor: 1000 },
      { key: 'megapascal',  label: 'Megapascal',         symbol: 'MPa',  factor: 1e6 },
      { key: 'bar',         label: 'Bar',                symbol: 'bar',  factor: 100000 },
      { key: 'millibar',    label: 'Millibar',           symbol: 'mbar', factor: 100 },
      { key: 'psi',         label: 'PSI',                symbol: 'psi',  factor: 6894.757 },
      { key: 'atm',         label: 'Atmosphere',         symbol: 'atm',  factor: 101325 },
      { key: 'torr',        label: 'Torr',               symbol: 'Torr', factor: 133.322 },
      { key: 'mmhg',        label: 'mmHg',               symbol: 'mmHg', factor: 133.322 },
      { key: 'inhg',        label: 'Inch of Mercury',    symbol: 'inHg', factor: 3386.39 },
    ]
  },

  // ── ENERGY (base: joule) ────────────────────────────────────────────────────
  {
    slug: 'energy',
    label: 'Energy Converter',
    description: 'Convert joules, calories, kilowatt-hours, BTU, and other energy units instantly.',
    icon: 'hugeicons:lightning-02',
    defaultFrom: 'kilojoule',
    defaultTo: 'calorie',
    units: [
      { key: 'joule',       label: 'Joule',              symbol: 'J',     factor: 1 },
      { key: 'kilojoule',   label: 'Kilojoule',          symbol: 'kJ',    factor: 1000 },
      { key: 'megajoule',   label: 'Megajoule',          symbol: 'MJ',    factor: 1e6 },
      { key: 'calorie',     label: 'Calorie (cal)',       symbol: 'cal',   factor: 4.184 },
      { key: 'kilocalorie', label: 'Kilocalorie (kcal)',  symbol: 'kcal',  factor: 4184 },
      { key: 'kwh',         label: 'Kilowatt-hour',      symbol: 'kWh',   factor: 3600000 },
      { key: 'mwh',         label: 'Megawatt-hour',      symbol: 'MWh',   factor: 3.6e9 },
      { key: 'btu',         label: 'BTU',                symbol: 'BTU',   factor: 1055.06 },
      { key: 'therm',       label: 'Therm (US)',         symbol: 'thm',   factor: 105480400 },
      { key: 'erg',         label: 'Erg',                symbol: 'erg',   factor: 1e-7 },
      { key: 'ev',          label: 'Electron Volt',      symbol: 'eV',    factor: 1.60218e-19 },
      { key: 'ftlb',        label: 'Foot-pound',         symbol: 'ft·lb', factor: 1.35582 },
    ]
  },

  // ── POWER (base: watt) ──────────────────────────────────────────────────────
  {
    slug: 'power',
    label: 'Power Converter',
    description: 'Convert watts, kilowatts, horsepower, BTU/hr, and other power units.',
    icon: 'hugeicons:plug-01',
    defaultFrom: 'kilowatt',
    defaultTo: 'horsepower',
    units: [
      { key: 'watt',        label: 'Watt',               symbol: 'W',    factor: 1 },
      { key: 'kilowatt',    label: 'Kilowatt',           symbol: 'kW',   factor: 1000 },
      { key: 'megawatt',    label: 'Megawatt',           symbol: 'MW',   factor: 1e6 },
      { key: 'gigawatt',    label: 'Gigawatt',           symbol: 'GW',   factor: 1e9 },
      { key: 'horsepower',  label: 'Horsepower (hp)',    symbol: 'hp',   factor: 745.7 },
      { key: 'hp-metric',   label: 'Horsepower (metric)',symbol: 'PS',   factor: 735.499 },
      { key: 'btu-hr',      label: 'BTU per hour',       symbol: 'BTU/h',factor: 0.293071 },
      { key: 'cal-s',       label: 'Calorie per second', symbol: 'cal/s',factor: 4.184 },
      { key: 'ftlb-s',      label: 'Foot-pound/second',  symbol: 'ft·lb/s', factor: 1.35582 },
    ]
  },

  // ── DATA STORAGE (base: byte) ───────────────────────────────────────────────
  {
    slug: 'data-storage',
    label: 'Data Storage Converter',
    description: 'Convert bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and more.',
    icon: 'hugeicons:database-01',
    defaultFrom: 'gigabyte',
    defaultTo: 'megabyte',
    units: [
      { key: 'bit',       label: 'Bit',       symbol: 'b',   factor: 0.125 },
      { key: 'byte',      label: 'Byte',      symbol: 'B',   factor: 1 },
      { key: 'kilobyte',  label: 'Kilobyte',  symbol: 'KB',  factor: 1024 },
      { key: 'megabyte',  label: 'Megabyte',  symbol: 'MB',  factor: 1048576 },
      { key: 'gigabyte',  label: 'Gigabyte',  symbol: 'GB',  factor: 1073741824 },
      { key: 'terabyte',  label: 'Terabyte',  symbol: 'TB',  factor: 1.09951e12 },
      { key: 'petabyte',  label: 'Petabyte',  symbol: 'PB',  factor: 1.12590e15 },
      { key: 'exabyte',   label: 'Exabyte',   symbol: 'EB',  factor: 1.15292e18 },
      { key: 'kibibyte',  label: 'Kibibyte',  symbol: 'KiB', factor: 1024 },
      { key: 'mebibyte',  label: 'Mebibyte',  symbol: 'MiB', factor: 1048576 },
      { key: 'gibibyte',  label: 'Gibibyte',  symbol: 'GiB', factor: 1073741824 },
      { key: 'tebibyte',  label: 'Tebibyte',  symbol: 'TiB', factor: 1.09951e12 },
    ]
  },

  // ── ANGLE (base: degree) ────────────────────────────────────────────────────
  {
    slug: 'angle',
    label: 'Angle Converter',
    description: 'Convert degrees, radians, gradians, arcminutes, arcseconds, and more angle units.',
    icon: 'hugeicons:angle',
    defaultFrom: 'degree',
    defaultTo: 'radian',
    units: [
      { key: 'radian',     label: 'Radian',      symbol: 'rad',  factor: 1 },
      { key: 'degree',     label: 'Degree',      symbol: '°',    factor: Math.PI / 180 },
      { key: 'gradian',    label: 'Gradian',     symbol: 'grad', factor: Math.PI / 200 },
      { key: 'arcminute',  label: 'Arcminute',   symbol: "'",    factor: Math.PI / (180 * 60) },
      { key: 'arcsecond',  label: 'Arcsecond',   symbol: '"',    factor: Math.PI / (180 * 3600) },
      { key: 'turn',       label: 'Turn',        symbol: 'tr',   factor: 2 * Math.PI },
      { key: 'milliradian',label: 'Milliradian', symbol: 'mrad', factor: 0.001 },
    ]
  },

  // ── FREQUENCY (base: hertz) ─────────────────────────────────────────────────
  {
    slug: 'frequency',
    label: 'Frequency Converter',
    description: 'Convert hertz, kilohertz, megahertz, gigahertz, and other frequency units.',
    icon: 'hugeicons:wifi-01',
    defaultFrom: 'megahertz',
    defaultTo: 'gigahertz',
    units: [
      { key: 'hertz',      label: 'Hertz',      symbol: 'Hz',  factor: 1 },
      { key: 'kilohertz',  label: 'Kilohertz',  symbol: 'kHz', factor: 1000 },
      { key: 'megahertz',  label: 'Megahertz',  symbol: 'MHz', factor: 1e6 },
      { key: 'gigahertz',  label: 'Gigahertz',  symbol: 'GHz', factor: 1e9 },
      { key: 'terahertz',  label: 'Terahertz',  symbol: 'THz', factor: 1e12 },
      { key: 'rpm',        label: 'RPM',        symbol: 'rpm', factor: 1/60 },
      { key: 'rps',        label: 'Rev/Second', symbol: 'rps', factor: 1 },
    ]
  },

  // ── FUEL CONSUMPTION (base: L/100km) ────────────────────────────────────────
  {
    slug: 'fuel-consumption',
    label: 'Fuel Consumption Converter',
    description: 'Convert mpg, km/L, L/100km, and other fuel efficiency units accurately.',
    icon: 'hugeicons:gas-pump',
    defaultFrom: 'l-per-100km',
    defaultTo: 'mpg-us',
    units: [
      { key: 'l-per-100km', label: 'Liters per 100 km', symbol: 'L/100km', factor: 1 },
      {
        key: 'km-per-l', label: 'Kilometers per Liter', symbol: 'km/L',
        toBase: (v) => 100 / v,
        fromBase: (b) => 100 / b,
      },
      {
        key: 'mpg-us', label: 'MPG (US)', symbol: 'mpg',
        toBase: (v) => 235.215 / v,
        fromBase: (b) => 235.215 / b,
      },
      {
        key: 'mpg-uk', label: 'MPG (Imperial)', symbol: 'mpg(UK)',
        toBase: (v) => 282.481 / v,
        fromBase: (b) => 282.481 / b,
      },
      {
        key: 'miles-per-l', label: 'Miles per Liter', symbol: 'mi/L',
        toBase: (v) => 100 / (v * 1.60934),
        fromBase: (b) => 100 / (b * 1.60934),
      },
    ]
  },

  // ── FORCE (base: newton) ────────────────────────────────────────────────────
  {
    slug: 'force',
    label: 'Force Converter',
    description: 'Convert newtons, kilonewtons, pounds-force, dynes, and other force units.',
    icon: 'hugeicons:arrow-right-02',
    defaultFrom: 'newton',
    defaultTo: 'pound-force',
    units: [
      { key: 'newton',       label: 'Newton',         symbol: 'N',    factor: 1 },
      { key: 'kilonewton',   label: 'Kilonewton',     symbol: 'kN',   factor: 1000 },
      { key: 'meganewton',   label: 'Meganewton',     symbol: 'MN',   factor: 1e6 },
      { key: 'pound-force',  label: 'Pound-force',    symbol: 'lbf',  factor: 4.44822 },
      { key: 'dyne',         label: 'Dyne',           symbol: 'dyn',  factor: 1e-5 },
      { key: 'kgf',          label: 'Kilogram-force', symbol: 'kgf',  factor: 9.80665 },
      { key: 'ounce-force',  label: 'Ounce-force',    symbol: 'ozf',  factor: 0.278014 },
    ]
  },

  // ── TORQUE (base: newton-meter) ─────────────────────────────────────────────
  {
    slug: 'torque',
    label: 'Torque Converter',
    description: 'Convert newton-meters, pound-feet, kilogram-force-meters, and other torque units.',
    icon: 'hugeicons:wrench-01',
    defaultFrom: 'newton-meter',
    defaultTo: 'pound-foot',
    units: [
      { key: 'newton-meter',   label: 'Newton-meter',        symbol: 'N·m',    factor: 1 },
      { key: 'newton-centimeter', label: 'Newton-centimeter',symbol: 'N·cm',   factor: 0.01 },
      { key: 'pound-foot',     label: 'Pound-foot',          symbol: 'lbf·ft', factor: 1.35582 },
      { key: 'pound-inch',     label: 'Pound-inch',          symbol: 'lbf·in', factor: 0.112985 },
      { key: 'kgf-meter',      label: 'Kgf-meter',          symbol: 'kgf·m',  factor: 9.80665 },
      { key: 'kgf-centimeter', label: 'Kgf-centimeter',     symbol: 'kgf·cm', factor: 0.0980665 },
      { key: 'dyne-centimeter',label: 'Dyne-centimeter',    symbol: 'dyn·cm', factor: 1e-7 },
    ]
  },

  // ── DENSITY (base: kg/m³) ────────────────────────────────────────────────────
  {
    slug: 'density',
    label: 'Density Converter',
    description: 'Convert kg/m³, g/cm³, lb/ft³, and other density measurement units.',
    icon: 'hugeicons:cube-01',
    defaultFrom: 'kg-m3',
    defaultTo: 'g-cm3',
    units: [
      { key: 'kg-m3',     label: 'Kilogram/m³',       symbol: 'kg/m³', factor: 1 },
      { key: 'g-cm3',     label: 'Gram/cm³',          symbol: 'g/cm³', factor: 1000 },
      { key: 'g-ml',      label: 'Gram/mL',           symbol: 'g/mL',  factor: 1000 },
      { key: 'kg-l',      label: 'Kilogram/Liter',    symbol: 'kg/L',  factor: 1000 },
      { key: 'lb-ft3',    label: 'Pound/ft³',         symbol: 'lb/ft³',factor: 16.0185 },
      { key: 'lb-in3',    label: 'Pound/in³',         symbol: 'lb/in³',factor: 27679.9 },
      { key: 'lb-gal-us', label: 'Pound/gal (US)',    symbol: 'lb/gal',factor: 119.826 },
      { key: 'oz-in3',    label: 'Ounce/in³',         symbol: 'oz/in³',factor: 1729.99 },
    ]
  },

  // ── FLOW RATE (base: cubic meter/second) ────────────────────────────────────
  {
    slug: 'flow-rate',
    label: 'Flow Rate Converter',
    description: 'Convert m³/s, L/min, gallons/min, and other volumetric flow rate units.',
    icon: 'hugeicons:flow',
    defaultFrom: 'liter-min',
    defaultTo: 'gallon-min',
    units: [
      { key: 'cubic-meter-s',  label: 'Cubic Meter/Second', symbol: 'm³/s',   factor: 1 },
      { key: 'cubic-meter-min',label: 'Cubic Meter/Minute', symbol: 'm³/min', factor: 1/60 },
      { key: 'liter-s',        label: 'Liter/Second',       symbol: 'L/s',    factor: 0.001 },
      { key: 'liter-min',      label: 'Liter/Minute',       symbol: 'L/min',  factor: 1/60000 },
      { key: 'liter-hr',       label: 'Liter/Hour',         symbol: 'L/hr',   factor: 1/3600000 },
      { key: 'gallon-min',     label: 'Gallon/Minute (US)', symbol: 'GPM',    factor: 6.30902e-5 },
      { key: 'gallon-hr',      label: 'Gallon/Hour (US)',   symbol: 'GPH',    factor: 1.04850e-6 },
      { key: 'cubic-foot-min', label: 'Cubic Foot/Minute',  symbol: 'CFM',    factor: 0.000471947 },
    ]
  },

  // ── VOLTAGE (base: volt) ────────────────────────────────────────────────────
  {
    slug: 'voltage',
    label: 'Voltage Converter',
    description: 'Convert volts, millivolts, kilovolts, and megavolts precisely.',
    icon: 'hugeicons:electric',
    defaultFrom: 'volt',
    defaultTo: 'millivolt',
    units: [
      { key: 'volt',      label: 'Volt',      symbol: 'V',  factor: 1 },
      { key: 'millivolt', label: 'Millivolt', symbol: 'mV', factor: 0.001 },
      { key: 'microvolt', label: 'Microvolt', symbol: 'µV', factor: 1e-6 },
      { key: 'kilovolt',  label: 'Kilovolt',  symbol: 'kV', factor: 1000 },
      { key: 'megavolt',  label: 'Megavolt',  symbol: 'MV', factor: 1e6 },
    ]
  },

  // ── CURRENT (base: ampere) ──────────────────────────────────────────────────
  {
    slug: 'current',
    label: 'Current Converter',
    description: 'Convert amperes, milliamperes, microamperes, and kiloamperes.',
    icon: 'hugeicons:electricity',
    defaultFrom: 'ampere',
    defaultTo: 'milliampere',
    units: [
      { key: 'ampere',       label: 'Ampere',       symbol: 'A',  factor: 1 },
      { key: 'milliampere',  label: 'Milliampere',  symbol: 'mA', factor: 0.001 },
      { key: 'microampere',  label: 'Microampere',  symbol: 'µA', factor: 1e-6 },
      { key: 'kiloampere',   label: 'Kiloampere',   symbol: 'kA', factor: 1000 },
    ]
  },

  // ── RESISTANCE (base: ohm) ──────────────────────────────────────────────────
  {
    slug: 'resistance',
    label: 'Resistance Converter',
    description: 'Convert ohms, kilohms, megohms, and milliohms for electrical calculations.',
    icon: 'hugeicons:circuit',
    defaultFrom: 'ohm',
    defaultTo: 'kilohm',
    units: [
      { key: 'ohm',       label: 'Ohm',       symbol: 'Ω',  factor: 1 },
      { key: 'milliohm',  label: 'Milliohm',  symbol: 'mΩ', factor: 0.001 },
      { key: 'kilohm',    label: 'Kilohm',    symbol: 'kΩ', factor: 1000 },
      { key: 'megohm',    label: 'Megaohm',   symbol: 'MΩ', factor: 1e6 },
      { key: 'gigohm',    label: 'Gigaohm',   symbol: 'GΩ', factor: 1e9 },
    ]
  },

  // ── CAPACITANCE (base: farad) ────────────────────────────────────────────────
  {
    slug: 'capacitance',
    label: 'Capacitance Converter',
    description: 'Convert farads, microfarads, nanofarads, and picofarads for electronics.',
    icon: 'hugeicons:capacitor',
    defaultFrom: 'microfarad',
    defaultTo: 'nanofarad',
    units: [
      { key: 'farad',      label: 'Farad',      symbol: 'F',  factor: 1 },
      { key: 'millifarad', label: 'Millifarad', symbol: 'mF', factor: 0.001 },
      { key: 'microfarad', label: 'Microfarad', symbol: 'µF', factor: 1e-6 },
      { key: 'nanofarad',  label: 'Nanofarad',  symbol: 'nF', factor: 1e-9 },
      { key: 'picofarad',  label: 'Picofarad',  symbol: 'pF', factor: 1e-12 },
    ]
  },

  // ── INDUCTANCE (base: henry) ─────────────────────────────────────────────────
  {
    slug: 'inductance',
    label: 'Inductance Converter',
    description: 'Convert henries, millihenries, microhenries, and nanohenries.',
    icon: 'hugeicons:coil',
    defaultFrom: 'millihenry',
    defaultTo: 'microhenry',
    units: [
      { key: 'henry',      label: 'Henry',      symbol: 'H',  factor: 1 },
      { key: 'millihenry', label: 'Millihenry', symbol: 'mH', factor: 0.001 },
      { key: 'microhenry', label: 'Microhenry', symbol: 'µH', factor: 1e-6 },
      { key: 'nanohenry',  label: 'Nanohenry',  symbol: 'nH', factor: 1e-9 },
    ]
  },

  // ── DATA TRANSFER RATE (base: bit/s) ────────────────────────────────────────
  {
    slug: 'data-transfer-rate',
    label: 'Data Transfer Rate Converter',
    description: 'Convert bps, kbps, Mbps, Gbps, and other data transfer rate units.',
    icon: 'hugeicons:internet',
    defaultFrom: 'megabit-s',
    defaultTo: 'megabyte-s',
    units: [
      { key: 'bit-s',       label: 'Bit/second',       symbol: 'bps',    factor: 1 },
      { key: 'kilobit-s',   label: 'Kilobit/second',   symbol: 'kbps',   factor: 1000 },
      { key: 'megabit-s',   label: 'Megabit/second',   symbol: 'Mbps',   factor: 1e6 },
      { key: 'gigabit-s',   label: 'Gigabit/second',   symbol: 'Gbps',   factor: 1e9 },
      { key: 'terabit-s',   label: 'Terabit/second',   symbol: 'Tbps',   factor: 1e12 },
      { key: 'byte-s',      label: 'Byte/second',       symbol: 'B/s',   factor: 8 },
      { key: 'kilobyte-s',  label: 'Kilobyte/second',   symbol: 'KB/s',  factor: 8000 },
      { key: 'megabyte-s',  label: 'Megabyte/second',   symbol: 'MB/s',  factor: 8e6 },
      { key: 'gigabyte-s',  label: 'Gigabyte/second',   symbol: 'GB/s',  factor: 8e9 },
    ]
  },

  // ── BANDWIDTH (alias for data-transfer-rate) ────────────────────────────────
  {
    slug: 'bandwidth',
    label: 'Bandwidth Converter',
    description: 'Convert network bandwidth units: bps, kbps, Mbps, Gbps, and more.',
    icon: 'hugeicons:wifi',
    defaultFrom: 'megabit-s',
    defaultTo: 'gigabit-s',
    units: [
      { key: 'bit-s',      label: 'Bit/second',       symbol: 'bps',  factor: 1 },
      { key: 'kilobit-s',  label: 'Kilobit/second',   symbol: 'kbps', factor: 1000 },
      { key: 'megabit-s',  label: 'Megabit/second',   symbol: 'Mbps', factor: 1e6 },
      { key: 'gigabit-s',  label: 'Gigabit/second',   symbol: 'Gbps', factor: 1e9 },
      { key: 'terabit-s',  label: 'Terabit/second',   symbol: 'Tbps', factor: 1e12 },
      { key: 'byte-s',     label: 'Byte/second',       symbol: 'B/s', factor: 8 },
      { key: 'megabyte-s', label: 'Megabyte/second',   symbol: 'MB/s',factor: 8e6 },
    ]
  },

  // ── BINARY (base: base-10 decimal) ─────────────────────────────────────────
  {
    slug: 'binary',
    label: 'Binary Converter',
    description: 'Convert between binary, decimal, octal, and hexadecimal number systems.',
    icon: 'hugeicons:binary-code',
    defaultFrom: 'decimal',
    defaultTo: 'binary',
    units: [
      { key: 'decimal',     label: 'Decimal (Base 10)',     symbol: 'dec', factor: 1 },
      { key: 'binary',      label: 'Binary (Base 2)',       symbol: 'bin', factor: 1 },
      { key: 'octal',       label: 'Octal (Base 8)',        symbol: 'oct', factor: 1 },
      { key: 'hexadecimal', label: 'Hexadecimal (Base 16)', symbol: 'hex', factor: 1 },
    ]
  },

  // ── RADIATION (base: gray) ──────────────────────────────────────────────────
  {
    slug: 'radiation',
    label: 'Radiation Converter',
    description: 'Convert gray, rad, sievert, rem, and other radiation dose units.',
    icon: 'hugeicons:radiation',
    defaultFrom: 'gray',
    defaultTo: 'sievert',
    units: [
      { key: 'gray',     label: 'Gray',     symbol: 'Gy',  factor: 1 },
      { key: 'milligray',label: 'Milligray',symbol: 'mGy', factor: 0.001 },
      { key: 'rad',      label: 'Rad',      symbol: 'rad', factor: 0.01 },
      { key: 'sievert',  label: 'Sievert',  symbol: 'Sv',  factor: 1 },
      { key: 'millisievert',label:'Millisievert',symbol:'mSv',factor:0.001},
      { key: 'rem',      label: 'Rem',      symbol: 'rem', factor: 0.01 },
    ]
  },

  // ── HEAT (base: watt/meter-kelvin) ──────────────────────────────────────────
  {
    slug: 'heat',
    label: 'Heat Transfer Converter',
    description: 'Convert thermal conductivity units including W/(m·K), BTU/(hr·ft·°F), and kcal/(hr·m·°C).',
    icon: 'hugeicons:fire',
    defaultFrom: 'watt-mk',
    defaultTo: 'btu-hrftf',
    units: [
      { key: 'watt-mk',     label: 'W/(m·K)',          symbol: 'W/(m·K)',       factor: 1 },
      { key: 'cal-smcC',    label: 'cal/(s·m·°C)',     symbol: 'cal/(s·m·°C)', factor: 418.4 },
      { key: 'kcal-hrmcC',  label: 'kcal/(hr·m·°C)',  symbol: 'kcal/(h·m·°C)',factor: 1.163 },
      { key: 'btu-hrftf',   label: 'BTU/(hr·ft·°F)',  symbol: 'BTU/(h·ft·°F)',factor: 1.73073 },
    ]
  },

  // ── ENGINEERING (base: pascal – same as pressure) ───────────────────────────
  {
    slug: 'engineering',
    label: 'Engineering Converters',
    description: 'A suite of engineering-focused converters for professional calculations.',
    icon: 'hugeicons:settings-01',
    defaultFrom: 'newton',
    defaultTo: 'kilonewton',
    units: [
      { key: 'newton',       label: 'Newton',     symbol: 'N',  factor: 1 },
      { key: 'kilonewton',   label: 'Kilonewton', symbol: 'kN', factor: 1000 },
      { key: 'meganewton',   label: 'Meganewton', symbol: 'MN', factor: 1e6 },
      { key: 'kgf',          label: 'Kgf',        symbol: 'kgf',factor: 9.80665 },
      { key: 'pound-force',  label: 'Pound-force',symbol: 'lbf',factor: 4.44822 },
    ]
  },

  // ── ELECTRICAL (base: watt) ─────────────────────────────────────────────────
  {
    slug: 'electrical',
    label: 'Electrical Converters',
    description: 'Convert electrical units including power, voltage, current, and resistance.',
    icon: 'hugeicons:electric-plug',
    defaultFrom: 'watt',
    defaultTo: 'kilowatt',
    units: [
      { key: 'watt',       label: 'Watt',       symbol: 'W',  factor: 1 },
      { key: 'kilowatt',   label: 'Kilowatt',   symbol: 'kW', factor: 1000 },
      { key: 'megawatt',   label: 'Megawatt',   symbol: 'MW', factor: 1e6 },
      { key: 'horsepower', label: 'Horsepower', symbol: 'hp', factor: 745.7 },
    ]
  },

  // ── MISCELLANEOUS ────────────────────────────────────────────────────────────
  {
    slug: 'miscellaneous',
    label: 'Miscellaneous Converters',
    description: 'A collection of miscellaneous and specialty unit conversions.',
    icon: 'hugeicons:more-horizontal',
    defaultFrom: 'dozen',
    defaultTo: 'gross',
    units: [
      { key: 'unit',   label: 'Unit',   symbol: '',     factor: 1 },
      { key: 'dozen',  label: 'Dozen',  symbol: 'dz',   factor: 12 },
      { key: 'gross',  label: 'Gross',  symbol: 'gr',   factor: 144 },
      { key: 'score',  label: 'Score',  symbol: 'sc',   factor: 20 },
      { key: 'pair',   label: 'Pair',   symbol: 'pr',   factor: 2 },
    ]
  },

  // ── CURRENCY (base: USD) ────────────────────────────────────────────────────
  {
    slug: 'currency',
    label: 'Currency Converter',
    description: 'Convert between USD, EUR, GBP, JPY, INR, and other global currencies with latest exchange rates.',
    icon: 'hugeicons:money-03',
    defaultFrom: 'usd',
    defaultTo: 'eur',
    units: [
      { key: 'usd', label: 'US Dollar',    symbol: '$',   factor: 1 },
      { key: 'eur', label: 'Euro',         symbol: '€',   factor: 0.92 },
      { key: 'gbp', label: 'British Pound', symbol: '£',   factor: 0.79 },
      { key: 'jpy', label: 'Japanese Yen',  symbol: '¥',   factor: 151.42 },
      { key: 'inr', label: 'Indian Rupee',  symbol: '₹',   factor: 83.33 },
      { key: 'cad', label: 'Canadian Dollar', symbol: 'C$', factor: 1.35 },
      { key: 'aud', label: 'Australian Dollar', symbol: 'A$', factor: 1.52 },
      { key: 'chf', label: 'Swiss Franc',   symbol: 'Fr',  factor: 0.90 },
      { key: 'cny', label: 'Chinese Yuan',  symbol: '¥',   factor: 7.23 },
    ]
  }
];

/** 
 * Map specialized or popular slugs to their base category slug.
 * This ensures "inches-to-cm" correctly shows the "length" converter.
 */
const slugMapping: Record<string, string> = {
  // Popular length
  'inches-to-cm': 'length',
  'cm-to-inches': 'length',
  'feet-to-cm': 'length',
  'cm-to-feet': 'length',
  'km-to-miles': 'length',
  'miles-to-km': 'length',
  
  // Popular weight
  'kg-to-pounds': 'weight-mass',
  'pounds-to-kg': 'weight-mass',
  
  // Popular temp
  'celsius-to-fahrenheit': 'temperature',
  'fahrenheit-to-celsius': 'temperature',
  
  // Popular volume
  'liters-to-gallons': 'volume',
  'gallons-to-liters': 'volume',
  
  // Popular data
  'mb-to-gb': 'data-storage',
  'gb-to-tb': 'data-storage',
  
  // Popular binary
  'binary-to-decimal': 'binary',
  'decimal-to-binary': 'binary',

  // Calculators (All have dedicated pages now)
};

/** Look up a category by slug, with mapping for specialized routes */
export function getCategoryBySlug(slug: string): ConverterCategory | undefined {
  const targetSlug = slugMapping[slug] || slug;
  return converterCategories.find(c => c.slug === targetSlug);
}

/** Format a number nicely — avoid scientific notation for typical values */
export function formatResult(value: number, decimals = 10): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '—';
  if (value === 0) return '0';

  const abs = Math.abs(value);

  // For very small or very large values, use scientific notation
  if (abs < 1e-6 || abs >= 1e15) {
    return value.toExponential(6).replace(/\.?0+e/, 'e');
  }

  // Round to high precision internally to prevent JS floating point artifacts
  // 10 decimal precision as requested
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(value * factor) / factor;

  // Use Intl.NumberFormat to avoid scientific notation up to 15 digits
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    useGrouping: false // Set to true if you want commas (1,000)
  }).format(rounded);
}

/** Build a reference conversion table (common input values) */
export function buildReferenceTable(
  fromKey: string,
  toKey: string,
  category: ConverterCategory,
  sampleValues = [0.01, 0.1, 1, 5, 10, 25, 50, 100, 500, 1000]
): Array<{ from: string; to: string; result: string }> {
  return sampleValues.map(v => ({
    from: `${formatResult(v)} ${category.units.find(u => u.key === fromKey)?.symbol ?? fromKey}`,
    to:   category.units.find(u => u.key === toKey)?.symbol ?? toKey,
    result: formatResult(convert(v, fromKey, toKey, category)),
  }));
}
