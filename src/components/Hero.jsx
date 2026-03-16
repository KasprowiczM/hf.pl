import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 relative overflow-hidden" id="hero">
      <div className="absolute inset-0 z-[-1]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-bg to-surface dark:from-[#08080a] dark:via-[#111113] dark:to-[#08080a] opacity-80"></div>
        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,var(--color-primary-dim)_0%,transparent_70%)] opacity-80 mix-blend-screen dark:mix-blend-lighten blur-3xl"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,164,76,0.15)_0%,transparent_70%)] blur-3xl mix-blend-screen dark:mix-blend-lighten"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,164,76,0.1)_0%,transparent_70%)] blur-3xl mix-blend-screen dark:mix-blend-lighten"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath_d=%22M40_0L0_0_0_40%22_fill=%22none%22_stroke=%22%23ffffff%22_stroke-width=%220.3%22_opacity=%220.04%22/%3E%3C/svg%3E')] dark:opacity-10 opacity-5"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1 bg-primary-dim border border-primary/20 rounded-full text-xs text-primary font-semibold tracking-widest uppercase mb-8"
      >
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" aria-hidden="true"></span>
        <span>{t('badge')}</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[clamp(3.5rem,1rem+8vw,9rem)] text-text tracking-tight leading-none mb-4"
      >
        <span className="bg-[linear-gradient(135deg,var(--color-primary)_0%,#e8c962_50%,var(--color-primary)_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-[goldShimmer_4s_ease-in-out_infinite]">{t('domain_prefix')}</span>
        <span className="text-text-faint">.pl</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg text-text-muted max-w-[560px] mx-auto mb-10 leading-relaxed"
      >
        {t('hero_subtitle')}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-4 items-center flex-wrap justify-center"
      >
        <a href="mailto:domain@hf.pl" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-180 cursor-pointer no-underline bg-primary text-bg hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(201,164,76,0.3)] hover:text-bg active:translate-y-0">
          <Mail size={16} />
          <span>{t('cta_offer')}</span>
        </a>
        <a href="#valuation" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-180 cursor-pointer no-underline bg-transparent text-text-muted border border-border hover:text-text hover:border-border-strong hover:bg-surface">
          <span>{t('cta_valuation')}</span>
          <ArrowDown size={14} />
        </a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-faint text-xs animate-[scrollBounce_2s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
