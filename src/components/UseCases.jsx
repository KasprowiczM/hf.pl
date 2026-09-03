/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

const useCasesList = [
  { domain: 'healthfitness.pl', i18nKey: 'uc1', code: 'HEALTH', accent: 'FINANCE' },
  { domain: 'hubfinansowy.pl', i18nKey: 'uc2', code: 'FINANCE', accent: 'FASHION' },
  { domain: 'highfashion.pl', i18nKey: 'uc3', code: 'FASHION', accent: 'FUTURE' },
  { domain: 'humanfuture.pl', i18nKey: 'uc4', code: 'FUTURE', accent: 'FIRM' },
  { domain: 'handelfirma.pl', i18nKey: 'uc5', code: 'FIRM', accent: 'FORM' },
  { i18nDomainKey: 'uc6_domain', i18nKey: 'uc6', code: 'YOURS', accent: 'HF.PL' },
];

const marqueeTiles = [
  { k: 'FINANCE', sub: 'hf.capital → hf.pl' },
  { k: 'HEALTH', sub: 'hf.health → hf.pl' },
  { k: 'FASHION', sub: 'hf.studio → hf.pl' },
];

export function UseCases() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top overflow-hidden"
      id="usecases"
      style={{ borderTopColor: 'rgba(230,237,243,0.08)', background: '#070a12' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[34rem]">
          <div className="eyebrow">{t('use_overline')}</div>
          <h2
            className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.2rem, 1.2rem + 2.8vw, 3.6rem)' }}
          >
            JEDEN SKRÓT. <span className="text-[#00e5ff]">WSZYSTKIE MARKI.</span>
          </h2>
          <p
            className="mt-4 font-mono text-[#8a97a8]"
            style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('use_desc')}
          </p>
          <div
            className="mt-5 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffb700]"
            style={{ borderColor: 'rgba(255,183,0,0.22)', background: 'rgba(255,183,0,0.08)', borderRadius: 4 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb700]" aria-hidden="true" />
            HF → hf.pl • PARASOL BEZ REBRANDU
          </div>
        </motion.div>

        {/* marquee showcase — terminal horizontal tick */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="mt-8 overflow-hidden border-y py-3" style={{ borderColor: 'rgba(230,237,243,0.06)' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {marqueeTiles.map((tile) => (
              <div
                key={tile.k}
                className="flex min-w-[280px] items-center justify-between border px-5 py-4 sm:min-w-[360px] sm:px-6"
                style={{ borderColor: 'rgba(230,237,243,0.08)', background: '#0e1422', borderRadius: 4 }}
              >
                <span className="font-mono text-[1.4rem] font-extrabold tracking-[-0.03em] text-[#e6edf3] sm:text-[1.6rem]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {tile.k}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#00e5ff]">{tile.sub}</span>
              </div>
            ))}
            <div className="flex min-w-[280px] items-center justify-between border border-dashed px-5 py-4 sm:min-w-[360px] sm:px-6" style={{ borderColor: 'rgba(230,237,243,0.12)', borderRadius: 4 }}>
              <span className="font-mono text-[1.4rem] font-bold tracking-[-0.03em] text-[#8a97a8] sm:text-[1.6rem]" style={{ fontFamily: 'var(--font-mono)' }}>
                YOURS
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">Twoja narracja → hf.pl</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-6 grid gap-0 overflow-hidden border"
          style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
        >
          {useCasesList.map((useCase) => {
            const domainLabel = useCase.domain || t(useCase.i18nDomainKey);
            return (
              <motion.article
                key={useCase.i18nKey}
                variants={item}
                className="evidence-row flex gap-4 px-4 py-4 items-center"
                style={{ borderTop: '1px solid rgba(230,237,243,0.08)' }}
              >
                <div className="hidden sm:flex shrink-0 w-28 flex-col gap-1">
                  <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">
                    — {useCase.code}
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.06em] text-[#5a6575]" style={{ textTransform: 'none', letterSpacing: '0.06em' }}>
                    {domainLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex items-baseline gap-3">
                  <h3 className="text-[0.92rem] font-semibold tracking-[-0.01em] text-[#e6edf3] leading-5 shrink-0 font-mono">
                    {domainLabel} <span className="text-[#5a6575] font-normal">→ hf.pl</span>
                  </h3>
                  <p
                    className="hidden sm:block font-mono text-[#8a97a8]"
                    style={{ fontSize: '0.76rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {t(useCase.i18nKey)}
                  </p>
                </div>
                <span className="sm:hidden font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#00e5ff]">{useCase.code}</span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
