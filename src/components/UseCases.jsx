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
    <section className="section-shell hairline-top" id="usecases">
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-12">
        <div className="max-w-[34rem]">
          <div className="eyebrow">{t('use_overline')}</div>
          <h2 className="section-title text-balance">{t('use_title')}</h2>
          <p className="section-lead mt-5">{t('use_desc')}</p>
          <div className="mt-6 inline-flex items-center gap-2 border border-line px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            <span className="mono">HF → hf.pl • parasol bez rebrandu</span>
          </div>
        </div>

        <div className="grid gap-0 border-y border-hairline">
          {useCasesList.map((useCase) => (
            <article key={useCase.i18nKey} className="evidence-row flex gap-4 px-2 py-5">
              <div className="hidden sm:block mono pt-1 shrink-0 w-28">— HF.PL</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper">
                  {useCase.domain || t(useCase.i18nDomainKey)} <span className="text-text-faint font-normal">→ hf.pl</span>
                </h3>
                <p className="mono mt-1 text-accent">{t('use_case_maps_to')} hf.pl</p>
                <p className="mt-2 text-sm leading-6 text-text-muted">{t(useCase.i18nKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
