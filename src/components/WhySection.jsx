import { useTranslation } from 'react-i18next';

export function WhySection() {
  const { t } = useTranslation();
  const reasons = Array.from({ length: 6 }, (_, index) => ({
    title: t(`card${index + 1}_title`),
    text: t(`card${index + 1}_text`),
    index: `0${index + 1}`,
  }));

  return (
    <section className="section-shell section-tone-mid reveal reveal-up" id="why">
      <div className="section-frame">
        <div className="max-w-[46rem]">
          <div className="eyebrow">{t('why_overline')}</div>
          <h2 className="section-title text-balance">{t('why_title')}</h2>
          <p className="section-lead mt-5">{t('why_desc')}</p>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border/60 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.index} className="interactive-card reveal reveal-up bg-surface/92 px-6 py-8 sm:px-8">
              <p className="text-xs uppercase tracking-[0.22em] text-text-faint">{reason.index}</p>
              <h3 className="display-title mt-4 sm:mt-5 text-[1.55rem] sm:text-[1.85rem] leading-tight">
                <span className="gold-gradient bg-clip-text text-transparent">{reason.title}</span>
              </h3>
              <p className="mt-4 text-base leading-7 text-text-muted">{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
