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
  const sloganRef = useRef(null);
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
        // pin slogan header
        if (sloganRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=600',
            pin: sloganRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });
          // slogan scale scrub
          gsap.fromTo(
            sloganRef.current,
            { scale: 0.96, opacity: 0.9 },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
              },
            }
          );
        }
        // table rows stagger scrub
        if (tableRef.current) {
          const rows = tableRef.current.querySelectorAll('.market-compare-row');
          gsap.fromTo(
            rows,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
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
      className="section-shell hairline-top"
      id="market"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={container}
    >
      {/* SLOGAN — pinned brutalist */}
      <div ref={sloganRef} className="section-frame will-change-transform" style={{ zIndex: 2 }}>
        <motion.div variants={shouldReduceMotion ? undefined : item} className="border-b border-[#080808] pb-6 dark:border-[#efebe3]/20">
          <div className="eyebrow">{t('market_overline')}</div>
          <h2
            className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#080808] dark:text-[#efebe3]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.8rem, 1.6rem + 4vw, 4rem)' }}
          >
            KOSZT ZNIKA. <span className="text-[#8b1a1a]">AKTYWO ZOSTAJE.</span>
          </h2>
          <p
            className="mt-3 max-w-[42rem] font-mono text-[0.78rem] leading-6 text-[#080808]/60 dark:text-[#efebe3]/60"
            style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('market_desc')}
          </p>
        </motion.div>
      </div>

      <div className="section-frame grid gap-8 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="space-y-0 border-y" style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {signals.map((signal) => (
              <article
                key={signal.titleKey}
                className="evidence-row px-2 py-4"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper">{t(signal.titleKey)}</h3>
                <p
                  className="mt-1 text-text-muted"
                  style={{ fontSize: '0.88rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t(signal.bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={container} className="grid gap-6">
          <motion.section
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden bg-paper dark:bg-surface"
            style={{ border: '1.5px solid var(--color-ink, #080808)', borderRadius: 0 }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 sm:px-6"
              style={{ borderBottom: '1.5px solid var(--color-ink, #080808)' }}
            >
              <div>
                <p className="mono">{t('benchmark_overline')}</p>
                <h3 className="display-title mt-1 text-[1.5rem] leading-tight">{t('benchmark_title')}</h3>
              </div>
              <div
                className="provenance-stamp"
                style={{ borderRadius: 0, borderColor: 'var(--color-ink)', color: '#8b1a1a', borderWidth: '1px' }}
              >
                PL-676
              </div>
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
                  <p className="stat-value mt-2 text-[1.6rem] leading-none sm:text-[1.8rem]">{t(benchmark.valueKey)}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Comparison — punch 3 rows only */}
          <motion.section
            ref={tableRef}
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden bg-paper dark:bg-surface"
            style={{ border: '1.5px solid var(--color-ink, #080808)', borderRadius: 0 }}
          >
            <div className="px-5 py-4 sm:px-6" style={{ borderBottom: '1.5px solid var(--color-ink)', background: '#080808' }}>
              <h3 className="text-sm font-semibold tracking-[-0.01em] text-white">{t('comparison_title')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#080808' }}>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}>
                      {t('comparison_col_asset')}
                    </th>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}>
                      {t('comparison_col_price')}
                    </th>
                    <th className="text-left mono !text-white/70 px-3 py-3" style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}>
                      {t('comparison_col_duration')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="market-compare-row will-change-transform">
                    <td className="text-text-muted px-3 py-3.5 text-sm" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_price')}
                    </td>
                    <td className="text-text-faint px-3 py-3.5 text-sm" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform">
                    <td className="text-text-muted px-3 py-3.5 text-sm" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_price')}
                    </td>
                    <td className="text-text-faint px-3 py-3.5 text-sm" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform" style={{ background: 'rgba(139,26,26,0.07)' }}>
                    <td className="font-semibold text-ink dark:text-paper px-3 py-3.5 text-sm" style={{ borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_asset')}{' '}
                      <span
                        className="ml-2 inline-flex items-center mono !text-white px-1.5 py-0.5"
                        style={{ background: '#8b1a1a', border: '1px solid #8b1a1a', borderRadius: 0, fontSize: '0.58rem' }}
                      >
                        {t('comparison_row3_badge')}
                      </span>
                    </td>
                    <td className="font-bold px-3 py-3.5" style={{ color: '#8b1a1a', borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_price')}
                    </td>
                    <td className="font-medium px-3 py-3.5 text-sm" style={{ borderBottom: '1.5px solid var(--color-ink)' }}>
                      {t('comparison_row3_duration')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3" style={{ background: 'var(--color-surface, #efebe3)', borderTop: '1px solid var(--color-hairline)' }}>
              <p className="text-xs leading-5 text-text-faint line-clamp-1">{t('comparison_note')}</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.section>
  );
}
