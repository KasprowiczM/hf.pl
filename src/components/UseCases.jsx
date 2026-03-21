import { useTranslation } from 'react-i18next';

const useCasesList = [
  { domain: 'healthfitness.pl', i18nKey: 'uc1' },
  { domain: 'hubfinansowy.pl', i18nKey: 'uc2' },
  { domain: 'highfashion.pl', i18nKey: 'uc3' },
  { domain: 'humanfuture.pl', i18nKey: 'uc4' },
  { domain: 'handelfirma.pl', i18nKey: 'uc5' },
  { i18nDomainKey: 'uc6_domain', i18nKey: 'uc6' },
];

export function UseCases() {
  const { t } = useTranslation();

  return (
    <section className="section-shell bg-white/35" id="usecases">
      <div className="section-frame grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16">
        <div className="max-w-[34rem]">
          <div className="eyebrow">{t('use_overline')}</div>
          <h2 className="section-title text-balance">{t('use_title')}</h2>
          <p className="section-lead mt-5">{t('use_desc')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {useCasesList.map((useCase) => (
            <article
              key={useCase.i18nKey}
              className="rounded-[1.6rem] border border-border bg-white/80 px-5 py-6 shadow-[0_18px_30px_rgba(15,23,34,0.04)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-text-faint">{t('use_case_label')}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-text">
                {useCase.domain || t(useCase.i18nDomainKey)}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{t(useCase.i18nKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
