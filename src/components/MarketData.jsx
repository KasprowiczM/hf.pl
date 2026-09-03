import { useTranslation } from 'react-i18next';

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

  return (
    <section className="section-shell hairline-top" id="market">
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('market_overline')}</div>
          <h2 className="section-title text-balance">{t('market_title')}</h2>
          <p className="section-lead mt-5">{t('market_desc')}</p>

          <div className="mt-8 space-y-0 border-y border-hairline">
            {signals.map((signal) => (
              <article key={signal.titleKey} className="evidence-row px-2 py-5">
                <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-ink dark:text-paper">{t(signal.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-7 text-text-muted">{t(signal.bodyKey)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <section className="artifact-card rounded-[1.25rem] p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6">
              <div>
                <p className="mono">{t('benchmark_overline')}</p>
                <h3 className="display-title mt-1 text-[1.5rem] leading-tight">{t('benchmark_title')}</h3>
              </div>
              <div className="provenance-stamp">PL-676</div>
            </div>

            <div className="grid grid-cols-2 gap-0">
              {benchmarks.map((benchmark) => (
                <div key={benchmark.key} className="border-b border-r border-hairline last:border-r-0 even:border-r-0 px-4 py-5 sm:px-5 even:bg-surface/50">
                  <p className="mono">{t(benchmark.key)}</p>
                  <p className="stat-value mt-2 text-[1.6rem] leading-none sm:text-[1.8rem]">{t(benchmark.valueKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison table — editorial anchor */}
          <section className="artifact-card rounded-[1.25rem] overflow-hidden">
            <div className="px-5 py-4 sm:px-6 border-b border-hairline">
              <h3 className="text-sm font-semibold tracking-[-0.01em]">{t('comparison_title')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>{t('comparison_col_asset')}</th>
                    <th>{t('comparison_col_price')}</th>
                    <th>{t('comparison_col_duration')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-text-muted">{t('comparison_row1_asset')}</td>
                    <td className="font-semibold">{t('comparison_row1_price')}</td>
                    <td className="text-text-faint">{t('comparison_row1_duration')}</td>
                  </tr>
                  <tr>
                    <td className="text-text-muted">{t('comparison_row2_asset')}</td>
                    <td className="font-semibold">{t('comparison_row2_price')}</td>
                    <td className="text-text-faint">{t('comparison_row2_duration')}</td>
                  </tr>
                  <tr className="bg-accent-soft">
                    <td className="font-semibold text-ink dark:text-paper">{t('comparison_row3_asset')} <span className="ml-2 inline-flex provenance-stamp bg-accent text-white border-accent">{t('comparison_row3_badge')}</span></td>
                    <td className="font-bold text-accent">{t('comparison_row3_price')}</td>
                    <td className="font-medium">{t('comparison_row3_duration')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-surface/50 border-t border-hairline">
              <p className="text-xs leading-5 text-text-faint">{t('comparison_note')}</p>
            </div>
          </section>

          <section className="border border-hairline rounded-[1.25rem] px-6 py-6 sm:px-7 bg-surface/30">
            <p className="mono">{t('source_title')}</p>
            <p className="mt-2 max-w-[42rem] text-sm leading-7 text-text-muted">{t('source_body')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="underline decoration-line-strong underline-offset-4 hover:text-ink" href="https://www.dns.pl/" target="_blank" rel="noreferrer">{t('source_link_1')}</a></li>
              <li><a className="underline decoration-line-strong underline-offset-4 hover:text-ink" href="https://www.verisign.com/en_US/domain-names/dnib/index.xhtml" target="_blank" rel="noreferrer">{t('source_link_2')}</a></li>
              <li><a className="underline decoration-line-strong underline-offset-4 hover:text-ink" href="https://www.cloudflare.com/learning/dns/what-is-a-domain-name/" target="_blank" rel="noreferrer">{t('source_link_3')}</a></li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
