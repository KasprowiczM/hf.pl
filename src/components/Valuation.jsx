import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Valuation() {
  const { t } = useTranslation();
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

  return (
    <section className="section-shell hairline-top reveal reveal-up" id="valuation">
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14">
        {/* Left — copy */}
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('val_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('val_title')}</h2>
          <p className="section-lead mt-5">{t('val_note')}</p>
          <p className="mono mt-6 hidden lg:block">NASK • 676 • {t('val_label')} — {t('provenance_label')}</p>
        </div>

        {/* Right — artifact card, paper with ink header */}
        <div className="artifact-card overflow-hidden rounded-[1.25rem]">
          {/* ink header */}
          <div className="flex items-center justify-between bg-ink px-5 py-4 sm:px-6 dark:bg-[#0f1318]">
            <span className="mono !text-white/60">{t('val_label')}</span>
            <span className="provenance-stamp border-white/15 !text-white/70">NASK • 676 • 1996</span>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <p className="stat-value text-[clamp(2.4rem,1.6rem+3vw,3.4rem)] leading-none text-ink dark:text-paper">
              {t('val_price')}
            </p>
            <p className="mono mt-2">{t('val_cta_sub')}</p>

            <div className="mt-6 border-y border-hairline">
              {terms.map((term) => (
                <div key={term} className="evidence-row flex gap-3 px-1 py-4">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-sm leading-7 text-text-muted">{t(term)}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'valuation', target: 'contact' })}
              className="action-pill action-primary mt-6 w-full no-underline"
            >
              {t('val_cta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <p className="mono mt-3 text-center">{t('val_cta_sub')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
