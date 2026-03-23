import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Valuation() {
  const { t } = useTranslation();
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

  return (
    <section className="section-shell section-tone-deep reveal reveal-up" id="valuation">
      <div className="section-frame">
        <div className="interactive-card reveal reveal-up overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(135deg,#13202d_0%,#1b2432_48%,#412a18_100%)] px-5 py-6 text-white sm:px-8 sm:py-10 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/58">{t('val_overline')}</div>
            <h2 className="display-title mt-4 max-w-[18ch] text-[clamp(2.7rem,1.9rem+2.8vw,4.8rem)] leading-[0.95] text-white">
              {t('val_title')}
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-white/72">{t('val_note')}</p>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/6 px-5 py-6 backdrop-blur-sm sm:mt-8 sm:px-6 sm:py-7 lg:mt-0">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t('val_label')}</p>
            <p className="stat-value mt-4 text-[clamp(2.7rem,1.8rem+3vw,4.6rem)] leading-none text-white">{t('val_price')}</p>
            <ul className="mt-6 space-y-3">
              {terms.map((term) => (
                <li key={term} className="flex gap-3 text-sm leading-7 text-white/74">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#d8b27d]"></span>
                  <span>{t(term)}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'valuation', target: 'contact' })}
              className="action-pill hoverable mt-7 w-full border border-[#f3ddb8] bg-[#f6efe2] text-[#111319] no-underline hover:bg-[#f7dfbd] dark:bg-[#f8e6c6] dark:text-[#0f1218]"
            >
              {t('val_cta')}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
