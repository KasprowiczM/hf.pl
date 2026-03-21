import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { persistLanguage } from '../i18n';

const navItems = [
  { key: 'nav_why', href: '#why' },
  { key: 'nav_potential', href: '#usecases' },
  { key: 'nav_market', href: '#market' },
  { key: 'nav_faq', href: '#faq' },
  { key: 'nav_contact', href: '#contact' },
];

export function Navigation() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    persistLanguage(language);
  };

  return (
    <>
      <a href="#main" className="sr-only absolute left-0 top-0 z-[999] bg-primary px-4 py-3 text-black focus:not-sr-only">
        {t('skip')}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className="section-frame flex items-center justify-between rounded-full border border-border bg-[rgba(248,244,237,0.82)] px-4 py-3 shadow-[0_20px_40px_rgba(15,23,34,0.08)] backdrop-blur-xl sm:px-5"
          aria-label="Main navigation"
        >
          <a href="#hero" className="flex items-center gap-3 no-underline">
            <span className="display-title text-[1.65rem] leading-none tracking-tight text-text">
              <span className="gold-gradient bg-clip-text text-transparent">hf</span>
              <span className="text-text-faint">.pl</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ key, href }) => (
              <a key={key} href={href} className="anchor-link no-underline">
                {t(key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex rounded-full border border-border bg-white/70 p-1" role="group" aria-label="Language">
              <button
                type="button"
                onClick={() => changeLanguage('pl')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${
                  i18n.language === 'pl' ? 'bg-text text-bg' : 'text-text-muted hover:text-text'
                }`}
                aria-pressed={i18n.language === 'pl'}
              >
                PL
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${
                  i18n.language === 'en' ? 'bg-text text-bg' : 'text-text-muted hover:text-text'
                }`}
                aria-pressed={i18n.language === 'en'}
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              className="action-pill hidden bg-text text-white no-underline hover:-translate-y-0.5 hover:bg-surface-offset sm:inline-flex"
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
