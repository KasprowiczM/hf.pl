import { useTranslation } from 'react-i18next';

export function WhySection() {
  const { t } = useTranslation();
  const reasons = Array.from({ length: 6 }, (_, index) => ({
    title: t(`card${index + 1}_title`),
    text: t(`card${index + 1}_text`),
    index: `0${index + 1}`,
  }));

  return (
    <section className="section-shell hairline-top" id="why">
      <div className="section-frame">
        <div className="max-w-[46rem]">
          <div className="eyebrow">{t('why_overline')}</div>
          <h2 className="section-title text-balance">{t('why_title')}</h2>
          <p className="section-lead mt-5">{t('why_desc')}</p>
        </div>

        <div className="mt-10 border-y border-hairline">
          {reasons.map((reason) => (
            <article key={reason.index} className="evidence-row grid gap-4 px-1 py-6 sm:grid-cols-[72px_1fr] sm:items-start sm:px-2">
              <div className="mono pt-1">{reason.index} — ARCHIVAL</div>
              <div>
                <h3 className="display-title text-[1.45rem] leading-tight sm:text-[1.65rem]">{reason.title}</h3>
                <p className="mt-2 max-w-[42rem] text-[0.95rem] leading-7 text-text-muted">{reason.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mono mt-3">NASK • 676 • 1996 — {t('provenance_label')}</div>
      </div>
    </section>
  );
}
