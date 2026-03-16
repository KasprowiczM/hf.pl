import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SectionHeader = ({ overline, title, desc }) => (
  <div className="text-center max-w-[680px] mx-auto mb-12">
    <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{overline}</div>
    <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] text-text mb-4 tracking-[-0.02em]">{title}</h2>
    <p className="text-base sm:text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted leading-[1.7]">{desc}</p>
  </div>
);

const cardVariants = {
  hidden: (idx) => ({ opacity: 0, scale: 0.9, x: idx % 2 === 0 ? -80 : 80, y: 40 }),
  visible: (idx) => ({ 
    opacity: 1, 
    scale: 1, 
    x: 0,
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }
  })
};

export function WhySection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
      title: t('card1_title'),
      text: t('card1_text')
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      title: t('card2_title'),
      text: t('card2_text')
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="5"/></svg>,
      title: t('card3_title'),
      text: t('card3_text')
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      title: t('card4_title'),
      text: t('card4_text')
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
      title: t('card5_title'),
      text: t('card5_text')
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-primary mb-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: t('card6_title'),
      text: t('card6_text')
    }
  ];

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)]" id="why">
      <SectionHeader 
        overline={t('why_overline')}
        title={t('why_title')}
        desc={t('why_desc')}
      />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto"
      >
        {cards.map((card, idx) => (
          <motion.div 
            key={idx} 
            custom={idx}
            variants={cardVariants}
            className="group relative bg-surface-2 border border-border rounded-2xl p-8 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,164,76,0.15)]"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {card.icon}
            <h3 className="font-display text-lg sm:text-[clamp(1.125rem,1rem+0.75vw,1.5rem)] text-text mb-3">{card.title}</h3>
            <p className="text-sm sm:text-[clamp(0.875rem,0.8rem+0.35vw,1rem)] text-text-muted leading-[1.7]">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
