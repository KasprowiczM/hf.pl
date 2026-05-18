import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'system');
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('fontScale') || '1'));

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
    localStorage.setItem('fontScale', String(fontScale));
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
    localStorage.setItem(THEME_KEY, next);
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
      <a href="#main" className="sr-only absolute left-0 top-0 z-[999] bg-primary px-4 py-3 text-black focus:not-sr-only">
        {t('skip')}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-6 sm:pt-4 lg:px-8">
        <nav
          className="section-frame flex items-center justify-between rounded-full border border-white/18 bg-[rgba(8,10,14,0.86)] px-3 py-2.5 shadow-[0_24px_60px_rgba(4,8,14,0.42)] backdrop-blur-xl sm:px-5 sm:py-3"
          aria-label="Main navigation"
        >
          <a href="#hero" className="flex items-center gap-3 no-underline">
            <span className="display-title text-[1.45rem] leading-none tracking-tight text-white sm:text-[1.65rem]">
              <span className="gold-gradient bg-clip-text text-transparent">hf</span>
              <span className="text-white/45">.pl</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ key, href }) => (
              <a key={key} href={href} className="text-sm font-medium text-white/72 no-underline hover:text-white">
                {t(key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <div className="flex rounded-full border border-white/16 bg-white/6 p-0.5 sm:p-1" role="group" aria-label={t('language_switch')}>
              {['pl', 'en'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  className={`rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:px-3 sm:text-xs sm:tracking-[0.16em] ${
                    i18n.language === lang
                      ? 'bg-white text-[#0c1017]'
                      : 'text-white/62 hover:bg-white/12 hover:text-white'
                  }`}
                  aria-pressed={i18n.language === lang}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Font size — visible on all screen sizes */}
            <div className="flex rounded-full border border-white/16 bg-white/6 p-0.5 sm:p-1" role="group" aria-label={t('font_size')}>
              <button
                type="button"
                onClick={decreaseFontSize}
                aria-label={t('font_decrease')}
                disabled={fontScale <= 0.9}
                className="rounded-full px-2 py-1.5 text-white/62 hover:bg-white/12 hover:text-white disabled:opacity-30 sm:px-2.5"
              >
                <Type className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              </button>
              <span className="px-1 text-[0.65rem] font-semibold tracking-[0.12em] text-white/55 sm:text-[0.7rem]" aria-hidden="true">A</span>
              <button
                type="button"
                onClick={increaseFontSize}
                aria-label={t('font_increase')}
                disabled={fontScale >= 1.2}
                className="rounded-full px-2 py-1.5 text-white/62 hover:bg-white/12 hover:text-white disabled:opacity-30 sm:px-2.5"
              >
                <Type className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
              </button>
            </div>

            {/* Theme toggle */}
            <div className="flex rounded-full border border-white/16 bg-white/6 p-0.5 sm:p-1" role="group" aria-label={t('theme_switch')}>
              <button
                type="button"
                onClick={cycleTheme}
                className="rounded-full px-2.5 py-1.5 text-white/62 hover:bg-white/12 hover:text-white sm:px-3"
              >
                {theme === 'dark' && <Sun className="h-4 w-4" aria-hidden="true" />}
                {theme === 'light' && <Moon className="h-4 w-4" aria-hidden="true" />}
                {theme === 'system' && <Monitor className="h-4 w-4" aria-hidden="true" />}
                <span className="sr-only">
                  {t('theme_switch')}: {t(`theme_${theme}`)}. {t('theme_next')}: {t(`theme_${nextTheme}`)}.
                </span>
              </button>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'navigation', target: 'contact' })}
              className="action-pill hidden bg-white text-[#0d1117] no-underline hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,255,255,0.18)] sm:inline-flex"
            >
              {t('nav_offer')}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
