/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion';

const cases = [
  { code: 'HEALTH', domain: 'healthfitness.pl', i18nKey: 'uc1' },
  { code: 'FINANCE', domain: 'hubfinansowy.pl', i18nKey: 'uc2' },
  { code: 'FASHION', domain: 'highfashion.pl', i18nKey: 'uc3' },
  { code: 'FUTURE', domain: 'humanfuture.pl', i18nKey: 'uc4' },
  { code: 'FIRM', domain: 'handelfirma.pl', i18nKey: 'uc5' },
  { code: 'YOURS', i18nDomainKey: 'uc6_domain', i18nKey: 'uc6' },
];

const marquee = [
  { k: 'FINANCE', sub: 'hf.capital → hf.pl' },
  { k: 'HEALTH', sub: 'hf.health → hf.pl' },
  { k: 'FASHION', sub: 'hf.studio → hf.pl' },
];

export function UseCases() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      id="usecases"
      className="section-shell hairline-top overflow-hidden bg-[var(--color-paper)]"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={item} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('use_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 1.2rem + 2.6vw, 3.4rem)', letterSpacing: '-0.05em', lineHeight: 0.9 }}
          >
            Jeden skrót.
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">Wszystkie narracje.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15px] leading-7 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {t('use_desc')}
          </p>
          <div className="mx-auto mt-6 inline-flex items-center gap-2 border border-[var(--color-hairline)] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-stone)]" aria-hidden="true" />
            <span className="mono !text-[var(--color-ink)]">HF → hf.pl • Parasol bez rebrandu</span>
          </div>
        </motion.div>

        {/* marquee — gallery minimal, no scrub, just subtle */}
        <motion.div variants={item} className="mt-10 overflow-hidden border-y border-[var(--color-hairline)] py-3">
          <motion.div
            className="flex gap-3 will-change-transform"
            style={{ width: 'max-content' }}
            animate={shouldReduceMotion ? undefined : { x: [0, -40, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[...marquee, ...marquee].map((tile, idx) => (
              <div key={`${tile.k}-${idx}`} className="flex min-w-[280px] items-center justify-between border border-[var(--color-hairline)] bg-[var(--color-surface)] px-5 py-4 sm:min-w-[320px]">
                <span className="font-display text-[1.35rem] tracking-[-0.03em] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>{tile.k}</span>
                <span className="mono !text-[var(--color-stone-strong)]">{tile.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* cases — hairline minimal rows */}
        <motion.div variants={container} className="gallery-inner mt-8 border-y border-[var(--color-hairline)]">
          {cases.map((c) => {
            const domain = c.domain || t(c.i18nDomainKey);
            return (
              <motion.article key={c.i18nKey} variants={item} className="flex items-center gap-4 border-t border-[var(--color-hairline)] px-2 py-4 first:border-t-0 sm:px-3 sm:py-5">
                <div className="hidden sm:block shrink-0 w-24">
                  <span className="mono !text-[var(--color-stone-strong)]">— {c.code}</span>
                </div>
                <h3 className="shrink-0 text-[0.95rem] font-medium tracking-[-0.01em] text-[var(--color-ink)]">
                  {domain} <span className="font-normal text-[var(--color-text-faint)]">→ hf.pl</span>
                </h3>
                <p className="hidden sm:block flex-1 text-[14px] leading-6 text-[var(--color-text-muted)] line-clamp-1 min-w-0" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t(c.i18nKey)}
                </p>
                <span className="sm:hidden ml-auto mono !text-[var(--color-stone-strong)]">{c.code}</span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
