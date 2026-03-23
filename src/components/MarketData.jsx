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
    <section className="section-shell section-tone-mid reveal reveal-up" id="market">
      <div className="section-frame grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('market_overline')}</div>
          <h2 className="section-title text-balance">{t('market_title')}</h2>
          <p className="section-lead mt-5">{t('market_desc')}</p>

          <div className="mt-7 space-y-3 sm:mt-10 sm:space-y-5">
            {signals.map((signal, index) => (
              <article
                key={signal.titleKey}
                className="interactive-card hoverable reveal reveal-up rounded-[1.4rem] border border-border bg-surface/90 px-5 py-5"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <h3 className="text-base font-semibold tracking-[-0.02em] text-text">{t(signal.titleKey)}</h3>
                <p className="mt-2 text-sm leading-7 text-text-muted">{t(signal.bodyKey)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6">
          <section className="interactive-card premium-gradient-surface reveal reveal-right rounded-[2rem] border border-border px-5 py-6 text-white sm:px-8 sm:py-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t('benchmark_overline')}</p>
                <h3 className="display-title mt-3 text-[2rem] leading-tight text-white">{t('benchmark_title')}</h3>
              </div>
              <div className="rounded-full border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60">
                hf.pl
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
              {benchmarks.map((benchmark, index) => (
                <div
                  key={benchmark.key}
                  className="interactive-card hoverable reveal reveal-up snapshot-metric rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 sm:px-5 sm:py-5"
                  style={{ transitionDelay: `${120 + index * 65}ms` }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">{t(benchmark.key)}</p>
                  <p className="stat-value mt-3 text-[1.8rem] leading-none sm:text-[2rem]">
                    <span className="gold-gradient bg-clip-text text-transparent">{t(benchmark.valueKey)}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="soft-panel interactive-card reveal reveal-up rounded-[2rem] px-6 py-7 sm:px-8">
            <p className="text-xs uppercase tracking-[0.22em] text-text-faint">{t('source_title')}</p>
            <p className="mt-3 max-w-[42rem] text-sm leading-7 text-text-muted">{t('source_body')}</p>
            <ul className="mt-5 space-y-3 text-sm text-text">
              <li>
                <a className="underline decoration-border-strong underline-offset-4" href="https://www.dns.pl/" target="_blank" rel="noreferrer">
                  {t('source_link_1')}
                </a>
              </li>
              <li>
                <a className="underline decoration-border-strong underline-offset-4" href="https://www.verisign.com/en_US/domain-names/dnib/index.xhtml" target="_blank" rel="noreferrer">
                  {t('source_link_2')}
                </a>
              </li>
              <li>
                <a className="underline decoration-border-strong underline-offset-4" href="https://www.cloudflare.com/learning/dns/what-is-a-domain-name/" target="_blank" rel="noreferrer">
                  {t('source_link_3')}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
