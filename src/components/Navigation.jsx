import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Sun, Moon, Monitor, Type } from 'lucide-react';
import { persistLanguage } from '../i18n';
import { trackEvent } from '../lib/analytics';

const navItems = [
  { key: 'nav_why', href: '#why' },
  { key: 'nav_potential', href: '#usecases' },
  { key: 'nav_market', href: '#market' },
  { key: 'nav_faq', href: '#faq' },
  { key: 'nav_contact', href: '#contact' },
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
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

  const applyTheme = (nextTheme) => {
    const root = document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else if (nextTheme === 'light') {
      root.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
    trackEvent('theme_switch', { theme: nextTheme });
  };

  const cycleTheme = () => {
    if (theme === 'light') {
      applyTheme('dark');
      return;
    }

    if (theme === 'dark') {
      applyTheme('system');
      return;
    }

    applyTheme('light');
  };

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
              <div className="flex rounded-full border border-white/16 bg-white/6 p-0.5 sm:p-1" role="group" aria-label={t('language_switch')}>
                <button
                  type="button"
                  onClick={() => changeLanguage('pl')}
                  className={`rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:px-3 sm:text-xs sm:tracking-[0.16em] ${
                    i18n.language === 'pl' ? 'bg-white text-[#0c1017]' : 'text-white/62 hover:text-white hover:bg-white/12'
                  }`}
                  aria-pressed={i18n.language === 'pl'}
                >
                  PL
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:px-3 sm:text-xs sm:tracking-[0.16em] ${
                    i18n.language === 'en' ? 'bg-white text-[#0c1017]' : 'text-white/62 hover:text-white hover:bg-white/12'
                  }`}
                  aria-pressed={i18n.language === 'en'}
                >
                  EN
                </button>
              </div>

              <div className="ml-1 hidden rounded-full border border-white/16 bg-white/6 p-1 sm:flex" role="group" aria-label={t('font_size')}>
                <button
                  type="button"
                  onClick={decreaseFontSize}
                  aria-label={t('font_decrease')}
                  className="rounded-full px-2.5 py-1.5 text-white/62 hover:bg-white/12 hover:text-white"
                >
                  <Type className="h-3.5 w-3.5" />
                  <span className="sr-only">{t('font_decrease')}</span>
                </button>
                <span className="px-1 text-[0.7rem] font-semibold tracking-[0.12em] text-white/55">A</span>
                <button
                  type="button"
                  onClick={increaseFontSize}
                  aria-label={t('font_increase')}
                  className="rounded-full px-2.5 py-1.5 text-white/62 hover:bg-white/12 hover:text-white"
                >
                  <Type className="h-4.5 w-4.5" />
                  <span className="sr-only">{t('font_increase')}</span>
                </button>
              </div>

              <div className="flex rounded-full border border-white/16 bg-white/6 p-0.5 sm:p-1" role="group" aria-label={t('theme_switch')}>
                <button
                  type="button"
                  onClick={cycleTheme}
                  className="rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/62 hover:bg-white/12 hover:text-white sm:px-3 sm:text-xs sm:tracking-[0.16em]"
                  title={theme === 'system' ? t('theme_system') : theme === 'dark' ? t('theme_dark') : t('theme_light')}
                >
                  {theme === 'dark' && <Sun className="h-4 w-4" />}
                  {theme === 'light' && <Moon className="h-4 w-4" />}
                  {theme === 'system' && <Monitor className="h-4 w-4" />}
                  <span className="sr-only">{t('theme_switch')}</span>
                </button>
              </div>

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
