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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="market"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="eyebrow">{t('market_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('market_title')}</h2>
          <p className="section-lead mt-5">{t('market_desc')}</p>

          <div className="mt-8 space-y-0 border-y" style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {signals.map((signal) => (
              <article
                key={signal.titleKey}
                className="evidence-row px-2 py-5"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper">
                  {t(signal.titleKey)}
                </h3>
                <p className="mt-1.5 text-sm leading-7 text-text-muted">{t(signal.bodyKey)}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={container} className="grid gap-6">
          {/* Benchmarks — protocol-card brut: square, 1.5px ink, no rounded, no soft bg */}
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

          {/* Comparison table — editorial anchor, ink header, brutalist borders */}
          <motion.section
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
                    <th
                      className="text-left mono !text-white/70 px-3 py-3"
                      style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}
                    >
                      {t('comparison_col_asset')}
                    </th>
                    <th
                      className="text-left mono !text-white/70 px-3 py-3"
                      style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}
                    >
                      {t('comparison_col_price')}
                    </th>
                    <th
                      className="text-left mono !text-white/70 px-3 py-3"
                      style={{ borderBottom: '1.5px solid #080808', fontSize: '0.62rem' }}
                    >
                      {t('comparison_col_duration')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-text-muted px-3 py-3.5 text-sm"
                      style={{ borderBottom: '1px solid var(--color-hairline)' }}
                    >
                      {t('comparison_row1_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row1_price')}
                    </td>
                    <td
                      className="text-text-faint px-3 py-3.5 text-sm"
                      style={{ borderBottom: '1px solid var(--color-hairline)' }}
                    >
                      {t('comparison_row1_duration')}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-text-muted px-3 py-3.5 text-sm"
                      style={{ borderBottom: '1px solid var(--color-hairline)' }}
                    >
                      {t('comparison_row2_asset')}
                    </td>
                    <td className="font-semibold px-3 py-3.5" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      {t('comparison_row2_price')}
                    </td>
                    <td
                      className="text-text-faint px-3 py-3.5 text-sm"
                      style={{ borderBottom: '1px solid var(--color-hairline)' }}
                    >
                      {t('comparison_row2_duration')}
                    </td>
                  </tr>
                  <tr style={{ background: 'rgba(139,26,26,0.07)' }}>
                    <td
                      className="font-semibold text-ink dark:text-paper px-3 py-3.5 text-sm"
                      style={{ borderBottom: '1.5px solid var(--color-ink)' }}
                    >
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
              <p className="text-xs leading-5 text-text-faint">{t('comparison_note')}</p>
            </div>
          </motion.section>

          <motion.section
            variants={shouldReduceMotion ? undefined : item}
            className="px-6 py-6 sm:px-7 bg-paper dark:bg-surface"
            style={{ border: '1px solid var(--color-hairline)', borderRadius: 0 }}
          >
            <p className="mono">{t('source_title')}</p>
            <p className="mt-2 max-w-[42rem] text-sm leading-7 text-text-muted">{t('source_body')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  className="underline decoration-line-strong underline-offset-4 hover:text-ink mono !normal-case"
                  style={{ textTransform: 'none', letterSpacing: '0.02em', fontSize: '0.78rem' }}
                  href="https://www.dns.pl/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('source_link_1')}
                </a>
              </li>
              <li>
                <a
                  className="underline decoration-line-strong underline-offset-4 hover:text-ink mono !normal-case"
                  style={{ textTransform: 'none', letterSpacing: '0.02em', fontSize: '0.78rem' }}
                  href="https://www.verisign.com/en_US/domain-names/dnib/index.xhtml"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('source_link_2')}
                </a>
              </li>
              <li>
                <a
                  className="underline decoration-line-strong underline-offset-4 hover:text-ink mono !normal-case"
                  style={{ textTransform: 'none', letterSpacing: '0.02em', fontSize: '0.78rem' }}
                  href="https://www.cloudflare.com/learning/dns/what-is-a-domain-name/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('source_link_3')}
                </a>
              </li>
            </ul>
          </motion.section>
        </motion.div>
      </div>
    </motion.section>
  );
}