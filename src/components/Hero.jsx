/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Hero() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const metrics = [
    { value: t('metric_1_value'), label: t('metric_1_label'), sub: t('metric_1_sub') },
    { value: t('metric_2_value'), label: t('metric_2_label'), sub: t('metric_2_sub') },
    { value: t('metric_3_value'), label: t('metric_3_label'), sub: t('metric_3_sub') },
  ];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.14 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100vh] flex-col bg-[var(--color-paper)]"
      aria-label="Hero"
    >
      {/* subtle top provenance rule — gallery */}
      <div className="pointer-events-none absolute inset-x-0 top-[56px] h-px bg-[var(--color-hairline)] hidden sm:block" aria-hidden="true" />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: parallaxY, opacity: opacityFade }}
        className="flex flex-1 flex-col will-change-transform"
      >
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-[96px] sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="gallery-inner flex flex-col items-center text-center"
          >
            {/* provenance — tiny mono 9px */}
            <motion.p variants={item} className="mono tracking-[0.18em] text-[var(--color-text-faint)]">
              NASK • ARCHIWUM PL-676 • 1996 — 1 Z 676
            </motion.p>

            {/* hf.pl — Instrument Serif 9–10rem gallery hero */}
            <motion.div variants={item} className="artifact-card mt-8 sm:mt-10 w-full max-w-[560px] px-6 py-8 sm:px-10 sm:py-10 will-change-transform" style={{ borderColor: 'rgba(10,10,10,0.06)', background: 'var(--color-surface)' }}>
              <h1
                className="hero-display text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.06em', lineHeight: 0.82 }}
                aria-label="hf.pl"
              >
                hf
                <span className="align-super text-[0.28em] font-normal tracking-[0.18em] text-[var(--color-text-faint)]" style={{ fontFamily: 'var(--font-mono)', verticalAlign: 'super', marginLeft: '0.06em' }}>
                  .PL
                </span>
              </h1>
              <div className="mx-auto mt-4 h-px w-12 bg-[var(--color-stone)]" aria-hidden="true" />
              <p className="mono mt-3 tracking-[0.16em]">PL-676 • ARCHIVAL • 1996</p>
            </motion.div>

            {/* slogan — huge serif, gallery quote */}
            <motion.h2
              variants={item}
              className="mt-10 max-w-[640px] font-display text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 1.6rem + 3vw, 4rem)', letterSpacing: '-0.06em', lineHeight: 0.82 }}
            >
              2 LITERY.
              <br />
              <span className="text-[var(--color-stone-strong)]">0 KONKURENCJI.</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="serif-italic mt-4 max-w-[28rem] text-[1.05rem] leading-7 text-[var(--color-text-muted)] sm:text-[1.15rem]"
            >
              Długie nazwy giną. Krótkie zostają.
            </motion.p>

            {/* stone hairline */}
            <motion.div variants={item} className="mt-6 h-px w-8 bg-[var(--color-stone)]" aria-hidden="true" />

            <motion.p variants={item} className="mono mt-4 max-w-[30rem] normal-case tracking-[0.06em] text-[0.66rem] leading-5 text-[var(--color-text-muted)]" style={{ letterSpacing: '0.04em', textTransform: 'none' }}>
              {t('hero_subtitle_accent')}
            </motion.p>

            {/* CTAs — minimal gallery: primary pill + ghost link */}
            <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-7 py-3 text-[0.78rem] font-medium tracking-[-0.01em] text-[var(--color-paper)] no-underline hover:bg-[var(--color-ink)]/90 transition-colors"
              >
                Sprawdź dostępność — 24h
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <a
                href="#valuation"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
                className="inline-flex items-center justify-center px-5 py-3 text-[0.78rem] font-medium tracking-[-0.01em] text-[var(--color-text-muted)] underline decoration-[var(--color-line-strong)] underline-offset-4 hover:text-[var(--color-ink)] hover:decoration-[var(--color-ink)] transition-colors no-underline"
              >
                Zobacz wycenę
              </a>
            </motion.div>

            <motion.p variants={item} className="mono mt-3 normal-case" style={{ letterSpacing: '0.08em', textTransform: 'none' }}>
              {t('cta_offer_sub')}
            </motion.p>
          </motion.div>
        </div>

        {/* proof 3 metrics — hairline centered, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.9 }}
          className="border-t border-[var(--color-hairline)] bg-[var(--color-paper)]"
        >
          <div className="section-frame">
            <div className="mx-auto grid max-w-[760px] grid-cols-3 divide-x divide-[var(--color-hairline)]">
              {metrics.map((m) => (
                <div key={m.label} className="px-3 py-6 text-center sm:px-6 sm:py-7">
                  <div className="font-display text-[1.9rem] leading-none tracking-[-0.05em] text-[var(--color-ink)] sm:text-[2.35rem]" style={{ fontFamily: 'var(--font-display)' }}>
                    {m.value}
                  </div>
                  <div className="mono mt-2 !text-[var(--color-ink)] tracking-[0.14em]">{m.label}</div>
                  <div className="mono mt-1 normal-case !tracking-[0.04em] !text-[0.64rem] opacity-70" style={{ textTransform: 'none' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
