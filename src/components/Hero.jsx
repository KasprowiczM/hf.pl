import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Hero() {
  const { t } = useTranslation();

  const proofItems = [
    { value: t('metric_1_value'), label: t('metric_1_label'), sub: t('metric_1_sub') },
    { value: t('metric_2_value'), label: t('metric_2_label'), sub: t('metric_2_sub') },
    { value: t('metric_3_value'), label: t('metric_3_label'), sub: t('metric_3_sub') },
  ];

  return (
    <section className="section-shell relative overflow-hidden pt-24 sm:pt-32 lg:pt-36 hairline-bottom" id="hero">
      {/* subtle paper grain handled by body::before */}
      <div className="section-frame">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-14">
          {/* Left: editorial copy */}
          <div className="max-w-[40rem]">
            <div className="eyebrow reveal is-visible">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true"></span>
              {t('badge')}
              <span className="ml-2 hidden sm:inline-flex provenance-stamp">{t('hero_provenance')}</span>
            </div>

            <h1 className="display-title mt-5 text-[clamp(3.6rem,2.4rem+8vw,8.2rem)] leading-[0.88] tracking-[-0.05em]">
              <span className="text-ink dark:text-paper">{t('domain_prefix')}</span>
              <span className="text-text-faint font-light">.pl</span>
            </h1>
            <div className="hero-rule mt-4 max-w-[28rem]"></div>

            <p className="mt-6 max-w-[36rem] text-balance text-[1.15rem] leading-7 text-ink dark:text-paper sm:text-[1.35rem] sm:leading-8">
              {t('hero_subtitle')}
            </p>
            <p className="mt-3 max-w-[34rem] font-display italic text-[1.05rem] leading-7 text-text-muted">
              {t('hero_subtitle_accent')}
            </p>

            <p className="mt-6 max-w-[34rem] text-sm leading-6 text-text-muted border-l border-line pl-4">
              {t('hero_note')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
                className="action-pill action-primary shadow-paper"
              >
                {t('cta_offer')}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#valuation"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
                className="action-pill border border-line bg-surface text-ink hover:bg-paper dark:bg-surface dark:text-paper"
              >
                {t('cta_valuation')}
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <p className="mono mt-3">{t('cta_offer_sub')}</p>

            {/* Proof bar — editorial hairline, not cards */}
            <div className="mt-10 grid grid-cols-3 gap-0 border-y border-hairline">
              {proofItems.map((item) => (
                <div key={item.label} className="px-3 py-5 sm:px-4 text-center sm:text-left border-r border-hairline last:border-r-0">
                  <div className="stat-value text-[2rem] leading-none sm:text-[2.6rem]">{item.value}</div>
                  <div className="mono mt-2">{item.label}</div>
                  <div className="mt-1 text-[0.72rem] leading-4 text-text-faint">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* TL;DR for GEO — speakable */}
            <div id="tldr" className="mt-8 rounded-xl border border-line bg-surface/60 p-4 sm:p-5">
              <div className="mono mb-3">{t('tldr_title')}</div>
              <ul className="space-y-1.5 text-sm leading-6 text-text-muted">
                <li className="flex gap-2"><span className="text-accent">—</span><span>{t('tldr_b1')}</span></li>
                <li className="flex gap-2"><span className="text-accent">—</span><span>{t('tldr_b2')}</span></li>
                <li className="flex gap-2"><span className="text-accent">—</span><span>{t('tldr_b3')}</span></li>
                <li className="flex gap-2"><span className="text-accent">—</span><span>{t('tldr_b4')}</span></li>
                <li className="flex gap-2"><span className="text-accent">—</span><span>{t('tldr_b5')}</span></li>
              </ul>
            </div>
          </div>

          {/* Right: archival artifact — document, not toy */}
          <div className="relative lg:sticky lg:top-28">
            <div className="artifact-card overflow-hidden rounded-[1.5rem] p-0">
              {/* header rule */}
              <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
                <span className="mono">{t('hero_visual_label')}</span>
                <span className="provenance-stamp">{t('hero_visual_tag')}</span>
              </div>

              {/* paper artifact */}
              <div className="relative bg-paper dark:bg-ink px-6 py-8 sm:px-8 sm:py-10">
                {/* hairline cross */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-hairline opacity-60"></div>
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-hairline opacity-60"></div>

                <div className="relative text-center">
                  <div className="display-title text-[5.5rem] leading-none tracking-[-0.06em] sm:text-[7rem]">
                    <span className="text-ink dark:text-paper">hf</span>
                    <span className="text-text-faint font-light">.pl</span>
                  </div>
                  <div className="mx-auto mt-4 h-px w-20 bg-accent"></div>
                  <div className="mono mt-3">PL-676 • ARCHIVAL • 1996</div>
                  <div className="mx-auto mt-6 max-w-[18rem] text-sm leading-6 text-text-muted">
                    {t('hero_panel_status_body')}
                  </div>
                </div>

                {/* provenance grid */}
                <div className="mt-8 grid grid-cols-3 gap-0 border border-hairline rounded-lg overflow-hidden text-center">
                  <div className="px-3 py-3 border-r border-hairline">
                    <div className="mono">REF</div>
                    <div className="mt-1 text-sm font-semibold">PL-676</div>
                  </div>
                  <div className="px-3 py-3 border-r border-hairline">
                    <div className="mono">REJESTR</div>
                    <div className="mt-1 text-sm font-semibold">NASK</div>
                  </div>
                  <div className="px-3 py-3">
                    <div className="mono">STATUS</div>
                    <div className="mt-1 text-sm font-semibold text-success">{t('badge_live')}</div>
                  </div>
                </div>
              </div>

              {/* footer proof panels — editorial, no hover lift */}
              <div className="grid gap-0 border-t border-hairline sm:grid-cols-3">
                {[['hero_panel_status_title','hero_panel_status_body'],['hero_panel_flex_title','hero_panel_flex_body'],['hero_panel_transfer_title','hero_panel_transfer_body']].map(([tk,bk])=> (
                  <div key={tk} className="border-r border-hairline last:border-r-0 px-4 py-4">
                    <div className="mono text-accent">{t(tk)}</div>
                    <div className="mt-2 text-sm leading-6 text-text-muted">{t(bk)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* archival note under artifact */}
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="mono">NASK • 1996 • PL-676 — {t('provenance_label')}</span>
              <span className="hidden sm:inline mono">{t('hero_status_value')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
