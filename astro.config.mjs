// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://realunitconverter.com',

  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'hi', 'fr', 'pt', 'de', 'ar', 'ja',
      'zh-cn', 'zh-tw', 'ru', 'it', 'nl', 'tr', 'ko', 'id',
      'vi', 'th', 'pl', 'uk', 'ro', 'el', 'sv', 'no',
      'da', 'fi', 'cs', 'hu', 'he', 'ms', 'bn', 'ta',
      'te', 'mr', 'gu', 'pa', 'ur', 'fa', 'tl'
    ],
    routing: {
      prefixDefaultLocale: false
    }
  },

  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: process.argv.includes('build') || process.env.NODE_ENV === 'production' ? cloudflare() : undefined,
});