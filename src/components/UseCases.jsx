/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="usecases"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-12">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[34rem]">
          <div className="eyebrow">{t('use_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('use_title')}</h2>
          <p className="section-lead mt-5">{t('use_desc')}</p>
          <div
            className="mt-6 inline-flex items-center gap-2 border px-3 py-1"
            style={{ borderColor: 'var(--color-ink)', borderWidth: '1px', borderRadius: 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full" aria-hidden="true" style={{ background: '#8b1a1a' }} />
            <span className="mono !text-ink dark:!text-paper" style={{ letterSpacing: '0.14em' }}>
              HF → hf.pl • PARASOL BEZ REBRANDU
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="grid gap-0 border-y"
          style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}
        >
          {useCasesList.map((useCase) => {
            const domainLabel = useCase.domain || t(useCase.i18nDomainKey);
            return (
              <motion.article
                key={useCase.i18nKey}
                variants={item}
                className="evidence-row flex gap-4 px-2 py-5 items-start"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <div className="hidden sm:flex shrink-0 w-32 flex-col gap-1 pt-1">
                  <span className="mono" style={{ color: '#8b1a1a', fontSize: '0.62rem' }}>
                    — HF.PL
                  </span>
                  <span className="mono !normal-case" style={{ textTransform: 'none', letterSpacing: '0.06em', fontSize: '0.62rem' }}>
                    {domainLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper leading-5">
                    {domainLabel} <span className="text-text-faint font-normal">→ hf.pl</span>
                  </h3>
                  <p className="mono mt-1" style={{ color: '#8b1a1a', fontSize: '0.62rem' }}>
                    {t('use_case_maps_to')} hf.pl
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{t(useCase.i18nKey)}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}