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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="why"
      style={{ borderTopColor: 'rgba(230,237,243,0.08)', background: '#070a12' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[46rem]">
          <div className="eyebrow">{t('why_overline')}</div>
          <h2
            className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.2rem, 1.2rem + 3vw, 3.8rem)' }}
          >
            JEDEN SKRÓT. <span className="text-[#00e5ff]">WSZYSTKIE MARKI.</span>
          </h2>
          <p
            className="mt-4 max-w-[36rem] font-mono leading-6 text-[#8a97a8]"
            style={{ fontSize: '0.76rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('why_desc')}
          </p>
        </motion.div>

        {/* terminal data-dense grid — evidence-row hairline rows */}
        <motion.div
          variants={container}
          className="mt-10 overflow-hidden border"
          style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.index}
              variants={item}
              className="evidence-row grid gap-3 px-4 py-5 sm:grid-cols-[200px_1fr] sm:items-center"
              style={{ borderTop: '1px solid rgba(230,237,243,0.08)' }}
            >
              <div
                className="font-mono pt-1 shrink-0 hidden sm:block"
                style={{ fontSize: '0.60rem', letterSpacing: '0.14em', color: '#00e5ff', fontWeight: 600 }}
                aria-hidden="true"
              >
                {reason.index} — {reason.title.toUpperCase()}
              </div>
              <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h3
                  className="shrink-0 font-mono font-bold uppercase leading-none tracking-[-0.03em] text-[#e6edf3]"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', lineHeight: 1 }}
                >
                  {reason.title}
                </h3>
                <p
                  className="mt-1 sm:mt-0 max-w-[36rem] font-mono text-[#8a97a8]"
                  style={{
                    fontSize: '0.78rem',
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

        <motion.div variants={shouldReduceMotion ? undefined : item} className="mono mt-4 flex items-center gap-2 text-[#5a6575]">
          <span className="h-px w-6 hidden sm:block" aria-hidden="true" style={{ background: 'rgba(230,237,243,0.12)' }} />
          <span>NASK • 676 • 1996 — {t('provenance_label')}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
