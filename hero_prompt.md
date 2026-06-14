# HERO SECTION COMPLETE REVAMP — Prompt for AI Code Assistant

> **Project**: Unit Converter (Astro + Tailwind CSS v4 + TypeScript)
> **Goal**: Completely revamp the Hero section of the homepage to maximize user engagement, reduce bounce rate, and create a "wow" moment on first load — while keeping the existing codebase architecture, design system, and i18n support fully intact.
> **File to modify**: `src/components/Hero.astro` (this is the ONLY file you should rewrite)
> **Do NOT touch**: `Dropdown.astro`, `global.css`, `Layout.astro`, `Navbar.astro`, `i18n.ts`, `converter.ts`, or any other file.

---

## 🏗️ ARCHITECTURE CONTEXT

### Tech Stack
- **Framework**: Astro 6 (`.astro` components)
- **Styling**: Tailwind CSS v4 (utility classes, `@theme` tokens in `global.css`)
- **Icons**: `astro-icon` with `hugeicons` icon set — usage: `<Icon name="hugeicons:icon-name" class="..." />`
- **i18n**: Custom `t()` function + `translateCategory()` + `translatePopularRoute()` from `src/utils/i18n.ts`
- **Converter Engine**: `converterCategories` from `src/utils/converter.ts`
- **Locale detection**: `Astro.currentLocale || 'en'`
- **Custom Dropdown**: `<Dropdown id="..." options={[]} />` component with `.updateOptions()`, `.value` getter/setter, dispatches `change` event

### Design Token System (from `global.css`)
These are the CSS custom properties. Use them via Tailwind classes like `text-ink`, `bg-canvas`, `border-hairline`, etc.:

```css
/* Light mode */
--primary: #171717;        /* bg-primary, text-primary */
--on-primary: #ffffff;     /* text-on-primary */
--ink: #171717;            /* text-ink — main text */
--body: #4d4d4d;           /* text-body — secondary text */
--mute: #68686e;           /* text-mute — tertiary/caption */
--hairline: #ebebeb;       /* border-hairline — subtle borders */
--hairline-strong: #a1a1a1;/* border-hairline-strong — hover borders */
--canvas: #ffffff;         /* bg-canvas — card/surface bg */
--canvas-soft: #fafafa;    /* bg-canvas-soft — page bg */
--canvas-soft-2: #f5f5f5;  /* bg-canvas-soft-2 — nested bg */
--link: #0070f3;           /* text-link */

/* Dark mode (.dark class on <html>) */
--primary: #ffffff;
--on-primary: #000000;
--ink: #f5f5f7;
--body: #a1a1a6;
--mute: #68686e;
--hairline: #1f1f23;
--hairline-strong: #333338;
--canvas: #0a0a0a;
--canvas-soft: #050505;
--canvas-soft-2: #161618;
--link: #0070f3;
```

**Font tokens**: `font-sans` = Inter Variable, `font-mono` = Geist Mono

### Design Aesthetic Rules
- **Minimalist, editorial, premium** — like Linear.app, Vercel, or Raycast
- Rounded corners: `rounded-md` (6px) or `rounded-sm` (4px) — NEVER `rounded-lg` or `rounded-xl` or `rounded-full` (except small badges/pills)
- Shadows: subtle only — `shadow-sm` or `shadow-[0_1px_1px_rgba(0,0,0,0.02),0_4px_20px_rgba(0,0,0,0.05)]`
- Borders: always `border border-hairline`
- Text: `tracking-[-0.04em]` on headings, `tracking-wider` on mono labels
- Buttons: `bg-primary text-on-primary` for primary, `bg-canvas border border-hairline` for secondary
- Labels: `text-[10px] font-semibold font-mono text-mute uppercase tracking-wider`
- Animations: subtle, `transition-all duration-200`, `cubic-bezier(0.16, 1, 0.3, 1)` for spring-like easing
- NO gradients, NO neon, NO glassmorphism, NO heavy animations — keep it CLEAN and EDITORIAL

---

## 📁 CURRENT Hero.astro (FULL FILE — 577 lines)

Below is the COMPLETE current file. You must rewrite this file incorporating ALL 12 improvements listed in the next section. Keep all working functionality but enhance the engagement dramatically.

```astro
---
import { Icon } from 'astro-icon/components';
import { navigationData, isCategory } from '../data/navigation';
import { converterCategories } from '../utils/converter';
import { t, translateCategory, translatePopularRoute } from '../utils/i18n';

import Dropdown from './Dropdown.astro';

const locale = Astro.currentLocale || 'en';

const getLocalizedHref = (url: string) => {
  if (locale === 'en') return url;
  if (url.startsWith(`/${locale}`)) return url;
  return `/${locale}${url}`;
};

// Stats data
const stats = [
  { label: t('stat_categories_label', locale), value: "200+" },
  { label: t('stat_combinations_label', locale), value: "10,000+" },
  { label: t('stat_calculations_label', locale), value: t('stat_calculations_value', locale) },
  { label: t('stat_free_label', locale), value: t('stat_free_value', locale) }
];

// Quick Converter categories
const quickCategories = ['length', 'weight-mass', 'temperature', 'area', 'volume', 'time']
  .map(slug => converterCategories.find(c => c.slug === slug))
  .filter(Boolean);

// Compile a flat searchable list for client-side vanilla JS
const searchableItems: any[] = [];

navigationData.forEach((item) => {
  if (isCategory(item)) {
    item.items.forEach((subItem) => {
      searchableItems.push({
        title: subItem.title,
        href: subItem.href,
        category: item.title,
      });
    });
  } else {
    if (item.href !== '/') {
      searchableItems.push({
        title: item.title,
        href: item.href,
        category: 'Pages',
      });
    }
  }
});

const popularConverters = [
  { title: translateCategory('length', locale), href: getLocalizedHref('/unit-converters/length'), icon: "hugeicons:ruler" },
  { title: translateCategory('weight-mass', locale), href: getLocalizedHref('/unit-converters/weight-mass'), icon: "hugeicons:weight-scale" },
  { title: translateCategory('temperature', locale), href: getLocalizedHref('/unit-converters/temperature'), icon: "hugeicons:thermometer" },
  { title: translateCategory('area', locale), href: getLocalizedHref('/unit-converters/area'), icon: "hugeicons:grid" },
  { title: translateCategory('volume', locale), href: getLocalizedHref('/unit-converters/volume'), icon: "hugeicons:cube" },
  { title: translateCategory('time', locale), href: getLocalizedHref('/unit-converters/time'), icon: "hugeicons:clock-01" },
  { title: translateCategory('speed', locale), href: getLocalizedHref('/unit-converters/speed'), icon: "hugeicons:dashboard-speed-01" },
  { title: translateCategory('data-storage', locale), href: getLocalizedHref('/unit-converters/data-storage'), icon: "hugeicons:hard-drive" },
];

const popularConversions = [
  { title: translatePopularRoute('cm-to-inches', locale, 'CM to Inches'), href: getLocalizedHref('/popular/cm-to-inches') },
  { title: translatePopularRoute('inches-to-cm', locale, 'Inches to CM'), href: getLocalizedHref('/popular/inches-to-cm') },
  { title: translatePopularRoute('kg-to-pounds', locale, 'KG to Pounds'), href: getLocalizedHref('/popular/kg-to-pounds') },
  { title: translatePopularRoute('pounds-to-kg', locale, 'Pounds to KG'), href: getLocalizedHref('/popular/pounds-to-kg') },
  { title: translatePopularRoute('km-to-miles', locale, 'KM to Miles'), href: getLocalizedHref('/popular/km-to-miles') },
  { title: translatePopularRoute('miles-to-km', locale, 'Miles to KM'), href: getLocalizedHref('/popular/miles-to-km') },
  { title: translatePopularRoute('feet-to-meters', locale, 'Feet to Meters'), href: getLocalizedHref('/popular/feet-to-meters') },
  { title: translatePopularRoute('meters-to-feet', locale, 'Meters to Feet'), href: getLocalizedHref('/popular/meters-to-feet') },
];

// Add popular conversions to searchable items
popularConversions.forEach(item => {
    searchableItems.push({
        title: item.title,
        href: item.href,
        category: t('hero_section_popular_conversions', locale)
    });
});

// Serialize for JS
const quickCategoriesJson = JSON.stringify(quickCategories);
const typingPhrases = [
  t('hero_title_free_converter', locale),
  translateCategory('bmi', locale),
  translateCategory('scientific', locale),
  t('hero_title_gst_loan', locale),
  translateCategory('percentage', locale),
  translateCategory('temperature', locale),
  translateCategory('number-base', locale),
];
---

<section class="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 flex flex-col items-center text-center max-w-6xl mx-auto w-full px-4">
  
  <!-- Hero Content -->
  <div class="max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-16 w-full">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[11px] font-mono text-primary uppercase tracking-widest mb-5 sm:mb-6 select-none">
      <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      {t('hero_badge', locale)}
    </div>
    
    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-[-0.04em] text-ink mb-5 sm:mb-6 md:mb-8 leading-tight min-h-[1.2em]">
      <span id="hero-typing-title">{typingPhrases[0]}</span><span class="inline-block w-[3px] h-[0.8em] ml-1 bg-ink align-middle" id="hero-typing-cursor"></span>
    </h1>

    <p class="text-base sm:text-lg md:text-xl text-body max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
        {t('hero_subtitle', locale)}
    </p>

    <!-- Spotlight Search Bar -->
    <div class="relative w-full max-w-xl mx-auto mb-10 sm:mb-12">
        <div class="relative flex items-center group">
        <Icon name="hugeicons:search-02" class="absolute left-4 w-5 h-5 text-mute group-focus-within:text-primary transition-colors flex-shrink-0" />
        <input 
            id="hero-search-input"
            type="text" 
            placeholder={t('hero_search_placeholder', locale)}
            class="w-full h-12 sm:h-14 pl-12 pr-4 sm:pr-12 bg-canvas border border-hairline rounded-md text-ink placeholder:text-mute focus:outline-none focus:border-primary/50 focus:bg-canvas transition-all text-sm shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
            autocomplete="off"
        />
        <div class="absolute right-4 px-1.5 py-0.5 border border-hairline rounded-sm bg-canvas-soft-2 text-[10px] font-mono text-mute select-none hidden sm:block">
            /
        </div>
        </div>

        <!-- Spotlight Dropdown results panel -->
        <div 
        id="search-results-panel"
        class="absolute left-0 right-0 top-full mt-2 bg-canvas border border-hairline rounded-md shadow-2xl z-50 hidden max-h-72 sm:max-h-80 overflow-y-auto no-scrollbar text-left"
        >
        <div id="search-results-content" class="p-2 flex flex-col gap-0.5">
            <!-- Generated dynamically by search script -->
        </div>
        </div>
    </div>
  </div>

  <!-- Quick Converter Widget -->
  <div class="w-full max-w-3xl bg-canvas border border-hairline rounded-md shadow-[0_1px_1px_rgba(0,0,0,0.02),0_4px_20px_rgba(0,0,0,0.05)] relative mb-12 sm:mb-16 md:mb-20 text-left">
    <!-- Category Tabs -->
    <div class="flex items-center gap-1 p-1 bg-canvas-soft-2 border-b border-hairline overflow-x-auto no-scrollbar rounded-t-md">
        {quickCategories.map((cat, i) => {
            const fullName = translateCategory(cat.slug, locale);
            const shortName = fullName.replace(/ (Converter|Convertidor|Convertisseur|Conversor|Umrechner|محول|変換器|转换器|轉換器).*$/, '');
            return (
            <button 
                class:list={[
                    "quick-cat-tab px-3 sm:px-4 py-2 rounded-sm text-xs font-medium transition-all whitespace-nowrap flex-shrink-0",
                    i === 0 ? "bg-canvas text-ink shadow-sm" : "text-body hover:text-ink"
                ]}
                data-slug={cat.slug}
            >
                {shortName}
            </button>
            );
        })}
    </div>

    <div class="p-4 sm:p-6 md:p-8">
        <!-- Mobile: stacked layout; MD+: 3-column grid -->
        <div class="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] md:items-center gap-4 sm:gap-5 md:gap-6">
            <!-- From Section -->
            <div class="space-y-2 sm:space-y-3">
                <label class="text-[10px] font-semibold font-mono text-mute uppercase tracking-wider">{t('hero_quick_amount', locale)}</label>
                <div class="flex flex-col gap-2">
                    <input 
                        id="quick-from-input"
                        type="number" 
                        value="1"
                        class="w-full h-11 sm:h-12 px-4 bg-canvas-soft border border-hairline rounded-sm text-xl font-semibold text-ink focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <Dropdown id="quick-from-select" options={[]} class="w-full" />
                </div>
            </div>

            <!-- Swap Button -->
            <div class="flex justify-center md:pt-6">
                <button id="quick-swap-btn" class="w-10 h-10 rounded-full bg-canvas-soft-2 border border-hairline flex items-center justify-center text-ink hover:bg-primary hover:text-on-primary transition-all rotate-90 md:rotate-0 active:scale-95 touch-manipulation">
                    <Icon name="hugeicons:exchange-01" class="w-4 h-4" />
                </button>
            </div>

            <!-- To Section -->
            <div class="space-y-2 sm:space-y-3">
                <label class="text-[10px] font-semibold font-mono text-mute uppercase tracking-wider">{t('hero_quick_result', locale)}</label>
                <div class="flex flex-col gap-2">
                    <div id="quick-to-display" class="w-full h-11 sm:h-12 px-4 bg-canvas-soft-2 border border-hairline rounded-sm flex items-center text-xl font-semibold text-primary truncate">
                        <!-- Result -->
                    </div>
                    <Dropdown id="quick-to-select" options={[]} class="w-full" />
                </div>
            </div>
        </div>
        <div class="mt-5 sm:mt-6 text-center">
            <a id="quick-go-to-page" href="#" class="text-xs font-medium text-mute hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                {t('hero_open_full', locale)} {translateCategory(quickCategories[0].slug, locale)}
                <Icon name="hugeicons:arrow-right-01" class="w-3.5 h-3.5" />
            </a>
        </div>
    </div>
  </div>

  <!-- Trust Statistics -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mb-12 sm:mb-16 md:mb-20">
    {stats.map(stat => (
        <div class="p-4 sm:p-5 md:p-6 bg-canvas border border-hairline rounded-md text-center">
            <div class="text-xl sm:text-2xl md:text-3xl font-bold text-ink mb-1">{stat.value}</div>
            <div class="text-[9px] sm:text-[10px] font-mono text-mute uppercase tracking-wider leading-tight">{stat.label}</div>
        </div>
    ))}
  </div>

  <!-- Popular Converters Section -->
  <div class="w-full mb-12 sm:mb-14 md:mb-16">
    <div class="flex items-center justify-between mb-5 sm:mb-6 border-b border-hairline pb-2">
      <h2 class="text-xs font-semibold tracking-wider font-mono text-mute uppercase">
        {t('hero_section_popular_converters', locale)}
      </h2>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left">
      {popularConverters.map((item) => (
        <a 
          href={item.href} 
          class="group flex flex-col p-3 sm:p-4 bg-canvas border border-hairline rounded-md hover:border-hairline-strong hover:bg-canvas-soft-2 transition-all duration-200"
        >
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-canvas-soft-2 flex items-center justify-center text-ink opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Icon name={item.icon} class="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <span class="text-xs sm:text-sm font-medium text-ink mt-2 sm:mt-3 leading-snug">{item.title}</span>
          <span class="text-[11px] text-body mt-1 group-hover:text-ink transition-colors flex items-center gap-1 font-sans">
            {t('hero_convert_now', locale)} 
            <Icon 
              name="hugeicons:arrow-right-01" 
              class="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform flex-shrink-0" 
            />
          </span>
        </a>
      ))}
    </div>
  </div>

  <!-- Popular Conversions Section -->
  <div class="w-full mb-12 sm:mb-14 md:mb-16">
    <div class="flex items-center justify-between mb-5 sm:mb-6 border-b border-hairline pb-2">
      <h2 class="text-xs font-semibold tracking-wider font-mono text-mute uppercase">
        {t('hero_section_popular_conversions', locale)}
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 w-full text-left">
      {popularConversions.map((item) => (
        <a 
          href={item.href} 
          class="group flex items-center justify-between px-3 py-3 bg-canvas border border-hairline rounded-md hover:border-hairline-strong hover:bg-canvas-soft-2 transition-all duration-200 text-[13px] font-medium text-ink cursor-pointer touch-manipulation"
        >
          <span class="truncate pr-2">{item.title}</span>
          <Icon 
            name="hugeicons:arrow-right-01" 
            class="w-4 h-4 text-mute group-hover:text-ink group-hover:translate-x-0.5 transition-all flex-shrink-0" 
          />
        </a>
      ))}
    </div>
  </div>

  <!-- SEO Content Block -->
  <div class="w-full max-w-4xl text-left pt-10 sm:pt-12 border-t border-hairline">
    <p class="text-xs sm:text-sm text-mute leading-relaxed">
        {t('hero_seo_text', locale)}
    </p>
  </div>
</section>

<style>
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Ensure number inputs don't overflow on mobile */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] { -moz-appearance: textfield; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  #hero-typing-cursor {
    animation: blink 0.8s infinite;
  }
</style>

<script define:vars={{ searchableItems, quickCategoriesJson, typingPhrases, searchNoResults: t('search_no_results', locale), heroOpenFull: t('hero_open_full', locale) }}>
  function setupHero() {
    const searchInput = document.getElementById('hero-search-input');
    const resultsPanel = document.getElementById('search-results-panel');
    const resultsContent = document.getElementById('search-results-content');
    
    if (!searchInput || !resultsPanel || !resultsContent) return;

    let selectedIndex = -1;
    let currentResults = [];

    const updateSearch = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        resultsPanel.classList.add('hidden');
        selectedIndex = -1;
        return;
      }

      currentResults = searchableItems.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );

      if (currentResults.length === 0) {
        resultsContent.innerHTML = `
          <div class="px-4 py-6 text-center text-sm text-body select-none">
            ${searchNoResults} <span class="font-medium text-ink">"${searchInput.value}"</span>
          </div>
        `;
        resultsPanel.classList.remove('hidden');
        selectedIndex = -1;
        return;
      }

      const displayedResults = currentResults.slice(0, 15);
      const grouped = {};
      displayedResults.forEach((item, index) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(Object.assign({}, item, { globalIndex: index }));
      });

      let html = '';
      for (const [category, items] of Object.entries(grouped)) {
        html += `<div class="px-3 pt-3 pb-1 text-[10px] font-semibold font-mono tracking-wider text-mute uppercase select-none border-t border-hairline first:border-0 first:pt-1">${category}</div>`;
        items.forEach(item => {
          html += `
            <a href="${item.href}" data-search-index="${item.globalIndex}" class="flex items-center justify-between px-3 py-2 rounded-sm text-sm text-body hover:bg-canvas-soft-2 hover:text-ink transition-colors cursor-pointer">
              <span class="font-medium truncate pr-4">${item.title}</span>
              <span class="text-[10px] text-mute font-mono flex-shrink-0 hidden sm:block">/ ${item.category}</span>
            </a>`;
        });
      }

      resultsContent.innerHTML = html;
      resultsPanel.classList.remove('hidden');
      selectedIndex = -1;
      highlightItem();
    };

    const highlightItem = () => {
      const links = resultsContent.querySelectorAll('a[data-search-index]');
      links.forEach(link => {
        const idx = parseInt(link.getAttribute('data-search-index'), 10);
        if (idx === selectedIndex) {
          link.classList.add('bg-canvas-soft-2', 'text-ink');
          link.classList.remove('text-body');
          link.scrollIntoView({ block: 'nearest' });
        } else {
          link.classList.remove('bg-canvas-soft-2', 'text-ink');
          link.classList.add('text-body');
        }
      });
    };

    const onGlobalKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    };

    const onInput = updateSearch;
    const onFocus = () => {
      if (searchInput.value.trim()) resultsPanel.classList.remove('hidden');
    };

    const onGlobalClick = (e) => {
      if (!searchInput.contains(e.target) && !resultsPanel.contains(e.target)) {
        resultsPanel.classList.add('hidden');
      }
    };

    const onInputKeyDown = (e) => {
      const limit = Math.min(currentResults.length, 15);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % limit;
        highlightItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + limit) % limit;
        highlightItem();
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < limit) {
          window.location.href = currentResults[selectedIndex].href;
        }
      } else if (e.key === 'Escape') {
        resultsPanel.classList.add('hidden');
        searchInput.blur();
      }
    };

    document.addEventListener('keydown', onGlobalKeyDown);
    searchInput.addEventListener('input', onInput);
    searchInput.addEventListener('focus', onFocus);
    document.addEventListener('click', onGlobalClick);
    searchInput.addEventListener('keydown', onInputKeyDown);

    // ── Quick Converter Logic ──────────────────────────────────────────────────
    const categories = JSON.parse(quickCategoriesJson);
    let currentCat = categories[0];

    const fromInput = document.getElementById('quick-from-input');
    const fromSelect = document.getElementById('quick-from-select');
    const toSelect = document.getElementById('quick-to-select');
    const toDisplay = document.getElementById('quick-to-display');
    const swapBtn = document.getElementById('quick-swap-btn');
    const catTabs = document.querySelectorAll('.quick-cat-tab');
    const goBtn = document.getElementById('quick-go-to-page');

    if (!fromInput || !fromSelect || !toSelect || !toDisplay || !swapBtn) return;

    const populateUnits = () => {
      const units = currentCat.units.map(u => ({
        key: u.key,
        label: u.label,
        symbol: u.symbol
      }));

      if (fromSelect.updateOptions) {
        fromSelect.updateOptions(units, currentCat.defaultFrom);
      }
      if (toSelect.updateOptions) {
        toSelect.updateOptions(units, currentCat.defaultTo);
      }

      if (goBtn) {
        goBtn.href = `/unit-converters/${currentCat.slug}`;
        const catName = currentCat.label;
        goBtn.innerHTML = `${heroOpenFull} ${catName} <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
      }
      updateConversion();
    };

    const updateConversion = () => {
      const val = parseFloat(fromInput.value);
      if (isNaN(val)) {
        toDisplay.innerText = '—';
        return;
      }

      const fromUnit = currentCat.units.find(u => u.key === fromSelect.value);
      const toUnit = currentCat.units.find(u => u.key === toSelect.value);

      if (!fromUnit || !toUnit) return;

      let result;
      // Temp special case
      if (currentCat.slug === 'temperature') {
        let k;
        if (fromUnit.key === 'celsius') k = val + 273.15;
        else if (fromUnit.key === 'fahrenheit') k = (val - 32) * 5 / 9 + 273.15;
        else k = val;

        if (toUnit.key === 'celsius') result = k - 273.15;
        else if (toUnit.key === 'fahrenheit') result = (k - 273.15) * 9 / 5 + 32;
        else result = k;
      } else {
        const base = val * (fromUnit.factor || 1);
        result = base / (toUnit.factor || 1);
      }

      toDisplay.innerText = parseFloat(result.toFixed(6)).toString();
    };

    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('bg-canvas', 'text-ink', 'shadow-sm'));
        catTabs.forEach(t => t.classList.add('text-body'));
        tab.classList.add('bg-canvas', 'text-ink', 'shadow-sm');
        tab.classList.remove('text-body');

        currentCat = categories.find(c => c.slug === tab.dataset.slug);
        populateUnits();
      });
    });

    fromInput.addEventListener('input', updateConversion);
    fromSelect.addEventListener('change', updateConversion);
    toSelect.addEventListener('change', updateConversion);

    const onSwapClick = () => {
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;

      updateConversion();
    };
    swapBtn.addEventListener('click', onSwapClick);

    const tryPopulate = () => {
      if (typeof window.initDropdowns === 'function') {
        window.initDropdowns();
      }
      if (fromSelect.updateOptions && toSelect.updateOptions) {
        populateUnits();
      } else {
        setTimeout(tryPopulate, 30);
      }
    };
    tryPopulate();

    // ── Typing Effect Logic ──────────────────────────────────────────────────
    const typingTitle = document.getElementById('hero-typing-title');
    if (typingTitle) {
      if (window.heroTypingTimeout) {
        clearTimeout(window.heroTypingTimeout);
      }

      const phrases = typingPhrases;
      
      let phraseIndex = 0;
      let isDeleting = false;
      let text = phrases[0];
      let charIndex = text.length;

      const type = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
          text = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
        } else {
          text = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
        }

        typingTitle.textContent = text;

        let typingSpeed = isDeleting ? 35 : 65;

        if (!isDeleting && charIndex === currentPhrase.length) {
          typingSpeed = 2500; // Pause at end of phrase
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 400; // Pause before typing next phrase
        }

        if (document.getElementById('hero-typing-title')) {
          window.heroTypingTimeout = setTimeout(type, typingSpeed);
        }
      };

      // Start the typing loop after an initial pause
      window.heroTypingTimeout = setTimeout(type, 2500);
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHero);
  } else {
    setupHero();
  }

  document.addEventListener('astro:page-load', setupHero);
</script>
```

---

## 📁 DEPENDENT COMPONENT: Dropdown.astro

This component is imported and used via `<Dropdown id="quick-from-select" options={[]} />`. **Do NOT modify this file.** Key API:

- Props: `{ options: {key, label, symbol?}[], selected?: string, id?: string, class?: string }`
- At runtime, the element exposes:
  - `.updateOptions(newOptions, defaultValue)` — replaces all options
  - `.value` — get/set selected key
  - `.selectedLabel` — get selected label text
  - Dispatches `'change'` event when user selects an option

---

## 🎯 THE 12 IMPROVEMENTS TO IMPLEMENT

You must implement ALL of these in a single rewrite of `Hero.astro`. Output the complete, production-ready file.

### IMPROVEMENT 1: Fix Typing Animation Timing
**Problem**: Title starts fully typed and sits static for 2.5 seconds. Users see no motion.
**Fix**:
- Start with an EMPTY title (text = '', charIndex = 0, isDeleting = false)
- Begin typing within 500ms of page load (not 2500ms)
- Keep all other typing logic the same (delete speed 35ms, type speed 65ms, pause at end 2500ms, pause between phrases 400ms)

### IMPROVEMENT 2: Live Conversion Ticker Above Search Bar
**Add**: A horizontally auto-scrolling ticker/marquee strip between the subtitle and the search bar showing real conversion examples cycling through continuously:
- Examples: "100°F = 37.78°C", "5 mi = 8.05 km", "1 kg = 2.205 lbs", "1 ft = 30.48 cm", "100 km/h = 62.14 mph", "1 gal = 3.785 L"
- Style: small pill-like items with `bg-canvas-soft-2 border border-hairline rounded-sm px-3 py-1 text-xs font-mono text-body` flowing right-to-left
- Use CSS `@keyframes` animation, not JS intervals — performant and smooth
- Duplicate the items to create seamless infinite scroll
- Pause animation on hover
- Add a subtle fade mask on left/right edges using a gradient overlay

### IMPROVEMENT 3: Trending Searches on Focus
**Add**: When the search bar receives focus AND the input is empty, show a panel with trending/popular searches:
- Show the panel in the same `#search-results-panel` container
- Section header: "🔥 Trending" (use the mono label style)
- Show 6 popular conversions as clickable links (reuse `popularConversions` data)
- If user starts typing, switch to the existing search results immediately
- If user clears input while focused, show trending again

### IMPROVEMENT 4: Popular Conversion Pills Below Search Bar
**Add**: Directly below the search bar, add a row of clickable pill/tag links for the top 6 popular conversions:
- Style: `inline-flex items-center gap-1 px-3 py-1.5 bg-canvas border border-hairline rounded-sm text-xs font-medium text-body hover:text-ink hover:border-hairline-strong transition-all`
- Use `flex-wrap gap-2 justify-center` container
- Each pill shows the conversion shorthand (e.g., "CM → Inches", "KG → Pounds")
- Links go to the same hrefs as `popularConversions`

### IMPROVEMENT 5: CTA Buttons Below Pills
**Add**: Two action buttons below the popular pills:
- Primary button: "Browse All Converters" → links to `/unit-converters/length` (most popular)
  - Style: `px-5 py-2.5 bg-primary text-on-primary rounded-md text-sm font-medium hover:opacity-90 transition-opacity`
- Secondary button: "All Calculators" → links to `/calculators`
  - Style: `px-5 py-2.5 bg-canvas border border-hairline rounded-md text-sm font-medium text-body hover:text-ink hover:border-hairline-strong transition-all`
- Container: `flex items-center gap-3 justify-center`
- Use localized text via `t()` function. For the English strings, hardcode is acceptable since i18n keys may not exist — use fallback pattern: use a descriptive label

### IMPROVEMENT 6: Animated Count-Up Stats with Icons
**Replace** the static stat numbers with scroll-triggered count-up animations:
- Use `IntersectionObserver` to detect when stats section enters viewport
- Animate numbers from 0 to target value over 1.5 seconds using `requestAnimationFrame` with easing
- For numbers like "200+", animate 0 → 200, then append the "+" suffix
- For "10,000+", animate 0 → 10000, format with comma, then append "+"
- For text values (like "Instant" or "Free"), don't animate — show immediately
- Add relevant icons above each number using hugeicons:
  - Categories → `hugeicons:grid` 
  - Combinations → `hugeicons:shuffle`
  - Calculations → `hugeicons:lightning-02`
  - Free → `hugeicons:unlock`
- Icon container: `w-8 h-8 rounded-sm bg-canvas-soft-2 flex items-center justify-center text-ink mb-2 mx-auto`

### IMPROVEMENT 7: Copy Button on Conversion Result
**Add**: A copy-to-clipboard button next to the conversion result display:
- Place inside or right after `#quick-to-display`
- Icon: `hugeicons:copy-01` (default state) → change to `hugeicons:tick-01` for 2 seconds after copy
- Style: `w-8 h-8 rounded-sm flex items-center justify-center text-mute hover:text-ink hover:bg-canvas-soft-2 transition-all`
- On click: copy the result text to clipboard using `navigator.clipboard.writeText()`
- Show a brief "Copied!" tooltip or change the icon to a checkmark for 2s

### IMPROVEMENT 8: Conversion Formula Display
**Add**: Below the converter result row (but inside the converter widget), show the formula used:
- Example: "1 meter × 3.281 = 3.281 feet"
- Style: `text-xs text-mute font-mono text-center mt-3`
- Update dynamically whenever the conversion changes
- For temperature, show the actual formula like "°C × 9/5 + 32 = °F"
- Add a separator line above: `border-t border-hairline pt-3 mt-3`
- Element ID: `#quick-formula-display`

### IMPROVEMENT 9: Enhanced Swap Button
**Upgrade** the swap button with better visual feedback:
- On click, add a CSS class that rotates the button icon 180° with a spring animation
- Use `transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`
- Add a tooltip-like label "Swap" that appears on hover using a pseudo-element or a hidden span
- Keep existing `active:scale-95` and color change on hover

### IMPROVEMENT 10: Subtle Hero Glow Effect
**Add**: A subtle radial gradient glow behind the hero title area:
- Use a pseudo-element or a div with `absolute` positioning behind the h1
- Gradient: `radial-gradient(ellipse at center, rgba(0,112,243,0.04) 0%, transparent 70%)` for light mode
- For dark mode: `radial-gradient(ellipse at center, rgba(0,112,243,0.06) 0%, transparent 70%)`
- Size: ~600px wide, ~300px tall, centered behind the title
- z-index below the text
- Animate with a very subtle pulse (opacity 0.6 → 1 → 0.6 over 4 seconds)

### IMPROVEMENT 11: Return-User Personalization (localStorage)
**Add**: Remember the user's last selected converter category tab:
- On tab click, save the slug to `localStorage.setItem('lastConverterTab', slug)`
- On page load, check `localStorage.getItem('lastConverterTab')` and auto-select that tab
- Fall back to the first tab ('length') if nothing stored

### IMPROVEMENT 12: Keyboard Shortcut Hints
**Add**: Small keyboard shortcut hints near the converter widget:
- Below the converter widget, show: "Tip: Press `/` to search • `Tab` to switch fields"
- Style: `text-[10px] font-mono text-mute text-center mt-3 select-none`
- Wrap keyboard keys in styled spans: `px-1 py-0.5 bg-canvas-soft-2 border border-hairline rounded-sm text-[9px]`

---

## ⚠️ CRITICAL RULES

1. **Output the COMPLETE `Hero.astro` file** — frontmatter (`---`), HTML template, `<style>`, and `<script>` sections. Do not truncate or say "rest remains the same".
2. **Keep ALL existing functionality working** — search, quick converter, category tabs, typing animation, keyboard shortcuts, i18n support, localized hrefs, popular converters grid, popular conversions grid, SEO text block.
3. **Use ONLY the existing design tokens** — `text-ink`, `bg-canvas`, `border-hairline`, etc. Do NOT introduce new colors or CSS variables.
4. **Use ONLY `hugeicons:*` icon names** with `<Icon name="..." />` from `astro-icon/components`.
5. **All client-side code must be vanilla JS** — no React, no Alpine, no external libraries.
6. **All `<script>` blocks must use `define:vars` for server data** — same pattern as the existing code.
7. **Mobile-first responsive** — everything must work perfectly on 320px+ screens.
8. **Dark mode must work** — the `.dark` class system is already set up. Your additions must respect it. Use Tailwind's `dark:` variant if needed.
9. **Do NOT modify any other file** — all changes go in `Hero.astro` only.
10. **Performance**: Use CSS animations over JS intervals where possible. Use `IntersectionObserver` for scroll-triggered effects. Don't add heavy computations.
11. **Preserve the `no-scrollbar` class** and scrollbar-hiding CSS.
12. **Keep the `astro:page-load` event listener** for Astro view transitions compatibility.

---

## 🎨 VISUAL HIERARCHY (Top to Bottom)

After your rewrite, the visual stack from top to bottom should be:

1. **Badge** — "Professional Grade Tools" pill with pulse dot
2. **Hero Title** — typing animation (starts empty, types immediately)
3. **Subtitle** — descriptive paragraph
4. **Live Conversion Ticker** — auto-scrolling marquee of real conversions (NEW)
5. **Search Bar** — with `/` shortcut hint + trending on focus (ENHANCED)
6. **Popular Conversion Pills** — clickable tags (NEW)
7. **CTA Buttons** — Browse All / Calculators (NEW)
8. **Quick Converter Widget** — with copy button, formula display, enhanced swap (ENHANCED)
9. **Keyboard Hints** — tip text below converter (NEW)
10. **Trust Statistics** — with icons and count-up animation (ENHANCED)
11. **Popular Converters Grid** — 8 cards (KEEP AS-IS)
12. **Popular Conversions Grid** — 8 link rows (KEEP AS-IS)
13. **SEO Text Block** — paragraph (KEEP AS-IS)

---

## 🚀 EXPECTED OUTPUT

Provide the complete, production-ready `Hero.astro` file content. It should be drop-in replacement ready. The file should be well-organized with clear comment sections separating each major block. All 12 improvements must be implemented. The result should make users go "wow" on first load while maintaining the clean, editorial aesthetic of the existing design.
