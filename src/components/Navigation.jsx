/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion';
import { Sun, Moon, Monitor, Type } from 'lucide-react';
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

const galleryLabels = {
  nav_why: { pl: 'Dlaczego', en: 'Why' },
  nav_potential: { pl: 'Marki', en: 'Brands' },
  nav_market: { pl: 'Rynek', en: 'Market' },
  nav_faq: { pl: 'FAQ', en: 'FAQ' },
  nav_contact: { pl: 'Kontakt', en: 'Contact' },
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
    } catch { /* ignore */ }
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
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
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
      <a href="#main" className="sr-only absolute left-0 top-0 z-[999] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] focus:not-sr-only focus:fixed">
        {t('skip')}
      </a>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-hairline)] bg-[var(--color-paper)]/80 backdrop-blur-[12px] supports-[backdrop-filter]:bg-[var(--color-paper)]/70"
      >
        <nav
          className="section-frame flex h-[56px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* left: gallery wordmark — serif, air, no pill */}
          <a href="#hero" className="flex items-center gap-3 no-underline shrink-0 group">
            <span
              className="font-display text-[1.55rem] leading-none tracking-[-0.04em] text-[var(--color-ink)] group-hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              hf<span className="font-light text-[var(--color-text-faint)]">.pl</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-[var(--color-text-faint)]">
              <span className="h-px w-3 bg-[var(--color-stone)]" aria-hidden="true" />
              PL-676
            </span>
          </a>

          {/* center: airy mono links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(({ key, href }) => {
              const label = galleryLabels[key]?.[i18n.language] || galleryLabels[key]?.pl || t(key);
              return (
                <a
                  key={key}
                  href={href}
                  className="font-mono text-[0.62rem] font-normal tracking-[0.14em] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-ink)] transition-colors"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* right: minimal utilities */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* language — gallery text, no box */}
            <div className="flex items-center gap-1" role="group" aria-label={t('language_switch')}>
              {['pl', 'en'].map((lang) => {
                const active = i18n.language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={active}
                    aria-label={lang.toUpperCase()}
                    className={`px-1.5 py-1 font-mono text-[0.62rem] tracking-[0.14em] transition-colors ${
                      active ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-text-faint)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:block h-3 w-px bg-[var(--color-hairline)] mx-1" aria-hidden="true" />

            <div className="hidden sm:flex items-center gap-0" role="group" aria-label={t('font_size')}>
              <button type="button" onClick={decreaseFontSize} aria-label={t('font_decrease')} disabled={fontScale <= 0.9} className="p-1.5 text-[var(--color-text-faint)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors">
                <Type className="h-3 w-3" aria-hidden="true" />
              </button>
              <button type="button" onClick={increaseFontSize} aria-label={t('font_increase')} disabled={fontScale >= 1.2} className="p-1.5 text-[var(--color-text-faint)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors">
                <Type className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={cycleTheme}
              aria-label={t('theme_switch')}
              className="p-1.5 text-[var(--color-text-faint)] hover:text-[var(--color-ink)] transition-colors"
            >
              {theme === 'dark' && <Sun className="h-3.5 w-3.5" aria-hidden="true" />}
              {theme === 'light' && <Moon className="h-3.5 w-3.5" aria-hidden="true" />}
              {theme === 'system' && <Monitor className="h-3.5 w-3.5" aria-hidden="true" />}
              <span className="sr-only">
                {t('theme_switch')}: {t(`theme_${theme}`)}. {t('theme_next')}: {t(`theme_${nextTheme}`)}.
              </span>
            </button>

            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'navigation', target: 'contact' })}
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-[0.62rem] font-medium tracking-[0.12em] uppercase text-[var(--color-ink)] underline decoration-[var(--color-stone)] decoration-1 underline-offset-4 hover:decoration-[var(--color-ink)] transition-all no-underline"
            >
              {t('nav_offer')}
            </a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
