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
      <a href="#main" className="sr-only absolute left-0 top-0 z-[999] bg-[#0a0a0a] px-4 py-3 text-[#f6f1e8] focus:not-sr-only">
        {t('skip')}
      </a>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.7 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(10,10,10,0.08)] bg-[#f6f1e8]/92 backdrop-blur-[8px] dark:border-white/10 dark:bg-[#0a0a0a]/88"
      >
        <nav
          className="section-frame flex h-[52px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
          aria-label="Main navigation"
        >
          {/* left: Swiss wordmark + red dot + PL-676 badge red outline */}
          <a href="#hero" className="flex items-center gap-3 no-underline shrink-0">
            <span
              className="flex items-baseline gap-[1px] font-display leading-none tracking-[-0.04em] text-[#0a0a0a] dark:text-[#fdf8ef]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '1.55rem' }}
            >
              <span>hf</span>
              <span className="signal-dot relative -top-[0.55em] ml-[1px]" aria-hidden="true" />
              <span className="text-[#0a0a0a]/35 dark:text-[#fdf8ef]/40 text-[1.5rem] tracking-[-0.03em]">.pl</span>
            </span>
            <span className="hidden sm:inline-flex items-center justify-center border border-[#e30613] bg-transparent px-2 py-1 font-mono text-[0.58rem] font-bold tracking-[0.16em] text-[#e30613] dark:border-[#ff1a2b] dark:text-[#ff1a2b]" style={{ borderRadius: '4px' }}>
              PL-676
            </span>
          </a>

          {/* center: mono caps — Swiss tracking 0.14em */}
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ key, href }) => {
              const label = brutalistLabels[key]?.[i18n.language] || brutalistLabels[key]?.pl || t(key);
              return (
                <a
                  key={key}
                  href={href}
                  className="font-mono text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-[#0a0a0a]/70 no-underline hover:text-[#e30613] dark:text-[#fdf8ef]/65 dark:hover:text-[#ff1a2b]"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* language — PL [x] EN [ ] — Swiss ink border 1px */}
            <div
              className="flex items-center gap-2 border border-[rgba(10,10,10,0.14)] bg-transparent px-2 py-1.5 dark:border-white/18"
              style={{ borderRadius: '4px' }}
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
                    className={`inline-flex items-center font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? 'text-[#0a0a0a] dark:text-[#fdf8ef]'
                        : 'text-[#8a8683] hover:text-[#0a0a0a] dark:text-white/40 dark:hover:text-[#fdf8ef]'
                    }`}
                  >
                    <span>{lang.toUpperCase()}</span>
                    <span aria-hidden="true" className="ml-1 hidden sm:inline text-[#0a0a0a]/50 dark:text-white/30">
                      [
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden sm:inline-flex h-[11px] w-[11px] items-center justify-center border text-[8px] leading-none ${
                        active
                          ? 'border-[#e30613] bg-[#e30613] text-white dark:border-[#ff1a2b] dark:bg-[#ff1a2b]'
                          : 'border-[rgba(10,10,10,0.22)] dark:border-white/20'
                      }`}
                    >
                      {active ? '×' : ''}
                    </span>
                    <span aria-hidden="true" className="hidden sm:inline text-[#0a0a0a]/50 dark:text-white/30">
                      ]
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="hidden sm:flex items-center gap-0.5 border border-[rgba(10,10,10,0.14)] bg-transparent px-1 py-1 dark:border-white/18"
              style={{ borderRadius: '4px' }}
              role="group"
              aria-label={t('font_size')}
            >
              <button
                type="button"
                onClick={decreaseFontSize}
                aria-label={t('font_decrease')}
                disabled={fontScale <= 0.9}
                className="px-1.5 py-1 text-[#0a0a0a]/55 hover:text-[#0a0a0a] disabled:opacity-30 dark:text-white/50 dark:hover:text-[#fdf8ef]"
              >
                <Type className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              </button>
              <span className="px-1 font-mono text-[0.60rem] font-bold tracking-[0.12em] text-[#0a0a0a]/30 dark:text-white/30" aria-hidden="true">
                A
              </span>
              <button
                type="button"
                onClick={increaseFontSize}
                aria-label={t('font_increase')}
                disabled={fontScale >= 1.2}
                className="px-1.5 py-1 text-[#0a0a0a]/55 hover:text-[#0a0a0a] disabled:opacity-30 dark:text-white/50 dark:hover:text-[#fdf8ef]"
              >
                <Type className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="flex items-center border border-[rgba(10,10,10,0.14)] bg-transparent p-0.5 dark:border-white/18"
              style={{ borderRadius: '4px' }}
              role="group"
              aria-label={t('theme_switch')}
            >
              <button
                type="button"
                onClick={cycleTheme}
                className="px-2 py-1.5 text-[#0a0a0a]/60 hover:text-[#0a0a0a] dark:text-white/60 dark:hover:text-[#fdf8ef]"
              >
                {theme === 'dark' && <Sun className="h-4 w-4" aria-hidden="true" />}
                {theme === 'light' && <Moon className="h-4 w-4" aria-hidden="true" />}
                {theme === 'system' && <Monitor className="h-4 w-4" aria-hidden="true" />}
                <span className="sr-only">
                  {t('theme_switch')}: {t(`theme_${theme}`)}. {t('theme_next')}: {t(`theme_${nextTheme}`)}.
                </span>
              </button>
            </div>

            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'navigation', target: 'contact' })}
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#0a0a0a] bg-[#0a0a0a] px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#f6f1e8] no-underline hover:bg-transparent hover:text-[#0a0a0a] dark:border-[#fdf8ef] dark:bg-[#fdf8ef] dark:text-[#0a0a0a] dark:hover:bg-transparent dark:hover:text-[#fdf8ef]"
              style={{ borderRadius: '4px' }}
            >
              {t('nav_offer')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </motion.a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
