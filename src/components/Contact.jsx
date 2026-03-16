import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('domain@hf.pl');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.location.href = 'mailto:domain@hf.pl';
    }
  };

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)] bg-surface" id="contact">
      <div className="text-center max-w-[680px] mx-auto mb-12">
        <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{t('contact_overline')}</div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] text-text mb-4 tracking-[-0.02em]">{t('contact_title')}</h2>
        <p className="text-base sm:text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted leading-[1.7]">{t('contact_desc')}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        className="max-w-[640px] mx-auto text-center relative"
      >
        <a 
          href="mailto:domain@hf.pl" 
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-surface-2 border border-border-strong rounded-xl font-body text-lg font-semibold text-primary mb-6 transition-all duration-180 hover:border-primary hover:shadow-gold hover:-translate-y-0.5 no-underline"
        >
          {copied ? <Check size={20} className="text-success" /> : <Mail size={20} />}
          domain@hf.pl
        </a>

        {copied && (
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-surface-3 border border-border text-xs px-3 py-1.5 rounded-md text-text shadow-sm animate-pulse whitespace-nowrap">
            {t('copied')}
          </div>
        )}

        <p className="text-sm text-text-muted leading-[1.8] mb-6">{t('contact_info')}</p>

        <ul className="flex flex-col gap-2 max-w-[360px] mx-auto text-left">
          {['cl1', 'cl2', 'cl3'].map((key) => (
            <li key={key} className="flex items-center gap-2 text-sm text-text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
              {t(key)}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
