import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const current = Math.floor(ease * value);
        
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(tick);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-display text-4xl sm:text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] text-primary mb-1 font-variant-numeric tabular-nums lining-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsBar() {
  const { t } = useTranslation();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border-y border-border" 
      aria-label="Key statistics"
    >
      <div className="bg-surface p-6 px-4 text-center">
        <AnimatedNumber value={2} />
        <div className="text-xs text-text-muted uppercase tracking-[0.1em]">{t('stat_chars')}</div>
      </div>
      <div className="bg-surface p-6 px-4 text-center">
        <AnimatedNumber value={676} />
        <div className="text-xs text-text-muted uppercase tracking-[0.1em]">{t('stat_total')}</div>
      </div>
      <div className="bg-surface p-6 px-4 text-center">
        <AnimatedNumber value={5} prefix="<" suffix="%" />
        <div className="text-xs text-text-muted uppercase tracking-[0.1em]">{t('stat_available')}</div>
      </div>
      <div className="bg-surface p-6 px-4 text-center">
        <AnimatedNumber value={340} prefix="+" suffix="%" />
        <div className="text-xs text-text-muted uppercase tracking-[0.1em]">{t('stat_growth')}</div>
      </div>
    </motion.section>
  );
}
