import { useTranslation } from 'react-i18next';
import { ArrowDown, Mail } from 'lucide-react';
import heroGraphic from '../assets/hero.png';

const proofPanelKeys = [
  ['hero_panel_status_title', 'hero_panel_status_body'],
  ['hero_panel_flex_title', 'hero_panel_flex_body'],
  ['hero_panel_transfer_title', 'hero_panel_transfer_body'],
];

export function Hero() {
  const { t } = useTranslation();
  const proofItems = [
    { value: t('metric_1_value'), label: t('metric_1_label') },
    { value: t('metric_2_value'), label: t('metric_2_label') },
    { value: t('metric_3_value'), label: t('metric_3_label') },
  ];

  return (
    <section className="section-shell relative overflow-hidden pt-32 sm:pt-36 lg:pt-40" id="hero">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-primary/12 blur-3xl"></div>
        <div className="absolute bottom-[14%] right-[12%] h-56 w-56 rounded-full bg-surface-offset/8 blur-3xl"></div>
      </div>

      <div className="section-frame grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] lg:gap-16">
        <div className="max-w-[40rem]">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            {t('badge')}
          </div>
          <h1 className="display-title text-balance text-[clamp(4.75rem,2.4rem+9vw,10rem)] leading-[0.86]">
            <span className="gold-gradient bg-clip-text text-transparent">{t('domain_prefix')}</span>
            <span className="text-text-faint">.pl</span>
          </h1>
          <p className="mt-6 max-w-[36rem] text-balance text-lg leading-8 text-text-muted sm:text-xl">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="mailto:domain@hf.pl" className="action-pill bg-text text-white no-underline hover:-translate-y-0.5 hover:bg-surface-offset">
              <Mail size={16} />
              {t('cta_offer')}
            </a>
            <a href="#valuation" className="action-pill border border-border bg-white/80 text-text no-underline hover:-translate-y-0.5 hover:border-border-strong hover:bg-white">
              {t('cta_valuation')}
              <ArrowDown size={15} />
            </a>
          </div>
          <p className="mt-5 max-w-[34rem] text-sm leading-7 text-text-muted">{t('hero_note')}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {proofItems.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-border bg-white/72 p-5 shadow-[0_16px_30px_rgba(15,23,34,0.05)]">
                <dt className="text-xs uppercase tracking-[0.18em] text-text-faint">{item.label}</dt>
                <dd className="stat-value mt-3 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-none text-text">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="hero-shadow relative overflow-hidden rounded-[2rem] border border-border bg-surface-offset px-6 py-6 text-white sm:px-8">
            <div className="backdrop-grain absolute inset-0 opacity-80"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.22em] text-white/65">
                <span>{t('hero_visual_label')}</span>
                <span>{t('hero_visual_tag')}</span>
              </div>
              <div className="relative mt-8 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,#1f2a39_0%,#101720_80%)] px-6 py-8 sm:px-8">
                <div className="absolute inset-x-10 top-6 h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] [animation:pulseLine_3.2s_ease-in-out_infinite]"></div>
                <img
                  src={heroGraphic}
                  alt={t('hero_art_alt')}
                  className="mx-auto w-full max-w-[340px] object-contain [animation:drift_8s_ease-in-out_infinite]"
                />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {proofPanelKeys.map(([titleKey, bodyKey]) => (
                  <div key={titleKey} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{t(titleKey)}</p>
                    <p className="mt-2 text-sm leading-6 text-white/78">{t(bodyKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
