/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';

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

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="market"
      style={{ borderTopColor: 'rgba(230,237,243,0.08)', background: '#070a12' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={container}
    >
      <div className="section-frame will-change-transform" style={{ zIndex: 2 }}>
        <motion.div variants={shouldReduceMotion ? undefined : item} className="border-b pb-6" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
          <div className="eyebrow">{t('market_overline')}</div>
          <h2
            className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.4rem, 1.4rem + 3vw, 3.6rem)' }}
          >
            KOSZT ZNIKA. <span className="text-[#00e5ff]">AKTYWO ZOSTAJE.</span>
          </h2>
          <p
            className="mt-3 max-w-[42rem] font-mono text-[#8a97a8]"
            style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('market_desc')}
          </p>
        </motion.div>
      </div>

      <div className="section-frame grid gap-8 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="overflow-hidden border" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}>
            {signals.map((signal) => (
              <article
                key={signal.titleKey}
                className="evidence-row px-4 py-4"
                style={{ borderTop: '1px solid rgba(230,237,243,0.08)' }}
              >
                <h3 className="font-mono text-[0.88rem] font-bold uppercase tracking-[-0.01em] text-[#e6edf3]">{t(signal.titleKey)}</h3>
                <p
                  className="mt-1 font-mono text-[#8a97a8]"
                  style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {t(signal.bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={container} className="grid gap-6">
          {/* Benchmark — order book header */}
          <motion.section
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden"
            style={{ border: '1px solid rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 sm:px-6"
              style={{ borderBottom: '1px solid rgba(230,237,243,0.08)', background: '#141e30' }}
            >
              <div>
                <p className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575]">{t('benchmark_overline')}</p>
                <h3 className="mt-1 font-mono text-[1.05rem] font-bold uppercase tracking-[-0.02em] text-[#e6edf3]">{t('benchmark_title')}</h3>
              </div>
              <div
                className="border px-2 py-1 font-mono text-[0.60rem] font-bold uppercase tracking-[0.14em] text-[#00e5ff]"
                style={{ borderColor: 'rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.08)', borderRadius: 4 }}
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
                    borderBottom: idx < 2 ? '1px solid rgba(230,237,243,0.06)' : undefined,
                    borderRight: idx % 2 === 0 ? '1px solid rgba(230,237,243,0.06)' : undefined,
                  }}
                >
                  <p className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575]">{t(benchmark.key)}</p>
                  <p className="stat-value mt-2 font-mono text-[1.4rem] leading-none text-[#e6edf3] sm:text-[1.55rem]">{t(benchmark.valueKey)}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Comparison — order book table */}
          <motion.section
            variants={shouldReduceMotion ? undefined : item}
            className="overflow-hidden"
            style={{ border: '1px solid rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
          >
            <div className="px-5 py-4 sm:px-6" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)', background: '#141e30' }}>
              <h3 className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#e6edf3]">{t('comparison_title')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0e1422' }}>
                    <th className="text-left font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575] px-3 py-3" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_col_asset')}
                    </th>
                    <th className="text-left font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575] px-3 py-3" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_col_price')}
                    </th>
                    <th className="text-left font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575] px-3 py-3" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_col_duration')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="market-compare-row will-change-transform">
                    <td className="font-mono text-[#8a97a8] px-3 py-3.5 text-[0.82rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row1_asset')}
                    </td>
                    <td className="font-mono font-semibold text-[#e6edf3] px-3 py-3.5 text-[0.82rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row1_price')}
                    </td>
                    <td className="font-mono text-[#5a6575] px-3 py-3.5 text-[0.78rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row1_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform">
                    <td className="font-mono text-[#8a97a8] px-3 py-3.5 text-[0.82rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row2_asset')}
                    </td>
                    <td className="font-mono font-semibold text-[#e6edf3] px-3 py-3.5 text-[0.82rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row2_price')}
                    </td>
                    <td className="font-mono text-[#5a6575] px-3 py-3.5 text-[0.78rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.06)' }}>
                      {t('comparison_row2_duration')}
                    </td>
                  </tr>
                  <tr className="market-compare-row will-change-transform" style={{ background: 'rgba(0,229,255,0.06)' }}>
                    <td className="font-mono font-bold text-[#e6edf3] px-3 py-3.5 text-[0.82rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_row3_asset')}{' '}
                      <span
                        className="ml-2 inline-flex items-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#070a12] px-1.5 py-0.5"
                        style={{ background: '#ffb700', borderRadius: 4 }}
                      >
                        {t('comparison_row3_badge')}
                      </span>
                    </td>
                    <td className="font-mono font-extrabold px-3 py-3.5 text-[0.82rem] text-[#00e5ff]" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_row3_price')}
                    </td>
                    <td className="font-mono font-medium text-[#e6edf3] px-3 py-3.5 text-[0.78rem]" style={{ borderBottom: '1px solid rgba(230,237,243,0.08)' }}>
                      {t('comparison_row3_duration')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3" style={{ background: '#141e30', borderTop: '1px solid rgba(230,237,243,0.06)' }}>
              <p className="font-mono text-[0.70rem] leading-5 text-[#5a6575] line-clamp-1">{t('comparison_note')}</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.section>
  );
}
