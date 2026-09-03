import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-paper)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="section-frame">
        <div className="flex items-center justify-between border-b border-[var(--color-hairline)] pb-6">
          <span className="mono tracking-[0.16em]">NASK • 1996 • PL-676</span>
          <span className="mono hidden sm:inline opacity-60">{t('provenance_value')}</span>
        </div>

        <div className="grid gap-8 pt-8 sm:grid-cols-[1.2fr_1.6fr_0.9fr] sm:gap-10 sm:items-start">
          <div>
            <p className="font-display text-[1.9rem] leading-none tracking-[-0.04em] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              hf<span className="font-light text-[var(--color-text-faint)]">.pl</span>
            </p>
            <p className="mt-3 max-w-[20rem] text-sm leading-6 text-[var(--color-text-muted)]">{t('footer_desc')}</p>
            {/* mailto for a11y test fallback — keep visible on focus */}
            <a href="mailto:domain@hf.pl" className="mono mt-3 inline-flex sr-only focus:not-sr-only focus:mt-3 focus:px-2 focus:py-1 focus:bg-[var(--color-ink)] focus:text-[var(--color-paper)] focus:rounded">
              {t('contact_email_label')}
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Footer navigation">
            {[
              ['#hero', 'hf.pl'],
              ['#scarcity', t('scarcity_overline')],
              ['#why', t('nav_why')],
              ['#faq', t('nav_faq')],
              ['#usecases', t('nav_potential')],
              ['#valuation', t('val_overline')],
              ['#market', t('nav_market')],
              ['#contact', t('footer_btn')],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="mono !normal-case no-underline hover:!text-[var(--color-ink)] transition-colors"
                style={{ letterSpacing: '0.08em', textTransform: 'none', color: 'var(--color-text-muted)' }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="sm:text-right">
            <p className="mono !text-[var(--color-text-muted)]">&copy; {new Date().getFullYear()} hf.pl</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{t('footer_rights')}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-[var(--color-hairline)] pt-6">
          <span className="h-px w-6 bg-[var(--color-hairline)] hidden sm:block" aria-hidden="true" />
          <span className="mono text-center">HF.PL — 1 z 676 — Sotheby&apos;s Gallery Minimal — Stone #c9b99a</span>
        </div>
      </div>
    </footer>
  );
}
