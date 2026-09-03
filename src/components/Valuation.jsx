/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Valuation() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

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
      id="valuation"
      className="section-shell hairline-top bg-[var(--color-surface)]/40"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={item} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('val_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 1.2rem + 2.4vw, 3.2rem)', letterSpacing: '-0.05em', lineHeight: 0.88 }}
          >
            Miesiąc reklamy — 30 dni.
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">hf.pl — 20 lat.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-[15px] leading-7 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {t('val_note')}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[var(--color-stone)]" aria-hidden="true" />
        </motion.div>

        {/* centered paper card 480px — gallery valuation */}
        <motion.div
          variants={item}
          className="gallery-card mt-10 overflow-hidden will-change-transform"
          style={{ background: 'var(--color-paper)', borderColor: 'var(--color-hairline)' }}
        >
          <div className="flex items-center justify-between border-b border-[var(--color-hairline)] bg-[var(--color-surface)] px-5 py-3 sm:px-6">
            <span className="mono">{t('val_label')}</span>
            <span className="mono !text-[var(--color-text-faint)] tracking-[0.12em]">NASK • 676 • 1996</span>
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <p
                className="font-display leading-none tracking-[-0.04em] text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 2.9rem)' }}
              >
                {t('val_price')}
              </p>
              <motion.span
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.04, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0 inline-flex items-center rounded-full bg-[var(--color-stone)] px-2.5 py-1 font-mono text-[0.58rem] font-medium tracking-[0.10em] text-white"
              >
                7 DNI
              </motion.span>
            </div>
            <p className="mono mt-2 !tracking-[0.10em]">WARTOŚĆ ARCHIWALNA NETTO</p>
            <p className="mono mt-1 !text-[var(--color-stone-strong)]">{t('val_cta_sub')}</p>

            <div className="mt-5 h-px w-full bg-[var(--color-hairline)]" aria-hidden="true" />

            <div className="divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)] mt-4 -mx-5 sm:-mx-7">
              {terms.map((term, idx) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + idx * 0.06, ease: [0.25, 1, 0.5, 1] }}
                  className="flex gap-3 px-5 py-3 sm:px-7"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-stone)]" aria-hidden="true" />
                  <span className="text-[14px] leading-6 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {t(term)}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { y: 0 }}
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'valuation', target: 'contact' })}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3 text-[0.82rem] font-medium tracking-[-0.01em] text-[var(--color-paper)] no-underline hover:opacity-90 transition-opacity"
            >
              {t('val_cta')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </motion.a>
            <p className="mono mt-3 text-center">Odpowiedź w 24h • NDA • Protokół przekazania</p>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--color-hairline)] pt-3">
              <span className="mono !text-[0.56rem]">PL-676 • Nr 676/1996</span>
              <span className="mono !text-[0.56rem]">PODPIS ————————</span>
            </div>
          </div>
        </motion.div>

        <motion.p variants={item} className="mono mt-6 text-center">
          NASK • 676 • {t('val_label')} — {t('provenance_label')}
        </motion.p>
      </div>
    </motion.section>
  );
}
