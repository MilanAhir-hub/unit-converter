import { convert, getCategoryBySlug } from '../../src/utils/converter';

const cat = getCategoryBySlug('temperature')!;

console.log(convert(108667766, 'kelvin', 'rankine', cat));
