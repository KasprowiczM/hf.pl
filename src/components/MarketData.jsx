/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const signals = [
  { titleKey: 'market_signal_1_title', bodyKey: 'market_signal_1_body' },
  { titleKey: 'market_signal_2_title', bodyKey: 'market_signal_2_body' },
  { titleKey: 'market_signal_3_title', bodyKey: 'market_signal_3_body' },
];

const benchmarks = [
  { key: 'benchmark_1_label', valueKey: 'benchmark_1_value' },
  { key: 'benchmark_2_label', valueKey: 'benchmark_2_value' },
  { key: 'benchmark_3_label', valueKey: 'benchmark_3_value' },
  { key: 'benchmark_4_label', valueKey: 'benchmark_4_value' },
];

export function MarketData() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (tableRef.current) {
          const rows = tableRef.current.querySelectorAll('.market-compare-row');
          gsap.fromTo(
            rows,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tableRef.current,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.8,
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

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="section-shell hairline-top bg-[#f6f1e8] dark:bg-[#07080a]"
      id="market"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #0a0a0a)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={container}
    >
      <div className="swiss-grid section-frame">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="swiss-content border-b border-[#0a0a0a] pb-6 dark:border-white/15">
          <div className="eyebrow">{t('market_overline')}</div>
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.8rem, 1.6rem + 4vw, 4rem)' }}
          >
            KOSZT ZNIKA. <span className="text-[#e30613] dark:text-[#ff1a2b]">AKTYWO ZOSTAJE.</span>
          </h2>
          <p className="mt-3 max-w-[42rem] font-mono text-[0.76rem] leading-6 tracking-[0.06em] text-[#4a4642] dark:text-[#f6f1e8]/60">
            {t('market_desc')}
          </p>
          <div className="mt-4 h-[2px] w-20 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
        </motion.div>
      </div>

      <div className="section-frame swiss-grid gap-8 pt-8 lg:gap-14">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="col-span-12 lg:col-span-5 max-w-[36rem]">
          <div className="space-y-0 border-y border-[rgba(10,10,10,0.06)] dark:border-white/10" style={{ borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {signals.map((signal) => (
              <article
                key={signal.titleKey}
                className="evidence-row relative overflow-hidden px-2 py-4"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <h3 className="text-[15px] font-bold tracking-[-0.01em] text-[#0a0a0a] dark:text-[#f6f1e8]">{t(signal.titleKey)}</h3>
                <p className="mt-1 font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/65">
                  {t(signal.bodyKey)}
                </p>
                <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-[#e30613] opacity-60 dark:bg-[#ff1a2b]" aria-hidden="true" />
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={container} className="col-span-12 grid gap-6 lg:col-span-7">
          <motion.section
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden bg-[#fdf8ef] dark:bg-[#111418]"
            style={{ border: '1.5px solid var(--color-ink, #0a0a0a)', borderRadius: '4px' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 sm:px-6"
              style={{ borderBottom: '1.5px solid var(--color-ink, #0a0a0a)' }}
            >
              <div>
                <p className="mono text-[#e30613] dark:text-[#ff1a2b]">{t('benchmark_overline')}</p>
                <h3 className="display-title mt-1 text-[1.5rem] leading-tight text-[#0a0a0a] dark:text-[#f6f1e8]">{t('benchmark_title')}</h3>
              </div>
              <div className="swiss-badge">PL-676</div>
            </div>

            <div className="grid grid-cols-2 gap-0">
              {benchmarks.map((benchmark, idx) => (
                <div
                  key={benchmark.key}
                  className="px-4 py-5 sm:px-5"
                  style={{
                    borderBottom: idx < 2 ? '1px solid var(--color-hairline)' : undefined,
                    borderRight: idx % 2 === 0 ? '1px solid var(--color-hairline)' : undefined,
                    background: 'transparent',
                  }}
                >
                  <p className="mono">{t(benchmark.key)}</p>
                  <p className="mt-2 font-display text-[1.6rem] leading-none tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8] sm:text-[1.8rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>{t(benchmark.valueKey)}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={tableRef}
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden bg-[#fdf8ef] dark:bg-[#111418]"
            style={{ border: '1.5px solid var(--color-ink, #0a0a0a)', borderRadius: '4px' }}
          >
            <div className="px-5 py-4 sm:px-6" style={{ borderBottom: '1.5px solid var(--color-ink)', background: '#0a0a0a' }}>
              <h3 className="text-sm font-bold tracking-[-0.01em] text-white">{t('comparison_title')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a0a0a' }}>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #0a0a0a', fontSize: '10px' }}>
                      {t('comparison_col_asset')}
                    </th>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #0a0a0a', fontSize: '10px' }}>
                      {t('comparison_col_price')}
                    </th>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #0a0a0a', fontSize: '10px' }}>
                      {t('comparison_col_duration')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="market-compare-row will-change-transform">
                    <td className="px-3 py-3.5 text-sm text-[#4a4642] dark:text-[#f6f1e8]/70" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5 text-[#0a0a0a] dark:text-[#f6f1e8]" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_price')}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#8a8683]" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform">
                    <td className="px-3 py-3.5 text-sm text-[#4a4642] dark:text-[#f6f1e8]/70" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5 text-[#0a0a0a] dark:text-[#f6f1e8]" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_price')}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#8a8683]" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform" style={{ background: 'rgba(227,6,19,0.06)' }}>
                    <td className="font-bold px-3 py-3.5 text-sm text-[#0a0a0a] dark:text-[#f6f1e8]" style={{ borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_asset')}{' '}
                      <span
                        className="ml-2 inline-flex items-center mono !text-white px-1.5 py-0.5"
                        style={{ background: '#e30613', border: '1px solid #e30613', borderRadius: '4px', fontSize: '10px' }}
                      >
                        {t('comparison_row3_badge')}
                      </span>
                    </td>
                    <td className="font-bold px-3 py-3.5" style={{ color: '#e30613', borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_price')}
                    </td>
                    <td className="font-medium px-3 py-3.5 text-sm text-[#0a0a0a] dark:text-[#f6f1e8]" style={{ borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_duration')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3" style={{ background: 'var(--color-surface, #fdf8ef)', borderTop: '1px solid var(--color-hairline)' }}>
              <p className="text-xs leading-5 text-[#8a8683] line-clamp-1">{t('comparison_note')}</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.section>
  );
}
