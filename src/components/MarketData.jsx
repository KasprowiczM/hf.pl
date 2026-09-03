/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion';

export function MarketData() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

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

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      id="market"
      className="section-shell hairline-top bg-[var(--color-paper)]"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        {/* centered quote */}
        <motion.div variants={item} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('market_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 3.6rem)', letterSpacing: '-0.05em', lineHeight: 0.88 }}
          >
            Koszt znika.
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">Aktywo zostaje.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] mono normal-case !tracking-[0.04em] !text-[13px] leading-6 text-[var(--color-text-muted)]" style={{ textTransform: 'none' }}>
            {t('market_desc')}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[var(--color-stone)]" aria-hidden="true" />
        </motion.div>

        {/* 3 metrics — minimal centered */}
        <motion.div variants={container} className="gallery-inner mt-12 grid gap-0 border-y border-[var(--color-hairline)] sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-hairline)]">
          {signals.map((s) => (
            <motion.article key={s.titleKey} variants={item} className="px-4 py-7 text-center sm:px-5">
              <h3 className="mono !text-[var(--color-ink)] tracking-[0.14em]">{t(s.titleKey)}</h3>
              <p className="mt-2 text-[14px] leading-6 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {t(s.bodyKey)}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* benchmarks — gallery minimal 2x2, thin */}
        <motion.div variants={item} className="gallery-inner mt-10 overflow-hidden border border-[var(--color-hairline)]">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-[var(--color-hairline)] bg-[var(--color-surface)]/60">
            <div>
              <p className="mono">{t('benchmark_overline')}</p>
              <h3 className="font-display text-[1.4rem] leading-none tracking-[-0.03em] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>{t('benchmark_title')}</h3>
            </div>
            <span className="provenance-stamp">PL-676</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-hairline)]">
            {benchmarks.map((b) => (
              <div key={b.key} className="px-4 py-5 sm:px-6 sm:py-6 bg-[var(--color-paper)]">
                <p className="mono">{t(b.key)}</p>
                <p className="mt-2 font-display text-[1.35rem] leading-none tracking-[-0.04em] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>{t(b.valueKey)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* comparison — single minimal quote, gallery style */}
        <motion.div variants={item} className="gallery-inner mt-6 border border-[var(--color-hairline)] overflow-hidden">
          <div className="bg-[var(--color-ink)] px-5 py-3.5 sm:px-6">
            <h3 className="mono !text-white/70 tracking-[0.16em]">{t('comparison_title')}</h3>
          </div>
          <div className="divide-y divide-[var(--color-hairline)] bg-[var(--color-paper)]">
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
              <span className="text-sm text-[var(--color-text-muted)]">{t('comparison_row1_asset')}</span>
              <span className="text-sm font-medium text-[var(--color-ink)]">{t('comparison_row1_price')}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
              <span className="text-sm text-[var(--color-text-muted)]">{t('comparison_row2_asset')}</span>
              <span className="text-sm font-medium text-[var(--color-ink)]">{t('comparison_row2_price')}</span>
            </div>
            <div className="flex items-center justify-between bg-[var(--color-stone-soft)] px-4 py-3.5 sm:px-5">
              <span className="text-sm font-medium text-[var(--color-ink)]">{t('comparison_row3_asset')} <span className="ml-2 mono !text-white bg-[var(--color-stone)] px-1.5 py-0.5 !text-[0.58rem]">REKOMENDOWANE</span></span>
              <span className="text-sm font-medium text-[var(--color-stone-strong)]">{t('comparison_row3_price')}</span>
            </div>
          </div>
          <div className="border-t border-[var(--color-hairline)] bg-[var(--color-surface)] px-5 py-3">
            <p className="mono normal-case !tracking-[0.04em] leading-5" style={{ textTransform: 'none' }}>{t('comparison_note')}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
