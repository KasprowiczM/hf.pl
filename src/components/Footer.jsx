import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="hairline-top bg-ink text-paper px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
      <div className="section-frame">
        {/* Top provenance rule — editorial hairline */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <span className="mono text-paper/55 tracking-[0.16em]">NASK • 1996 • PL-676</span>
          <span className="mono hidden text-paper/35 sm:inline">{t('provenance_value')}</span>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-[1.15fr_1.6fr_0.95fr] md:items-start md:gap-10">
          {/* Left — brand */}
          <div>
            <p className="display-title text-[2.2rem] leading-none tracking-[-0.04em] text-paper">
              hf<span className="font-light text-paper/35">.pl</span>
            </p>
            <p className="mt-3 max-w-[22rem] text-sm leading-6 text-paper/60">{t('footer_desc')}</p>
          </div>

          {/* Middle — navigation as mono small caps */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 md:justify-self-center" aria-label="Footer navigation">
            <a href="#hero" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              hf.pl
            </a>
            <a href="#scarcity" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('scarcity_overline')}
            </a>
            <a href="#why" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('nav_why')}
            </a>
            <a href="#faq" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('nav_faq')}
            </a>
            <a href="#usecases" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('nav_potential')}
            </a>
            <a href="#valuation" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('val_overline')}
            </a>
            <a href="#market" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('nav_market')}
            </a>
            <a href="#contact" className="mono text-paper/60 no-underline transition-colors hover:text-paper">
              {t('footer_btn')}
            </a>
          </nav>

          {/* Right — year & rights */}
          <div className="md:text-right">
            <p className="mono text-paper/55">&copy; {new Date().getFullYear()} hf.pl</p>
            <p className="mt-2 text-sm leading-6 text-paper/50">{t('footer_rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
