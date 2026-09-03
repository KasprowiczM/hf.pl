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
            { yPercent: 92, opacity: 0 },
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
            { scale: 0.94 },
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
    <section ref={sectionRef} className="section-shell bg-[#0a0a0a] text-[#f6f1e8] hairline-top overflow-hidden" id="valuation" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Swiss poster valuation — price 35-40k huge red on paper */}
      <div className="section-frame swiss-grid gap-8 lg:items-start lg:gap-14">
        {/* Left — slogan split — Swiss */}
        <motion.div
          ref={sloganRef}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="col-span-12 will-change-transform lg:col-span-5 max-w-[36rem]"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">{t('val_overline')}</div>
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#f6f1e8]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.2rem, 1.4rem + 3vw, 3.8rem)' }}
          >
            <span className="val-slogan-line block overflow-hidden">
              <span className="block">MIESIĄC REKLAMY — 30 DNI.</span>
            </span>
            <span className="val-slogan-line block overflow-hidden text-[#e30613]">
              <span className="block">HF.PL — 20 LAT.</span>
            </span>
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-[#e30613]" aria-hidden="true" />
          <p className="mt-4 max-w-[42rem] font-mono text-[0.78rem] leading-6 tracking-[0.04em] text-white/60">
            {t('val_note')}
          </p>
          <p className="mt-4 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/25 lg:block">NASK • 676 • {t('val_label')} — {t('provenance_label')}</p>
          <div className="mt-6 hidden h-px w-full max-w-[28rem] bg-white/10 lg:block"></div>
          <p className="mt-3 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/25 lg:block">Nr 676/1996 • PROTOKÓŁ WYCENY • PL-676</p>
        </motion.div>

        {/* Right — Swiss poster paper card — valuation poster */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="col-span-12 lg:col-span-7 will-change-transform"
        >
          <div className="swiss-card--ink overflow-hidden border border-[#fdf8ef]/18 bg-[#fdf8ef] text-[#0a0a0a] shadow-[0_0_0_1px_rgba(253,248,239,0.06)]" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between border-b border-[rgba(10,10,10,0.08)] bg-[#fdf8ef] px-5 py-3 sm:px-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8683]">{t('val_label')} • NETTO</span>
              <span className="border border-[#0a0a0a] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]" style={{ borderRadius: '4px' }}>NASK • 676 • 1996</span>
            </div>

            <div className="px-5 py-6 sm:px-6 sm:py-7">
              {/* poster price — huge red on paper — Swiss poster spec */}
              <div className="flex items-start justify-between gap-3">
                <motion.p
                  ref={priceRef}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="poster-price will-change-transform"
                >
                  {t('val_price')}
                </motion.p>
                <motion.span
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                  transition={shouldReduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="shrink-0 inline-flex items-center border border-[#e30613] bg-transparent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#e30613]"
                  style={{ borderRadius: '4px' }}
                >
                  7 DNI
                </motion.span>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8683]">WARTOŚĆ ARCHIWALNA NETTO • PL-676</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-[#e30613]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#e30613]">{t('val_cta_sub')}</span>
              </div>

              <div className="mt-5 h-px w-full bg-[rgba(10,10,10,0.08)]"></div>

              <div className="border-y border-[#0a0a0a] mt-4">
                {terms.map((term, idx) => (
                  <motion.div
                    key={term}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.12 + idx * 0.06 }}
                    className="flex gap-3 border-b border-[rgba(10,10,10,0.06)] px-1 py-3 last:border-b-0"
                  >
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e30613]" aria-hidden="true" />
                    <span className="font-mono text-[0.76rem] leading-6 tracking-[0.02em] text-[#4a4642]">
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
                className="mt-6 flex w-full items-center justify-center gap-2 border border-[#0a0a0a] bg-[#0a0a0a] px-5 py-3 font-mono text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#f6f1e8] no-underline hover:bg-transparent hover:text-[#0a0a0a]"
                style={{ borderRadius: '4px' }}
              >
                {t('val_cta')}
                <ArrowUpRight size={16} aria-hidden="true" />
              </motion.a>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8683]">Odpowiedź w 24h • NDA • 7 DNI • Protokół przekazania</p>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-[rgba(10,10,10,0.10)] pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8683]">PL-676 • Nr 676/1996</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8683]">PODPIS ————————</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
