import { useTranslation } from 'react-i18next';

export function Scarcity() {
  const { t } = useTranslation();
  const points = ['sc1', 'sc2', 'sc3', 'sc4'];

  return (
    <section className="section-shell bg-white/35" id="scarcity">
      <div className="section-frame grid items-center gap-12 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
        <div className="soft-panel rounded-[2rem] p-8 sm:p-10">
          <div className="mx-auto aspect-square max-w-[360px] rounded-full border border-primary/20 bg-[radial-gradient(circle,#f7efe1_0%,#ebdfcf_58%,#e3d3bf_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(140,92,47,0.06)]">
            <div className="flex h-full flex-col items-center justify-center rounded-full border border-primary/20 bg-white/65 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-text-faint">{t('scarcity_label')}</p>
              <p className="stat-value mt-3 text-[clamp(4rem,2.8rem+5vw,5.4rem)] leading-none text-primary">676</p>
              <p className="mt-4 max-w-[14rem] text-sm leading-7 text-text-muted">{t('scarcity_avail')}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="eyebrow">{t('scarcity_overline')}</div>
          <h2 className="section-title text-balance">{t('scarcity_title')}</h2>
          <ul className="mt-8 space-y-4">
            {points.map((point, index) => (
              <li key={point} className="grid gap-3 rounded-[1.4rem] border border-border bg-white/78 px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start">
                <span className="text-xs uppercase tracking-[0.22em] text-primary">0{index + 1}</span>
                <span className="text-sm leading-7 text-text-muted sm:text-base">{t(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
