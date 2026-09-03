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
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.25, 1, 0.5, 1] },
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
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.05em] text-ink dark:text-paper"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 1.4rem + 3vw, 4.2rem)' }}
          >
            JEDEN SKRÓT. <span className="text-[#8b1a1a]">WSZYSTKIE MARKI.</span>
          </h2>
          <p
            className="mt-4 max-w-[36rem] font-mono text-[0.78rem] leading-6 text-text-muted"
            style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('why_desc')}
          </p>
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
              className="evidence-row grid gap-3 px-2 py-6 sm:grid-cols-[200px_1fr] sm:items-center sm:px-3"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
            >
              <div
                className="mono pt-1 shrink-0 hidden sm:block"
                style={{ fontSize: '0.60rem', letterSpacing: '0.14em', color: '#8b1a1a' }}
                aria-hidden="true"
              >
                {reason.index} — {reason.title.toUpperCase()}
              </div>
              <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h3
                  className="font-display leading-none tracking-[-0.04em] text-ink dark:text-paper shrink-0"
                  style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '1.8rem', lineHeight: 0.95 }}
                >
                  {reason.title}
                </h3>
                <p
                  className="mt-1 sm:mt-0 max-w-[36rem] text-text-muted"
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {reason.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div variants={shouldReduceMotion ? undefined : item} className="mono mt-4 flex items-center gap-2">
          <span className="h-px w-6 bg-[var(--color-ink)] hidden sm:block" aria-hidden="true" style={{ background: '#080808' }} />
          <span>NASK • 676 • 1996 — {t('provenance_label')}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
