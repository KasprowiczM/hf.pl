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
  const pinWrapperRef = useRef(null);
  const countWrapRef = useRef(null);
  const countRef = useRef(null);
  const sealRef = useRef(null);
  const animationRef = useRef(0);
  const [count, setCount] = useState(676);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countWrapRef.current) return undefined;
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
    observer.observe(countWrapRef.current);
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
        // pin ONLY scarcity WORD (676) wrapper — pinSpacing true, trigger is wrapper (no overlap)
        if (pinWrapperRef.current && countWrapRef.current) {
          ScrollTrigger.create({
            trigger: pinWrapperRef.current,
            start: 'top top',
            end: '+=720',
            pin: countWrapRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 2,
          });
        }
        // 676 scale scrub
        if (countRef.current) {
          gsap.fromTo(
            countRef.current,
            { scale: 0.86 },
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
    <section ref={sectionRef} className="section-shell bg-[#f6f1e8] hairline-top dark:bg-[#0a0a0a]" id="scarcity" style={{ borderTop: '1px solid rgba(10,10,10,0.08)', minHeight: '110vh' }}>
      {/* Swiss header — pin not whole section, just WORD inside */}
      <div className="section-frame">
        <div className="swiss-grid border-b border-[#0a0a0a] pb-5 dark:border-white/15">
          <div className="col-span-12 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">{t('scarcity_overline')}</span>
            <span className="h-px w-6 bg-[#0a0a0a] dark:bg-[#fdf8ef]/40 hidden sm:block" aria-hidden="true" />
            <h2
              className="font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#fdf8ef]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.2rem, 1.4rem + 2.8vw, 3.8rem)' }}
            >
              676 ISTNIEJE. <span className="text-[#e30613] dark:text-[#ff1a2b] underline decoration-[#e30613] decoration-2 underline-offset-4 dark:decoration-[#ff1a2b]">0 POWSTANIE.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="section-frame swiss-grid items-start gap-8 pt-8 lg:gap-14">
        {/* Left — pin-wrapper: WORD pinned, spacer prevents overlap */}
        <div ref={pinWrapperRef} className="pin-wrapper col-span-12 lg:col-span-6" style={{ minHeight: '280px' }}>
          <motion.div
            ref={countWrapRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="will-change-transform"
          >
            <div className="artifact-card relative overflow-hidden border border-[rgba(10,10,10,0.08)] bg-[#fdf8ef] p-0 dark:border-white/10 dark:bg-[#141414]" style={{ borderRadius: '4px' }}>
              <div className="flex items-center justify-between border-b border-[rgba(10,10,10,0.08)] px-5 py-3 dark:border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a8683]">NASK • 676 • 1996</span>
                <span className="border border-[#0a0a0a] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a] dark:border-white/20 dark:text-[#fdf8ef]" style={{ borderRadius: '4px' }}>ARCHIVAL</span>
              </div>

              <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[rgba(10,10,10,0.06)] dark:bg-white/10"></div>
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[rgba(10,10,10,0.06)] dark:bg-white/10"></div>
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>

                <div
                  ref={sealRef}
                  className="pointer-events-none absolute right-4 top-12 hidden sm:flex h-[94px] w-[94px] items-center justify-center rounded-full border-[1.4px] border-[#e30613] bg-[#fdf8ef]/60 backdrop-blur-[1px] dark:bg-[#0a0a0a]/40 dark:border-[#ff1a2b] sm:right-6 will-change-transform"
                >
                  <div className="absolute inset-[4px] rounded-full border border-[#e30613]/45 dark:border-[#ff1a2b]/45"></div>
                  <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.08em] text-[#e30613] dark:text-[#ff1a2b]">676</span>
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                      <path id="scarcitySealCircle" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
                    </defs>
                    <text fontSize="5.8" letterSpacing="0.7" fill="#e30613" fontFamily="monospace">
                      <textPath href="#scarcitySealCircle" startOffset="0%"> ARCHIWUM • NASK • 1996 • </textPath>
                    </text>
                  </svg>
                </div>

                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a8683]">{t('scarcity_label')}</p>
                  <motion.p
                    ref={countRef}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 origin-left will-change-transform font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#fdf8ef]"
                    style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(5rem,4rem+8vw,9rem)' }}
                    aria-label="676"
                  >
                    {count}
                  </motion.p>
                  <div className="mt-4 h-[2px] w-16 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
                  <p className="mt-4 max-w-[22rem] font-mono text-[0.74rem] leading-6 tracking-[0.04em] text-[#4a4642] dark:text-[#fdf8ef]/65">
                    {t('scarcity_avail')}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-px w-6 bg-[#0a0a0a] dark:bg-[#fdf8ef] hidden sm:block" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8683]">PL-676 — {t('provenance_label')}</span>
                </div>

                <div className="mt-7 grid grid-cols-3 border border-[rgba(10,10,10,0.08)] text-center text-[0.60rem] dark:border-white/10" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="border-r border-[rgba(10,10,10,0.08)] px-2 py-2 dark:border-white/10">
                    <div className="font-mono uppercase tracking-[0.12em] text-[#8a8683]">Nr</div>
                    <div className="font-mono font-bold text-[#0a0a0a] dark:text-[#fdf8ef]">676/1996</div>
                  </div>
                  <div className="border-r border-[rgba(10,10,10,0.08)] px-2 py-2 dark:border-white/10">
                    <div className="font-mono uppercase tracking-[0.12em] text-[#8a8683]">Rejestr</div>
                    <div className="font-mono font-bold text-[#0a0a0a] dark:text-[#fdf8ef]">NASK</div>
                  </div>
                  <div className="px-2 py-2">
                    <div className="font-mono uppercase tracking-[0.12em] text-[#8a8683]">Karta</div>
                    <div className="font-mono font-bold text-[#e30613] dark:text-[#ff1a2b]">PL-676</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8683] lg:block">NASK • 676 • 1996 — {t('provenance_value')}</p>
          </motion.div>
        </div>

        {/* Right — evidence rows punchy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="col-span-12 lg:col-span-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">
            {t('scarcity_overline')}
          </motion.div>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#4a4642] dark:text-[#fdf8ef]/50"
          >
            Limit wpisany w matematykę. Nie w marketing.
          </motion.h3>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-6 border-y border-[#0a0a0a] dark:border-white/15">
            {points.map((point) => (
              <motion.article
                key={point.key}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="evidence-row grid gap-2 border-b border-[rgba(10,10,10,0.06)] px-2 py-5 last:border-b-0 dark:border-white/10 sm:grid-cols-[172px_1fr] sm:items-center"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#e30613] dark:text-[#ff1a2b]">{point.title}</span>
                <span className="font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#fdf8ef]/65">
                  {t(point.key)}
                </span>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.42 } } }} className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a8683]">
            <span className="h-px w-6 bg-[#0a0a0a]/15 dark:bg-white/15 hidden sm:block" aria-hidden="true" />
            <span>DODRUK = 0 • PL-676 — ARCHIWUM NASK</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
