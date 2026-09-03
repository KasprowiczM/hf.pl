import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10" style={{ background: '#070a12', color: '#e6edf3', borderTop: '1px solid rgba(230,237,243,0.08)' }}>
      <div className="section-frame">
        <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">
            NASK • 1996 • PL-676 — TERMINAL SLATE
          </span>
          <span className="hidden sm:inline font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">
            {t('provenance_value')}
          </span>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-[1.15fr_1.6fr_0.95fr] md:items-start md:gap-10">
          <div>
            <div className="flex items-start gap-3">
              <p
                className="font-mono font-extrabold leading-none tracking-[-0.04em] text-[#e6edf3]"
                style={{ fontSize: '2.2rem', lineHeight: 0.85, fontFamily: 'var(--font-mono)' }}
              >
                hf<span style={{ fontWeight: 400, color: '#5a6575' }}>.pl</span>
              </p>
              <span
                className="hidden sm:inline-flex items-center justify-center shrink-0 mt-1 font-mono font-bold uppercase tracking-[0.14em] text-[#00e5ff]"
                aria-hidden="true"
                style={{
                  width: '36px',
                  height: '28px',
                  border: '1px solid rgba(0,229,255,0.22)',
                  background: 'rgba(0,229,255,0.08)',
                  color: '#00e5ff',
                  fontSize: '0.52rem',
                  borderRadius: 4,
                }}
              >
                676
              </span>
            </div>
            <p className="mt-3 max-w-[22rem] font-mono text-[0.82rem] leading-6 text-[#8a97a8]">
              {t('footer_desc')}
            </p>
            <a
              href="mailto:domain@hf.pl"
              className="mono mt-3 inline-flex sr-only focus:not-sr-only focus:mt-3 focus:px-2 focus:py-1 focus:bg-[#00e5ff] focus:text-[#070a12]"
              style={{ letterSpacing: '0.12em' }}
            >
              {t('contact_email_label')}
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 md:justify-self-center" aria-label="Footer navigation">
            <a href="#hero" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              hf.pl
            </a>
            <a href="#scarcity" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('scarcity_overline')}
            </a>
            <a href="#why" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('nav_why')}
            </a>
            <a href="#faq" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('nav_faq')}
            </a>
            <a href="#usecases" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('nav_potential')}
            </a>
            <a href="#valuation" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('val_overline')}
            </a>
            <a href="#market" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('nav_market')}
            </a>
            <a href="#contact" className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8] no-underline transition-colors hover:text-[#00e5ff]">
              {t('footer_btn')}
            </a>
          </nav>

          <div className="md:text-right">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">
              &copy; {new Date().getFullYear()} hf.pl — TERMINAL
            </p>
            <p className="mt-2 font-mono text-[0.78rem] leading-6 text-[#5a6575]">
              {t('footer_rights')}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575] md:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px rgba(0,229,255,0.5)' }} />
              EXECUTION READY • 24H
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
