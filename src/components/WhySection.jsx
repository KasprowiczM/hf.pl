/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

export function WhySection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const reasons = Array.from({ length: 6 }, (_, index) => ({
    title: t(`card${index + 1}_title`),
    text: t(`card${index + 1}_text`),
    index: `0${index + 1}`,
  }));

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="why"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[46rem]">
          <div className="eyebrow">{t('why_overline')}</div>
          <h2 className="section-title text-balance mt-3" style={{ fontFamily: 'var(--font-display)' }}>
            {t('why_title')}
          </h2>
          <p className="section-lead mt-5">{t('why_desc')}</p>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-10 border-y"
          style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1.5px', borderBottomWidth: '1px' }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.index}
              variants={item}
              className="evidence-row grid gap-4 px-1 py-6 sm:grid-cols-[172px_1fr] sm:items-start sm:px-2"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
            >
              <div
                className="mono pt-1 shrink-0"
                style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: '#8b1a1a' }}
                aria-hidden="true"
              >
                {reason.index} — {reason.title.toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3
                  className="display-title leading-tight text-ink dark:text-paper"
                  style={{ fontSize: '1.55rem', letterSpacing: '-0.03em', lineHeight: 1.05 }}
                >
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-[42rem] text-[0.95rem] leading-7 text-text-muted">
                  {reason.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div variants={shouldReduceMotion ? undefined : item} className="mono mt-3 flex items-center gap-2">
          <span className="h-px w-6 bg-[var(--color-ink)] hidden sm:block" aria-hidden="true" style={{ background: '#080808' }} />
          <span>NASK • 676 • 1996 — {t('provenance_label')}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}