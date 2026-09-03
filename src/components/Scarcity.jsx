/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

export function Scarcity() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const metricRef = useRef(null);
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

  const points = [
    { key: 'sc1', title: '01 — MATEMATYKA REJESTRU' },
    { key: 'sc2', title: '02 — RZADKOŚĆ STRUKTURALNA' },
    { key: 'sc3', title: '03 — BEZ LISTY PORÓWNAWCZEJ' },
    { key: 'sc4', title: '04 — PREMIA POSIADANIA' },
  ];

  return (
    <section className="section-shell hairline-top" id="scarcity" style={{ borderTop: '1px solid rgba(230,237,243,0.08)', background: '#070a12' }}>
      {/* header — not pinned, no overlap */}
      <div className="section-frame" style={{ zIndex: 1 }}>
        <div className="flex flex-wrap items-center gap-3 border-b pb-5" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffb700]">{t('scarcity_overline')}</span>
          <span className="h-px w-6 hidden sm:block" aria-hidden="true" style={{ background: 'rgba(230,237,243,0.14)' }} />
          <h2
            className="font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 1.2rem + 2.6vw, 3.4rem)' }}
          >
            676 ISTNIEJE. <span className="text-[#ff3344]">0 POWSTANIE.</span>
          </h2>
        </div>
      </div>

      <div className="section-frame grid items-start gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10">
        {/* Left — depth chart card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:sticky lg:top-24"
        >
          <div className="artifact-card protocol-card relative overflow-hidden" style={{ borderColor: 'rgba(230,237,243,0.10)', background: '#0e1422', borderRadius: 4 }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: 'rgba(230,237,243,0.08)', background: '#141e30' }}>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8]">NASK • 676 • 1996 — DEPTH CHART</span>
              <span className="border px-2 py-1 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#00e5ff]" style={{ borderColor: 'rgba(0,229,255,0.22)', background: 'rgba(0,229,255,0.08)', borderRadius: 4 }}>ARCHIVAL</span>
            </div>

            <div className="relative px-6 py-8 sm:px-8 sm:py-10">
              {/* subtle grid */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[rgba(230,237,243,0.04)]" />
              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[rgba(230,237,243,0.04)]" />
              <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t" style={{ borderColor: 'rgba(230,237,243,0.08)' }} />
              <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t" style={{ borderColor: 'rgba(230,237,243,0.08)' }} />

              {/* CSS seal — small, terminal */}
              <div
                className="pointer-events-none absolute right-4 top-10 hidden sm:flex h-[88px] w-[88px] items-center justify-center rounded-full border-[1.4px] bg-[rgba(14,20,34,0.9)] sm:right-6"
                style={{ borderColor: '#ff3344', boxShadow: '0 0 16px rgba(255,51,68,0.15)' }}
              >
                <div className="absolute inset-[4px] rounded-full border" style={{ borderColor: 'rgba(255,51,68,0.35)' }} />
                <span className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.08em] text-[#ff3344]">676</span>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <path id="scarcitySealCircleTerminal" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
                  </defs>
                  <text fontSize="5.8" letterSpacing="0.7" fill="#ff3344" fontFamily="JetBrains Mono, monospace">
                    <textPath href="#scarcitySealCircleTerminal" startOffset="0%"> ARCHIWUM • NASK • 1996 • </textPath>
                  </text>
                </svg>
              </div>

              <div ref={metricRef} className="relative">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">{t('scarcity_label')}</p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 origin-left font-mono font-extrabold leading-[0.85] tracking-[-0.06em] text-[#e6edf3]"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(5rem,4rem+8vw,8.5rem)' }}
                  aria-label="676"
                >
                  {count}
                </motion.p>
                <div className="mt-4 h-[2px] w-16 bg-[#00e5ff]" aria-hidden="true" style={{ boxShadow: '0 0 8px rgba(0,229,255,0.5)' }} />
                <p
                  className="mt-4 max-w-[22rem] font-mono text-[#8a97a8]"
                  style={{ fontSize: '0.74rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t('scarcity_avail')}
                </p>
                {/* depth bars — order book visual */}
                <div className="mt-6 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575] w-10">ZAJĘTE</span>
                    <div className="h-1.5 flex-1 rounded-full bg-[rgba(230,237,243,0.08)] overflow-hidden">
                      <div className="h-full bg-[#5a6575]" style={{ width: '98%', borderRadius: 999 }} />
                    </div>
                    <span className="font-mono text-[0.62rem] text-[#8a97a8]">662</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#00e5ff] w-10">WOLNE</span>
                    <div className="h-1.5 flex-1 rounded-full bg-[rgba(230,237,243,0.08)] overflow-hidden">
                      <div className="h-full bg-[#00e5ff]" style={{ width: '2.1%', boxShadow: '0 0 6px rgba(0,229,255,0.6)', borderRadius: 999 }} />
                    </div>
                    <span className="font-mono text-[0.62rem] font-bold text-[#00e5ff]">~14</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-px w-6" aria-hidden="true" style={{ background: 'rgba(230,237,243,0.14)' }} />
                <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575]">PL-676 — {t('provenance_label')}</span>
              </div>

              <div className="mt-7 grid grid-cols-3 border text-center text-[0.60rem]" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4 }}>
                <div className="border-r px-2 py-2" style={{ borderColor: 'rgba(230,237,243,0.08)', background: 'rgba(20,30,48,0.5)' }}>
                  <div className="font-mono uppercase tracking-[0.12em] text-[#5a6575]">Nr</div>
                  <div className="font-mono font-semibold text-[#e6edf3]">676/1996</div>
                </div>
                <div className="border-r px-2 py-2" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
                  <div className="font-mono uppercase tracking-[0.12em] text-[#5a6575]">Rejestr</div>
                  <div className="font-mono font-semibold text-[#e6edf3]">NASK</div>
                </div>
                <div className="px-2 py-2" style={{ background: 'rgba(0,229,255,0.06)' }}>
                  <div className="font-mono uppercase tracking-[0.12em] text-[#5a6575]">Karta</div>
                  <div className="font-mono font-bold text-[#00e5ff]">PL-676</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 hidden font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575] lg:block">NASK • 676 • 1996 — {t('provenance_value')}</p>
        </motion.div>

        {/* Right — terminal rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffb700]">
            {t('scarcity_overline')}
          </motion.div>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#5a6575]"
          >
            Limit wpisany w matematykę. Nie w marketing.
          </motion.h3>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-6 overflow-hidden border" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}>
            {points.map((point) => (
              <motion.article
                key={point.key}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="grid gap-2 border-b px-4 py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-center"
                style={{ borderColor: 'rgba(230,237,243,0.06)' }}
              >
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#00e5ff]">{point.title}</span>
                <span
                  className="font-mono text-[#8a97a8]"
                  style={{ fontSize: '0.78rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t(point.key)}
                </span>
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
            className="mt-4 font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575]"
          >
            NASK • 676 • 1996 — {t('provenance_value')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
