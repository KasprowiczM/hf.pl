/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Scarcity() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const sloganRef = useRef(null);
  const metricRef = useRef(null);
  const countRef = useRef(null);
  const sealRef = useRef(null);
  const animationRef = useRef(0);
  const [count, setCount] = useState(676);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!metricRef.current) return undefined;
    const animateCount = () => {
      if (hasAnimated) return;
      setHasAnimated(true);
      const duration = 1100;
      const start = performance.now();
      const startValue = 220;
      const targetValue = 676;
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = Math.round(startValue + (targetValue - startValue) * eased);
        setCount(next);
        if (progress < 1) {
          animationRef.current = window.requestAnimationFrame(tick);
        }
      };
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      animationRef.current = window.requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateCount();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(metricRef.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // pin slogan
        if (sloganRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=700',
            pin: sloganRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }
        // 676 scale 0.8 -> 1.1 scrub
        if (countRef.current) {
          gsap.fromTo(
            countRef.current,
            { scale: 0.8 },
            {
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
        // red seal rotate scrub
        if (sealRef.current) {
          gsap.to(sealRef.current, {
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
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

  const points = [
    { key: 'sc1', title: '01 — MATEMATYKA REJESTRU' },
    { key: 'sc2', title: '02 — RZADKOŚĆ STRUKTURALNA' },
    { key: 'sc3', title: '03 — BEZ LISTY PORÓWNAWCZEJ' },
    { key: 'sc4', title: '04 — PREMIA POSIADANIA' },
  ];

  return (
    <section ref={sectionRef} className="section-shell bg-[#efebe3] hairline-top dark:bg-[#080808]" id="scarcity" style={{ borderTop: '1px solid rgba(8,8,8,0.12)' }}>
      {/* Pinned slogan */}
      <div ref={sloganRef} className="section-frame will-change-transform" style={{ zIndex: 1 }}>
        <div className="flex flex-wrap items-center gap-3 border-b border-[#080808] pb-5 dark:border-white/15">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#8b1a1a]">{t('scarcity_overline')}</span>
          <span className="h-px w-6 bg-[#080808] dark:bg-[#efebe3]/40 hidden sm:block" aria-hidden="true" />
          <h2
            className="font-display leading-[0.85] tracking-[-0.05em] text-[#080808] dark:text-[#efebe3]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.2rem, 1.4rem + 2.8vw, 3.8rem)' }}
          >
            676 ISTNIEJE. <span className="text-[#8b1a1a]">0 POWSTANIE.</span>
          </h2>
        </div>
      </div>

      <div className="section-frame grid items-start gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10">
        {/* Left — protocol-card stamp */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:sticky lg:top-24"
        >
          <div className="artifact-card protocol-card relative overflow-hidden border border-[#080808] bg-[#efebe3] p-0 dark:border-white/15 dark:bg-[#111318]">
            <div className="flex items-center justify-between border-b border-[#080808] px-5 py-3 dark:border-white/15">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#080808] dark:text-[#efebe3]/70">NASK • 676 • 1996</span>
              <span className="border border-[#080808] px-2 py-1 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#080808] dark:border-white/20 dark:text-[#efebe3]">ARCHIVAL</span>
            </div>

            <div className="relative px-6 py-8 sm:px-8 sm:py-10">
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[#080808]/10 dark:bg-white/10"></div>
              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[#080808]/10 dark:bg-white/10"></div>
              <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[#080808]/25 dark:border-white/20"></span>
              <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[#080808]/25 dark:border-white/20"></span>
              <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[#080808]/25 dark:border-white/20"></span>
              <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#080808]/25 dark:border-white/20"></span>

              <div
                ref={sealRef}
                className="pointer-events-none absolute right-4 top-12 hidden sm:flex h-[94px] w-[94px] items-center justify-center rounded-full border-[1.4px] border-[#8b1a1a] bg-[#efebe3]/60 backdrop-blur-[1px] dark:bg-[#080808]/40 sm:right-6 will-change-transform"
              >
                <div className="absolute inset-[4px] rounded-full border border-[#8b1a1a]/45"></div>
                <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.08em] text-[#8b1a1a]">676</span>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <path id="scarcitySealCircle" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
                  </defs>
                  <text fontSize="5.8" letterSpacing="0.7" fill="#8b1a1a" fontFamily="monospace">
                    <textPath href="#scarcitySealCircle" startOffset="0%"> ARCHIWUM • NASK • 1996 • </textPath>
                  </text>
                </svg>
              </div>

              <div ref={metricRef} className="relative">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#080808]/60 dark:text-[#efebe3]/50">{t('scarcity_label')}</p>
                <motion.p
                  ref={countRef}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 origin-left will-change-transform font-display leading-[0.85] tracking-[-0.06em] text-[#080808] dark:text-[#efebe3]"
                  style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(5rem,4rem+8vw,9rem)' }}
                  aria-label="676"
                >
                  {count}
                </motion.p>
                <div className="mt-4 h-[2px] w-16 bg-[#8b1a1a]" aria-hidden="true" />
                <p
                  className="mt-4 max-w-[22rem] font-mono text-[#080808]/65 dark:text-[#efebe3]/65"
                  style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t('scarcity_avail')}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-px w-6 bg-[#080808] dark:bg-[#efebe3]" aria-hidden="true" />
                <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/50 dark:text-[#efebe3]/40">PL-676 — {t('provenance_label')}</span>
              </div>

              <div className="mt-7 grid grid-cols-3 border border-[#080808] text-center text-[0.60rem] dark:border-white/15">
                <div className="border-r border-[#080808] px-2 py-2 dark:border-white/15">
                  <div className="font-mono uppercase tracking-[0.12em] text-[#080808]/40 dark:text-[#efebe3]/40">Nr</div>
                  <div className="font-mono font-semibold text-[#080808] dark:text-[#efebe3]">676/1996</div>
                </div>
                <div className="border-r border-[#080808] px-2 py-2 dark:border-white/15">
                  <div className="font-mono uppercase tracking-[0.12em] text-[#080808]/40 dark:text-[#efebe3]/40">Rejestr</div>
                  <div className="font-mono font-semibold text-[#080808] dark:text-[#efebe3]">NASK</div>
                </div>
                <div className="px-2 py-2">
                  <div className="font-mono uppercase tracking-[0.12em] text-[#080808]/40 dark:text-[#efebe3]/40">Karta</div>
                  <div className="font-mono font-semibold text-[#8b1a1a]">PL-676</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 hidden font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/40 dark:text-[#efebe3]/40 lg:block">NASK • 676 • 1996 — {t('provenance_value')}</p>
        </motion.div>

        {/* Right — evidence rows punchy 1 line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#8b1a1a]">
            {t('scarcity_overline')}
          </motion.div>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#080808]/60 dark:text-[#efebe3]/50"
          >
            Limit wpisany w matematykę. Nie w marketing.
          </motion.h3>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-6 border-y border-[#080808] dark:border-white/15">
            {points.map((point) => (
              <motion.article
                key={point.key}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="grid gap-2 border-b border-[#080808]/10 px-2 py-5 last:border-b-0 dark:border-white/10 sm:grid-cols-[172px_1fr] sm:items-center"
              >
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8b1a1a]">{point.title}</span>
                <span
                  className="font-mono text-[#080808]/70 dark:text-[#efebe3]/70"
                  style={{ fontSize: '0.80rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t(point.key)}
                </span>
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
            className="mt-4 font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/40 dark:text-[#efebe3]/40"
          >
            NASK • 676 • 1996 — {t('provenance_value')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
