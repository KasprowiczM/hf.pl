/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Valuation() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const sloganRef = useRef(null);
  const priceRef = useRef(null);
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (sloganRef.current) {
          gsap.fromTo(
            sloganRef.current.querySelectorAll('.val-slogan-line'),
            { yPercent: 90, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 45%',
                scrub: 0.9,
              },
            }
          );
        }
        if (priceRef.current) {
          gsap.fromTo(
            priceRef.current,
            { scale: 0.92 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: priceRef.current,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    } catch {
      // ignore
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="section-shell bg-[#080808] text-[#efebe3] hairline-top" id="valuation" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="section-frame grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14 lg:px-10">
        {/* Left — slogan split */}
        <motion.div
          ref={sloganRef}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-[36rem] will-change-transform"
        >
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">{t('val_overline')}</div>
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.05em] text-[#efebe3]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.2rem, 1.4rem + 3vw, 3.8rem)' }}
          >
            <span className="val-slogan-line block overflow-hidden">
              <span className="block">MIEJSIĄC REKLAMY — 30 DNI.</span>
            </span>
            <span className="val-slogan-line block overflow-hidden text-[#c93434]">
              <span className="block">HF.PL — 20 LAT.</span>
            </span>
          </h2>
          <p
            className="mt-4 max-w-[42rem] font-mono text-white/65"
            style={{ fontSize: '0.80rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('val_note')}
          </p>
          <p className="mt-4 hidden font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/25 lg:block">NASK • 676 • {t('val_label')} — {t('provenance_label')}</p>
          <div className="mt-6 hidden h-px w-full max-w-[28rem] bg-white/10 lg:block"></div>
          <p className="mt-3 hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/30 lg:block">Nr 676/1996 • PROTOKÓŁ WYCENY • PL-676</p>
        </motion.div>

        {/* Right — paper protocol-card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="artifact-card protocol-card overflow-hidden border border-white/15 bg-[#efebe3] text-[#080808] dark:border-white/15 will-change-transform"
        >
          <div className="flex items-center justify-between border-b border-[#080808] bg-[#efebe3] px-5 py-3 sm:px-6">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/60">{t('val_label')}</span>
            <span className="border border-[#080808] px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808]">NASK • 676 • 1996</span>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <motion.p
                ref={priceRef}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="font-display leading-none tracking-[-0.04em] text-[#080808] will-change-transform"
                style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.6rem, 1.8rem + 3.5vw, 3.8rem)' }}
              >
                {t('val_price')}
              </motion.p>
              {/* 7-day urgency badge pulsing */}
              <motion.span
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0 inline-flex items-center border border-[#8b1a1a] bg-[#8b1a1a] px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white"
              >
                7 DNI
              </motion.span>
            </div>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/45">WARTOŚĆ ARCHIWALNA NETTO</p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#8b1a1a]">{t('val_cta_sub')}</p>

            <div className="mt-4 h-px w-full bg-[#080808]/10"></div>

            <div className="border-y border-[#080808]">
              {terms.map((term, idx) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + idx * 0.06 }}
                  className="flex gap-3 border-b border-[#080808]/10 px-1 py-3 last:border-b-0"
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b1a1a]" aria-hidden="true" />
                  <span
                    className="font-mono text-[#080808]/70"
                    style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
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
              className="mt-6 flex w-full items-center justify-center gap-2 border border-[#080808] bg-[#080808] px-5 py-3 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#efebe3] no-underline hover:bg-transparent hover:text-[#080808]"
            >
              {t('val_cta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </motion.a>
            <p className="mt-3 text-center font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/40">Odpowiedź w 24h • NDA • 7 DNI • Protokół przekazania</p>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#080808]/15 pt-3">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#080808]/30">PL-676 • Nr 676/1996</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#080808]/30">PODPIS ————————</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
