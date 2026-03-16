import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';

export function Scarcity() {
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const points = [
    { key: 'sc1' },
    { key: 'sc2' },
    { key: 'sc3' },
    { key: 'sc4' }
  ];

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)] bg-surface" id="scarcity">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="relative max-w-[380px] mx-auto w-full" ref={ref}
          >
            <svg viewBox="0 0 300 300" fill="none" className="w-full h-auto">
              <circle cx="150" cy="150" r="130" stroke="var(--color-border)" strokeWidth="2" />
              <motion.circle 
                cx="150" 
                cy="150" 
                r="130" 
                stroke="var(--color-primary)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                transform="rotate(-90 150 150)"
                initial={{ strokeDasharray: "816.8 816.8", strokeDashoffset: 816.8 }}
                animate={isInView ? { strokeDashoffset: 775.96 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <text x="150" y="138" textAnchor="middle" fill="var(--color-primary)" className="font-display text-5xl">676</text>
              <text x="150" y="168" textAnchor="middle" fill="var(--color-text-muted)" className="font-body text-sm">{t('scarcity_label')}</text>
              <text x="150" y="200" textAnchor="middle" fill="var(--color-primary)" className="font-body text-[13px] font-semibold">
                ~5% <tspan fill="var(--color-text-faint)">{t('scarcity_avail')}</tspan>
              </text>
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{t('scarcity_overline')}</div>
              <h3 className="font-display text-2xl sm:text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] text-text">{t('scarcity_title')}</h3>
            </div>
            
            <ul className="flex flex-col gap-4">
              {points.map((pt, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 text-sm text-text-muted leading-relaxed"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mt-[2px] shrink-0">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>{t(pt.key)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
