/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion';

export function WhySection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const stories = [
    { num: '01', title: t('card1_title'), text: t('card1_text') },
    { num: '02', title: t('card2_title'), text: t('card2_text') },
    { num: '03', title: t('card3_title'), text: t('card3_text') },
  ];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      id="why"
      className="section-shell hairline-top bg-[var(--color-paper)]"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={item} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('why_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 3.5rem)', letterSpacing: '-0.05em', lineHeight: 0.9 }}
          >
            Jeden skrót.
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">Wszystkie marki.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-7 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {t('why_desc')}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[var(--color-stone)]" aria-hidden="true" />
        </motion.div>

        {/* single column 3 stories — massive faint numbers behind text */}
        <motion.div variants={container} className="gallery-inner mt-16 sm:mt-20">
          {stories.map((story) => (
            <motion.article
              key={story.num}
              variants={item}
              className="relative border-t border-[var(--color-hairline)] px-1 py-10 sm:px-2 sm:py-12 first:border-t-0"
            >
              {/* faint 5rem serif number behind */}
              <span
                className="pointer-events-none absolute left-0 top-6 select-none font-display leading-none tracking-[-0.05em] text-[var(--color-hairline)] sm:left-1 sm:top-8"
                style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', opacity: 0.9, color: 'rgba(10,10,10,0.045)' }}
                aria-hidden="true"
              >
                {story.num}
              </span>
              <div className="relative ml-0 sm:ml-[4.5rem]">
                <div className="mono mb-2 !tracking-[0.16em] text-[var(--color-stone-strong)]">{story.num} — {story.title.toUpperCase()}</div>
                <h3 className="font-display text-[1.55rem] leading-tight tracking-[-0.03em] text-[var(--color-ink)] sm:text-[1.75rem]" style={{ fontFamily: 'var(--font-display)' }}>
                  {story.title}
                </h3>
                <p className="mt-3 max-w-[36rem] text-[15px] leading-7 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {story.text}
                </p>
              </div>
            </motion.article>
          ))}

          <motion.div variants={item} className="mt-8 flex justify-center">
            <span className="mono tracking-[0.14em]">NASK • 676 • 1996 — {t('provenance_label')}</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
