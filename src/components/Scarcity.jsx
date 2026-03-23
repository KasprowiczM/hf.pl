import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Scarcity() {
  const { t } = useTranslation();
  const points = ['sc1', 'sc2', 'sc3', 'sc4'];
  const metricRef = useRef(null);
  const animationRef = useRef(0);
  const [count, setCount] = useState(676);

  useEffect(() => {
    if (!metricRef.current) {
      return undefined;
    }

    const animateCount = () => {
      const duration = 1400;
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

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(metricRef.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="section-shell section-tone-light reveal reveal-up" id="scarcity">
      <div className="section-frame grid items-center gap-7 sm:gap-11 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
        <div className="soft-panel interactive-card reveal reveal-left rounded-[2rem] p-5 sm:p-10">
          <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-[1.8rem] border border-primary/14 bg-[radial-gradient(circle_at_20%_12%,rgba(240,212,166,0.24),transparent_40%),radial-gradient(circle_at_80%_82%,rgba(140,92,47,0.16),transparent_35%),linear-gradient(180deg,var(--color-surface)_0%,var(--color-surface-2)_100%)] px-6 py-8">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"></div>
              <div className="absolute left-1/2 top-1/2 h-[226px] w-[226px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"></div>
              <div className="absolute left-[18%] top-[20%] h-3 w-3 rounded-full bg-primary/50"></div>
              <div className="absolute right-[16%] top-[34%] h-2.5 w-2.5 rounded-full bg-primary/35"></div>
              <div className="absolute bottom-[22%] left-[26%] h-2 w-2 rounded-full bg-primary/30"></div>
            </div>

            <div ref={metricRef} className="relative z-10 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{t('scarcity_label')}</p>
              <p className="stat-value scarcity-count mt-4 text-[clamp(4.4rem,3.1rem+4.6vw,6rem)] leading-none text-primary">{count}</p>
              <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-7 text-text-muted">{t('scarcity_avail')}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="eyebrow">{t('scarcity_overline')}</div>
          <h2 className="section-title text-balance">{t('scarcity_title')}</h2>
          <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {points.map((point, index) => (
              <li
                key={point}
                className="interactive-card reveal reveal-up scarcity-line-card grid gap-3 rounded-[1.4rem] border border-border bg-surface/90 px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
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
