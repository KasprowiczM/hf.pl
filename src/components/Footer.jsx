import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 relative z-[1]" style={{ background: '#07080a', color: '#f6f1e8', borderTop: '1.5px solid #07080a' }}>
      <div className="section-frame">
        {/* Top provenance rule — 1px white/10 */}
        <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1px solid rgba(246,241,232,0.10)' }}>
          <span className="mono flex items-center gap-2" style={{ color: 'rgba(246,241,232,0.55)', letterSpacing: '0.18em' }}>
            <span className="signal-dot hidden sm:inline-block" aria-hidden="true" style={{ background: '#e30613' }} />
            NASK • 1996 • PL-676
          </span>
          <span className="mono hidden sm:inline" style={{ color: 'rgba(246,241,232,0.35)' }}>
            {t('provenance_value')}
          </span>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-[1.15fr_1.6fr_0.95fr] md:items-start md:gap-10">
          {/* Left — brand stamp square + red dot */}
          <div>
            <div className="flex items-start gap-3">
              <p
                className="display-title leading-none tracking-[-0.06em]"
                style={{ fontSize: '2.4rem', lineHeight: 0.85, color: '#f6f1e8', fontFamily: 'Instrument Serif, Georgia, serif' }}
              >
                hf<span className="signal-dot ml-[2px] relative -top-[0.45em]" aria-hidden="true" style={{ background: '#e30613', width: '6px', height: '6px' }} /><span style={{ fontWeight: 300, color: 'rgba(246,241,232,0.35)' }}>.pl</span>
              </p>
              <span
                className="mono hidden sm:inline-flex items-center justify-center shrink-0 mt-1"
                aria-hidden="true"
                style={{
                  width: '34px',
                  height: '34px',
                  border: '1px solid rgba(246,241,232,0.18)',
                  color: 'rgba(246,241,232,0.55)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.14em',
                  borderRadius: '4px',
                }}
              >
                676
              </span>
            </div>
            <p className="mt-3 max-w-[22rem] text-[15px] leading-6" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('footer_desc')}
            </p>
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
            <a href="#hero" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              hf.pl
            </a>
            <a href="#scarcity" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('scarcity_overline')}
            </a>
            <a href="#why" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('nav_why')}
            </a>
            <a href="#faq" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('nav_faq')}
            </a>
            <a href="#usecases" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('nav_potential')}
            </a>
            <a href="#valuation" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('val_overline')}
            </a>
            <a href="#market" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('nav_market')}
            </a>
            <a href="#contact" className="mono no-underline transition-colors hover:!text-white" style={{ color: 'rgba(246,241,232,0.6)' }}>
              {t('footer_btn')}
            </a>
          </nav>

          {/* Right — year & rights — Swiss mono */}
          <div className="md:text-right">
            <p className="mono" style={{ color: 'rgba(246,241,232,0.55)' }}>
              &copy; {new Date().getFullYear()} hf.pl
            </p>
            <p className="mt-2 text-[15px] leading-6" style={{ color: 'rgba(246,241,232,0.5)' }}>
              {t('footer_rights')}
            </p>
            <div className="mt-4 hidden md:flex justify-end">
              <span className="h-[2px] w-12 bg-[#e30613]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
