/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sun, Moon, Monitor, Type } from 'lucide-react';
import { persistLanguage } from '../i18n';
import { trackEvent } from '../lib/analytics';

const THEME_KEY = 'theme';
const THEME_CYCLE = { light: 'dark', dark: 'system', system: 'light' };

const navItems = [
  { key: 'nav_why', href: '#why' },
  { key: 'nav_potential', href: '#usecases' },
  { key: 'nav_market', href: '#market' },
  { key: 'nav_faq', href: '#faq' },
  { key: 'nav_contact', href: '#contact' },
];

const brutalistLabels = {
  nav_why: { pl: 'DLACZEGO', en: 'WHY' },
  nav_potential: { pl: 'ZASTOSOWANIA', en: 'USE CASES' },
  nav_market: { pl: 'RYNEK', en: 'MARKET' },
  nav_faq: { pl: 'FAQ', en: 'FAQ' },
  nav_contact: { pl: 'KONTAKT', en: 'CONTACT' },
};

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'system';
    } catch {
      return 'system';
    }
  });
  const [fontScale, setFontScale] = useState(() => {
    try {
      return Number(localStorage.getItem('fontScale') || '1');
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
    try {
      localStorage.setItem('fontScale', String(fontScale));
    } catch {
      // ignore
    }
  }, [fontScale]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    persistLanguage(language);
    trackEvent('language_switch', { language });
  };

  const applyTheme = (next) => {
    const root = document.documentElement;
    const isDark =
      next === 'dark' ||
      (next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore
    }
    setTheme(next);
    trackEvent('theme_switch', { theme: next });
  };

  const cycleTheme = () => applyTheme(THEME_CYCLE[theme]);
  const nextTheme = THEME_CYCLE[theme];

  const increaseFontSize = () =>
    setFontScale((prev) => {
      const next = Math.min(1.2, Number((prev + 0.05).toFixed(2)));
      trackEvent('font_scale_change', { action: 'increase', value: next });
      return next;
    });

  const decreaseFontSize = () =>
    setFontScale((prev) => {
      const next = Math.max(0.9, Number((prev - 0.05).toFixed(2)));
      trackEvent('font_scale_change', { action: 'decrease', value: next });
      return next;
    });

  return (
    <>
      <a href="#main" className="sr-only absolute left-0 top-0 z-[999] bg-[#080808] px-4 py-3 text-[#efebe3] focus:not-sr-only">
        {t('skip')}
      </a>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.7 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#080808] bg-[#efebe3]/90 backdrop-blur-[2px] dark:border-white/15 dark:bg-[#080808]/90"
      >
        <nav
          className="section-frame flex h-[56px] items-center justify-between gap-4 px-3 sm:px-4 lg:px-8"
          aria-label="Main navigation"
        >
          {/* left: brutalist stamp */}
          <a href="#hero" className="flex items-center gap-3 no-underline shrink-0">
            <span
              className="font-display text-[1.65rem] leading-none tracking-[-0.04em] text-[#080808] dark:text-[#efebe3]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              hf<span className="text-[#080808]/40 dark:text-[#efebe3]/40">.pl</span>
            </span>
            <span className="hidden sm:inline-flex h-[26px] w-[64px] items-center justify-center border border-[#8b1a1a] bg-transparent px-2 font-mono text-[0.60rem] font-semibold tracking-[0.14em] text-[#8b1a1a] dark:border-[#efebe3]/70 dark:text-[#efebe3]">
              PL-676
            </span>
          </a>

          {/* center: mono capitals */}
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map(({ key, href }) => {
              const label = brutalistLabels[key]?.[i18n.language] || brutalistLabels[key]?.pl || t(key);
              return (
                <a
                  key={key}
                  href={href}
                  className="font-mono text-[0.70rem] font-medium uppercase tracking-[0.14em] text-[#080808] no-underline hover:text-[#8b1a1a] dark:text-[#efebe3]/80 dark:hover:text-[#efebe3]"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* brutalist language toggle PL [x] EN [ ] */}
            <div
              className="flex items-center gap-2 border border-[#080808] bg-transparent px-2 py-1.5 dark:border-[#efebe3]/30"
              role="group"
              aria-label={t('language_switch')}
            >
              {['pl', 'en'].map((lang) => {
                const active = i18n.language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={active}
                    aria-label={lang.toUpperCase()}
                    className={`inline-flex items-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? 'text-[#080808] dark:text-[#efebe3]'
                        : 'text-[#8d857b] hover:text-[#080808] dark:text-white/40 dark:hover:text-[#efebe3]'
                    }`}
                  >
                    <span>{lang.toUpperCase()}</span>
                    <span aria-hidden="true" className="ml-1 hidden sm:inline text-[#080808]/60 dark:text-white/40">
                      [
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden sm:inline-flex h-[11px] w-[11px] items-center justify-center border text-[9px] leading-none ${
                        active
                          ? 'border-[#8b1a1a] bg-[#8b1a1a] text-white'
                          : 'border-[#080808]/25 dark:border-white/25'
                      }`}
                    >
                      {active ? '×' : ''}
                    </span>
                    <span aria-hidden="true" className="hidden sm:inline text-[#080808]/60 dark:text-white/40">
                      ]
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="hidden sm:flex items-center gap-0.5 border border-[#080808] bg-transparent px-1 py-1 dark:border-[#efebe3]/30"
              role="group"
              aria-label={t('font_size')}
            >
              <button
                type="button"
                onClick={decreaseFontSize}
                aria-label={t('font_decrease')}
                disabled={fontScale <= 0.9}
                className="px-1.5 py-1 text-[#080808]/60 hover:text-[#080808] disabled:opacity-30 dark:text-white/50 dark:hover:text-[#efebe3]"
              >
                <Type className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              </button>
              <span className="px-1 font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-[#080808]/40 dark:text-white/30" aria-hidden="true">
                A
              </span>
              <button
                type="button"
                onClick={increaseFontSize}
                aria-label={t('font_increase')}
                disabled={fontScale >= 1.2}
                className="px-1.5 py-1 text-[#080808]/60 hover:text-[#080808] disabled:opacity-30 dark:text-white/50 dark:hover:text-[#efebe3]"
              >
                <Type className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="flex items-center border border-[#080808] bg-transparent p-0.5 dark:border-[#efebe3]/30"
              role="group"
              aria-label={t('theme_switch')}
            >
              <button
                type="button"
                onClick={cycleTheme}
                className="px-2 py-1.5 text-[#080808]/60 hover:text-[#080808] dark:text-white/60 dark:hover:text-[#efebe3]"
              >
                {theme === 'dark' && <Sun className="h-4 w-4" aria-hidden="true" />}
                {theme === 'light' && <Moon className="h-4 w-4" aria-hidden="true" />}
                {theme === 'system' && <Monitor className="h-4 w-4" aria-hidden="true" />}
                <span className="sr-only">
                  {t('theme_switch')}: {t(`theme_${theme}`)}. {t('theme_next')}: {t(`theme_${nextTheme}`)}.
                </span>
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'navigation', target: 'contact' })}
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#080808] bg-[#080808] px-4 py-2 font-mono text-[0.70rem] font-semibold uppercase tracking-[0.14em] text-[#efebe3] no-underline hover:bg-transparent hover:text-[#080808] dark:border-[#efebe3] dark:bg-[#efebe3] dark:text-[#080808] dark:hover:bg-transparent dark:hover:text-[#efebe3]"
            >
              {t('nav_offer')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
