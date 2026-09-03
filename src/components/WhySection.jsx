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
    numBg: `${index + 1}`,
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
      className="section-shell hairline-top bg-[#f6f1e8] dark:bg-[#0a0a0a]"
      id="why"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #0a0a0a)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        {/* Swiss header: 12col, content col-span 8 offset 2 */}
        <div className="swiss-grid">
          <motion.div variants={shouldReduceMotion ? undefined : item} className="swiss-content max-w-[46rem]">
            <div className="eyebrow">{t('why_overline')}</div>
            <h2
              className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#fdf8ef]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 1.4rem + 3vw, 4.2rem)' }}
            >
              DŁUGIE GINĄ. <span className="text-[#e30613] dark:text-[#ff1a2b]">KRÓTKIE ZOSTAJĄ.</span>
            </h2>
            <p className="mt-4 max-w-[36rem] font-mono text-[0.76rem] leading-6 tracking-[0.06em] text-[#4a4642] dark:text-[#fdf8ef]/60">
              {t('why_desc')}
            </p>
            <div className="mt-5 h-[2px] w-20 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Swiss rows — 12col grid per row, number huge 5rem faint behind */}
        <motion.div
          variants={container}
          className="mt-10 border-y border-[rgba(10,10,10,0.06)] dark:border-white/10"
          style={{ borderTopWidth: '1.5px', borderBottomWidth: '1px' }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.index}
              variants={item}
              className="evidence-row relative grid gap-3 overflow-hidden px-2 py-6 sm:grid-cols-[200px_1fr] sm:items-center sm:px-4"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
            >
              {/* huge number faint behind */}
              <span className="swiss-number-bg left-2 top-1 hidden sm:block" aria-hidden="true">
                {reason.numBg}
              </span>
              <div className="mono relative pt-1 shrink-0 hidden sm:block" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#e30613' }} aria-hidden="true">
                {reason.index} — <span className="text-[#8a8683]">{reason.title.toUpperCase()}</span>
              </div>
              <div className="relative min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h3
                  className="font-display shrink-0 leading-none tracking-[-0.06em] text-[#0a0a0a] dark:text-[#fdf8ef]"
                  style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '1.85rem', lineHeight: 0.95 }}
                >
                  {reason.title}
                </h3>
                <p className="mt-1 max-w-[36rem] font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#fdf8ef]/65 sm:mt-0">
                  {reason.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div variants={shouldReduceMotion ? undefined : item} className="swiss-grid mt-4">
          <div className="swiss-content flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8683]">
            <span className="h-px w-6 bg-[#0a0a0a] dark:bg-[#fdf8ef]/50 hidden sm:block" aria-hidden="true" />
            <span className="provenance">NASK • 676 • 1996 — {t('provenance_label')}</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
