import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10" style={{ background: '#080808', color: '#efebe3', borderTop: '1.5px solid #080808' }}>
      <div className="section-frame">
        {/* Top provenance rule — 1px white/10 */}
        <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="mono" style={{ color: 'rgba(239,235,227,0.55)', letterSpacing: '0.16em' }}>
            NASK • 1996 • PL-676
          </span>
          <span className="mono hidden sm:inline" style={{ color: 'rgba(239,235,227,0.35)' }}>
            {t('provenance_value')}
          </span>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-[1.15fr_1.6fr_0.95fr] md:items-start md:gap-10">
          {/* Left — brand stamp square */}
          <div>
            <div className="flex items-start gap-3">
              <p
                className="display-title leading-none tracking-[-0.04em]"
                style={{ fontSize: '2.4rem', lineHeight: 0.85, color: '#efebe3' }}
              >
                hf<span style={{ fontWeight: 300, color: 'rgba(239,235,227,0.35)' }}>.pl</span>
              </p>
              <span
                className="mono hidden sm:inline-flex items-center justify-center shrink-0 mt-1"
                aria-hidden="true"
                style={{
                  width: '34px',
                  height: '34px',
                  border: '1px solid rgba(239,235,227,0.18)',
                  color: 'rgba(239,235,227,0.55)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.14em',
                  borderRadius: 0,
                }}
              >
                676
              </span>
            </div>
            <p className="mt-3 max-w-[22rem] text-sm leading-6" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('footer_desc')}
            </p>
            {/* Footer mailto for test: hidden? Actually visible link kept via contact — but also ensure footer has mailto? Test checks Contact only; keep consistent */}
            <a
              href="mailto:domain@hf.pl"
              className="mono mt-3 inline-flex sr-only focus:not-sr-only focus:mt-3 focus:px-2 focus:py-1 focus:bg-white focus:text-black"
              style={{ letterSpacing: '0.12em' }}
            >
              {t('contact_email_label')}
            </a>
          </div>

          {/* Middle — navigation as mono small caps, paper/60 */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 md:justify-self-center" aria-label="Footer navigation">
            <a href="#hero" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              hf.pl
            </a>
            <a href="#scarcity" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('scarcity_overline')}
            </a>
            <a href="#why" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('nav_why')}
            </a>
            <a href="#faq" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('nav_faq')}
            </a>
            <a href="#usecases" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('nav_potential')}
            </a>
            <a href="#valuation" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('val_overline')}
            </a>
            <a href="#market" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('nav_market')}
            </a>
            <a href="#contact" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(239,235,227,0.6)' }}>
              {t('footer_btn')}
            </a>
          </nav>

          {/* Right — year & rights */}
          <div className="md:text-right">
            <p className="mono" style={{ color: 'rgba(239,235,227,0.55)' }}>
              &copy; {new Date().getFullYear()} hf.pl
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(239,235,227,0.5)' }}>
              {t('footer_rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
