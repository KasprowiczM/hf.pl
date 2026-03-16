import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const useCasesList = [
  { domain: 'healthfitness.pl', i18nKey: 'uc1' },
  { domain: 'hubfinansowy.pl', i18nKey: 'uc2' },
  { domain: 'highfashion.pl', i18nKey: 'uc3' },
  { domain: 'humanfuture.pl', i18nKey: 'uc4' },
  { domain: 'handelfirma.pl', i18nKey: 'uc5' },
  { i18nDomainKey: 'uc6_domain', i18nKey: 'uc6' },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30, y: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export function UseCases() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)] bg-surface" id="usecases">
      <div className="text-center max-w-[680px] mx-auto mb-12">
        <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{t('use_overline')}</div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] text-text mb-4 tracking-[-0.02em]">{t('use_title')}</h2>
        <p className="text-base sm:text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted leading-[1.7]">{t('use_desc')}</p>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto"
      >
        {useCasesList.map((uc, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="flex items-start gap-4 p-6 bg-surface border border-border rounded-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(201,164,76,0.1)] group cursor-default"
          >
            <div className="w-2 h-2 min-w-[8px] rounded-full bg-primary mt-2" aria-hidden="true"></div>
            <div>
              <div className="font-semibold text-text group-hover:text-primary transition-colors duration-300 text-base sm:text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] mb-1">
                {uc.domain || t(uc.i18nDomainKey)}
              </div>
              <div className="text-sm sm:text-[clamp(0.875rem,0.8rem+0.35vw,1rem)] text-text-muted">
                {t(uc.i18nKey)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
