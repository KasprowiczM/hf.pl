/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // horizontal scrub for marquee track
        if (trackRef.current) {
          gsap.to(trackRef.current, {
            xPercent: -22,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          });
        }
        // parallax for evidence rows data-speed
        const rows = gsap.utils.toArray('[data-speed="0.5"]');
        rows.forEach((row) => {
          gsap.to(row, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        });
      }, sectionRef);
    } catch {
      // ignore
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [shouldReduceMotion]);

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
      ref={sectionRef}
      className="section-shell hairline-top overflow-hidden"
      id="usecases"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[34rem]">
          <div className="eyebrow">{t('use_overline')}</div>
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.05em] text-ink dark:text-paper"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.4rem, 1.2rem + 3vw, 4rem)' }}
          >
            JEDEN SKRÓT. <span className="text-[#8b1a1a]">WSZYSTKIE MARKI.</span>
          </h2>
          <p
            className="mt-4 text-text-muted"
            style={{ fontSize: '0.88rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('use_desc')}
          </p>
          <div
            className="mt-5 inline-flex items-center gap-2 border px-3 py-1"
            style={{ borderColor: 'var(--color-ink)', borderWidth: '1px', borderRadius: 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full" aria-hidden="true" style={{ background: '#8b1a1a' }} />
            <span className="mono !text-ink dark:!text-paper" style={{ letterSpacing: '0.14em' }}>
              HF → hf.pl • PARASOL BEZ REBRANDU
            </span>
          </div>
        </motion.div>

        {/* Marquee showcase — horizontal scrub */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="mt-8 overflow-hidden border-y border-[var(--color-hairline)] py-3">
          <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: 'max-content' }}>
            {marqueeTiles.map((tile) => (
              <div
                key={tile.k}
                className="flex min-w-[280px] items-center justify-between border border-[#080808] bg-[#efebe3] px-5 py-5 dark:border-white/15 dark:bg-[#111318] sm:min-w-[360px] sm:px-6"
              >
                <span className="font-display text-[1.7rem] tracking-[-0.04em] text-[#080808] dark:text-[#efebe3] sm:text-[2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                  {tile.k}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8b1a1a]">{tile.sub}</span>
              </div>
            ))}
            <div className="flex min-w-[280px] items-center justify-between border border-dashed border-[#080808]/30 bg-transparent px-5 py-5 sm:min-w-[360px] sm:px-6">
              <span className="font-display text-[1.7rem] tracking-[-0.04em] text-[#080808]/70 dark:text-[#efebe3]/70 sm:text-[2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                YOURS
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/50 dark:text-[#efebe3]/50">Twoja narracja → hf.pl</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-6 grid gap-0 border-y"
          style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}
        >
          {useCasesList.map((useCase) => {
            const domainLabel = useCase.domain || t(useCase.i18nDomainKey);
            return (
              <motion.article
                key={useCase.i18nKey}
                variants={item}
                className="evidence-row flex gap-4 px-2 py-4 items-center"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
                data-speed="0.5"
              >
                <div className="hidden sm:flex shrink-0 w-28 flex-col gap-1">
                  <span className="mono" style={{ color: '#8b1a1a', fontSize: '0.58rem' }}>
                    — {useCase.code}
                  </span>
                  <span className="mono !normal-case" style={{ textTransform: 'none', letterSpacing: '0.06em', fontSize: '0.62rem' }}>
                    {domainLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex items-baseline gap-3">
                  <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper leading-5 shrink-0">
                    {domainLabel} <span className="text-text-faint font-normal">→ hf.pl</span>
                  </h3>
                  <p
                    className="hidden sm:block text-text-muted"
                    style={{ fontSize: '0.88rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {t(useCase.i18nKey)}
                  </p>
                </div>
                <span className="sm:hidden font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#8b1a1a]">{useCase.code}</span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
