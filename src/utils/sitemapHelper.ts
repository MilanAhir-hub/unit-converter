import { getCollection } from 'astro:content';
import { navigationData, isCategory } from '../data/navigation';

export async function getSitemapPaths() {
  const paths: string[] = [];

  // 1. Home
  paths.push('/');

  // 2. Static pages
  const staticPages = [
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/favorites',
    '/history',
    '/disclaimer',
    '/cookies'
  ];
  paths.push(...staticPages);

  // 3. Navigation categories & sub-items
  navigationData.forEach((item) => {
    if (isCategory(item)) {
      item.items.forEach((subItem) => {
        paths.push(subItem.href);
      });
    }
  });

  // 4. Convert pages
  const commonValues = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  const commonPairs = [
    { fromUrl: 'inch', toUrl: 'cm' },
    { fromUrl: 'cm', toUrl: 'inch' },
    { fromUrl: 'mile', toUrl: 'km' },
    { fromUrl: 'km', toUrl: 'mile' },
    { fromUrl: 'feet', toUrl: 'meters' },
    { fromUrl: 'meters', toUrl: 'feet' },
    { fromUrl: 'yards', toUrl: 'meters' },
    { fromUrl: 'feet', toUrl: 'inches' },
    { fromUrl: 'kg', toUrl: 'lbs' },
    { fromUrl: 'lbs', toUrl: 'kg' },
    { fromUrl: 'grams', toUrl: 'oz' },
    { fromUrl: 'oz', toUrl: 'grams' },
    { fromUrl: 'celsius', toUrl: 'fahrenheit' },
    { fromUrl: 'fahrenheit', toUrl: 'celsius' },
    { fromUrl: 'liters', toUrl: 'gallons' },
    { fromUrl: 'gallons', toUrl: 'liters' },
    { fromUrl: 'ml', toUrl: 'fluid-ounces' },
    { fromUrl: 'square-feet', toUrl: 'square-meters' },
    { fromUrl: 'square-meters', toUrl: 'square-feet' },
    { fromUrl: 'acres', toUrl: 'square-meters' },
    { fromUrl: 'kmh', toUrl: 'mph' },
    { fromUrl: 'mph', toUrl: 'kmh' },
    { fromUrl: 'hours', toUrl: 'minutes' },
    { fromUrl: 'minutes', toUrl: 'seconds' },
    { fromUrl: 'gb', toUrl: 'mb' },
    { fromUrl: 'tb', toUrl: 'gb' },
    { fromUrl: 'kw', toUrl: 'hp' },
    { fromUrl: 'hp', toUrl: 'kw' }
  ];
  for (const val of commonValues) {
    for (const pair of commonPairs) {
      paths.push(`/convert/${val}-${pair.fromUrl}-to-${pair.toUrl}`);
    }
  }

  // 5. Currency pages
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'CAD', 'AUD', 'CHF', 'CNY'];
  for (const from of currencies) {
    for (const to of currencies) {
      if (from === to) continue;
      paths.push(`/currency/${from.toLowerCase()}-to-${to.toLowerCase()}`);
    }
  }

  // 6. Calculators
  const calculators = [
    'percentage', 'bmi', 'bmr', 'calorie', 'age', 'gpa', 'discount', 'loan', 'emi',
    'scientific', 'interest', 'simple-interest', 'compound-interest', 'gst',
    'marks-percentage', 'date-difference', 'time-duration', 'average'
  ];
  calculators.forEach(calc => {
    paths.push(`/calculators/${calc}`);
  });

  // 7. Tools
  const tools = [
    'scientific-notation', 'number-base', 'fraction', 'ratio', 'unit-prefix', 'number-system'
  ];
  tools.forEach(tool => {
    paths.push(`/tools/${tool}`);
  });

  // 8. Blog Index
  paths.push('/blog');

  // 9. Blog Categories & Entries
  try {
    const blogEntries = await getCollection('blog');
    
    // Blog Categories
    const categories = [...new Set(blogEntries.map(entry => entry.data.category))];
    categories.forEach(category => {
      paths.push(`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
    });

    // Blog Entries
    blogEntries.forEach(entry => {
      paths.push(`/blog/${entry.id}`);
    });
  } catch (e) {
    console.error('Error fetching blog collection for sitemap:', e);
  }

  return paths;
}
