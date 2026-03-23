import { useTranslation } from 'react-i18next';

const faqKeys = [1, 2, 3];

export function FAQ() {
  const { t } = useTranslation();

  return (
    <section className="section-shell section-tone-mid reveal reveal-up" id="faq">
      <div className="section-frame grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('faq_overline')}</div>
          <h2 className="section-title text-balance">{t('faq_title')}</h2>
          <p className="section-lead mt-5">{t('faq_desc')}</p>
        </div>

        <div className="space-y-4">
          {faqKeys.map((key) => (
            <details key={key} className="interactive-card reveal reveal-up rounded-[1.4rem] border border-border bg-surface/90 px-5 py-5 open:border-border-strong open:bg-surface">
              <summary className="cursor-pointer list-none text-base font-semibold tracking-[-0.02em] text-text">
                {t(`faq${key}_q`)}
              </summary>
              <p className="mt-4 text-sm leading-7 text-text-muted">{t(`faq${key}_a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
