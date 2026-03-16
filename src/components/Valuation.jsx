import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Valuation() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)]" id="valuation">
      <div className="text-center max-w-[680px] mx-auto mb-12">
        <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{t('val_overline')}</div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] text-text mb-4 tracking-[-0.02em]">{t('val_title')}</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[960px] mx-auto bg-gradient-to-br from-surface-2 to-surface-3 border border-border-strong rounded-2xl p-[clamp(2.5rem,5vw,4rem)] px-8 text-center relative overflow-hidden"
      >
        <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-primary-glow)_0%,transparent_70%)] rounded-full z-0"></div>
        
        <div className="relative z-10 text-xs text-text-muted uppercase tracking-[0.1em] mb-3">{t('val_label')}</div>
        <div className="relative z-10 font-display text-[clamp(2.5rem,1rem+4vw,5rem)] text-primary mb-4 tabular-nums">{t('val_price')}</div>
        <p className="relative z-10 text-sm text-text-muted max-w-[500px] mx-auto leading-relaxed">{t('val_note')}</p>
      </motion.div>
    </section>
  );
}
