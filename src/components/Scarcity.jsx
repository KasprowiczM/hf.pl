import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Scarcity() {
  const { t } = useTranslation();
  const metricRef = useRef(null);
  const animationRef = useRef(0);
  const [count, setCount] = useState(676);

  useEffect(() => {
    if (!metricRef.current) return undefined;

    const animateCount = () => {
      const duration = 1200;
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
      { threshold: 0.35 },
    );

    observer.observe(metricRef.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const points = ['sc1', 'sc2', 'sc3', 'sc4'];

  return (
    <section className="section-shell hairline-top reveal reveal-up" id="scarcity">
      <div className="section-frame grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Left — archival document number */}
        <div className="lg:sticky lg:top-24">
          <div className="border-y border-hairline py-8 sm:py-10">
            <div className="flex items-center justify-between">
              <span className="mono">NASK • 676 • 1996</span>
              <span className="provenance-stamp">ARCHIVAL</span>
            </div>

            <div ref={metricRef} className="mt-6">
              <p className="mono">{t('scarcity_label')}</p>
              <p
                className="stat-value mt-2 text-[clamp(5rem,4rem+8vw,9rem)] leading-[0.85] tracking-[-0.06em] text-ink dark:text-paper"
                aria-label="676"
              >
                {count}
              </p>
              <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-4 max-w-[22rem] text-sm leading-7 text-text-muted">{t('scarcity_avail')}</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
              <span className="mono">PL-676 — {t('provenance_label')}</span>
            </div>
          </div>

          <p className="mono mt-3 hidden lg:block">NASK • 676 • 1996 — {t('provenance_value')}</p>
        </div>

        {/* Right — evidence rows */}
        <div>
          <div className="eyebrow">{t('scarcity_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('scarcity_title')}</h2>

          <div className="mt-8 border-y border-hairline">
            {points.map((point, index) => (
              <article key={point} className="evidence-row grid gap-3 px-2 py-6 sm:grid-cols-[96px_1fr] sm:items-start">
                <span className="mono pt-1">0{index + 1} — ARCHIVAL</span>
                <span className="text-sm leading-7 text-text-muted sm:text-[0.95rem]">{t(point)}</span>
              </article>
            ))}
          </div>

          <p className="mono mt-3 lg:hidden">NASK • 676 • 1996 — {t('provenance_value')}</p>
        </div>
      </div>
    </section>
  );
}
