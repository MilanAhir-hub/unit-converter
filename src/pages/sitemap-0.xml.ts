import { getSitemapPaths } from '../utils/sitemapHelper';
import { locales } from '../utils/i18n';

export const prerender = true;

export async function GET() {
  const basePaths = await getSitemapPaths();
  const siteUrl = 'https://realunitconverter.com';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const path of basePaths) {
    const canonical = `${siteUrl}${path}`;
    
    xml += '  <url>\n';
    xml += `    <loc>${canonical}</loc>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical}" />\n`;
    
    for (const loc of locales) {
      const prefix = loc === 'en' ? '' : `/${loc}`;
      let href = prefix + path;
      if (href.endsWith('/') && href.length > 1) {
        href = href.slice(0, -1);
      }
      const alternateUrl = `${siteUrl}${href}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${loc}" href="${alternateUrl}" />\n`;
    }
    
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
