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
        if (trackRef.current) {
          gsap.to(trackRef.current, {
            xPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          });
        }
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
      className="section-shell hairline-top overflow-hidden bg-[#f6f1e8] dark:bg-[#07080a]"
      id="usecases"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #0a0a0a)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame">
        <div className="swiss-grid">
          <motion.div variants={shouldReduceMotion ? undefined : item} className="swiss-content max-w-[34rem]">
            <div className="eyebrow">{t('use_overline')}</div>
            <h2
              className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.4rem, 1.2rem + 3vw, 4rem)' }}
            >
              JEDEN SKRÓT. <span className="text-[#e30613] dark:text-[#ff1a2b]">WSZYSTKIE MARKI.</span>
            </h2>
            <p className="mt-4 font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/65">
              {t('use_desc')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 border border-[rgba(10,10,10,0.08)] bg-white px-3 py-2 dark:border-white/10 dark:bg-[#111418]" style={{ borderRadius: '4px' }}>
              <span className="signal-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a0a0a] dark:text-[#f6f1e8]">HF → hf.pl • PARASOL BEZ REBRANDU</span>
            </div>
          </motion.div>
        </div>

        {/* Marquee showcase — Swiss signal red badge outline, scrub */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="mt-8 overflow-hidden border-y border-[rgba(10,10,10,0.06)] py-3 dark:border-white/10">
          <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: 'max-content' }}>
            {marqueeTiles.map((tile) => (
              <div
                key={tile.k}
                className="flex min-w-[280px] items-center justify-between border border-[rgba(10,10,10,0.08)] bg-[#fdf8ef] px-5 py-5 dark:border-white/10 dark:bg-[#111418] sm:min-w-[360px] sm:px-6"
                style={{ borderRadius: '4px' }}
              >
                <span className="font-display text-[1.7rem] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8] sm:text-[2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                  {tile.k}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#e30613] dark:text-[#ff1a2b]">{tile.sub}</span>
              </div>
            ))}
            <div className="flex min-w-[280px] items-center justify-between border border-dashed border-[rgba(10,10,10,0.18)] bg-transparent px-5 py-5 sm:min-w-[360px] sm:px-6" style={{ borderRadius: '4px' }}>
              <span className="font-display text-[1.7rem] tracking-[-0.06em] text-[#0a0a0a]/70 dark:text-[#f6f1e8]/70 sm:text-[2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                YOURS
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8683]">Twoja narracja → hf.pl</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-6 grid gap-0 border-y border-[rgba(10,10,10,0.06)] dark:border-white/10"
          style={{ borderTopWidth: '1px', borderBottomWidth: '1px' }}
        >
          {useCasesList.map((useCase) => {
            const domainLabel = useCase.domain || t(useCase.i18nDomainKey);
            return (
              <motion.article
                key={useCase.i18nKey}
                variants={item}
                className="evidence-row flex gap-4 px-2 py-4 items-center"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <div className="hidden sm:flex shrink-0 w-28 flex-col gap-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">
                    — {useCase.code}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.06em] text-[#8a8683]" style={{ textTransform: 'none', letterSpacing: '0.06em' }}>
                    {domainLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex items-baseline gap-3">
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#0a0a0a] dark:text-[#f6f1e8] leading-5 shrink-0" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700 }}>
                    {domainLabel} <span className="text-[#8a8683] font-normal">→ hf.pl</span>
                  </h3>
                  <p className="hidden sm:block font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/60 line-clamp-1">
                    {t(useCase.i18nKey)}
                  </p>
                </div>
                <span className="sm:hidden font-mono text-[10px] uppercase tracking-[0.12em] text-[#e30613] dark:text-[#ff1a2b]">{useCase.code}</span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
