/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText('domain@hf.pl');
    setCopied(true);
    trackEvent('contact_copy', { value: 'domain@hf.pl' });
    window.setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="contact"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <div className="section-frame grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:items-start">
        {/* Left — editorial protocol text */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('contact_title')}</h2>
          <p className="section-lead mt-5">{t('contact_desc')}</p>
          <p className="mt-6 max-w-[34rem] text-sm leading-7 text-text-muted">{t('contact_info')}</p>
          <p className="mono mt-6 flex items-center gap-2">
            <span className="h-px w-6" aria-hidden="true" style={{ background: '#080808' }} />
            <span>NASK • 1996 • PL-676 — {t('provenance_label')}</span>
          </p>
        </motion.div>

        {/* Right — protocol-card brut: square, 1.5px ink, hairline rows */}
        <motion.div
          variants={shouldReduceMotion ? undefined : item}
          className="overflow-hidden bg-paper dark:bg-surface p-6 sm:p-7 lg:p-8"
          style={{ border: '1.5px solid var(--color-ink, #080808)', borderRadius: 0 }}
        >
          {/* Top — actions: ink CTA + ghost copy */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[0.86rem] font-semibold tracking-[-0.01em] no-underline transition-colors"
              style={{ background: '#080808', color: '#efebe3', border: '1.5px solid #080808', borderRadius: 0 }}
            >
              <Mail size={16} aria-hidden="true" />
              {t('contact_email_label')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? t('copied') : 'domain@hf.pl — copy to clipboard'}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[0.86rem] font-semibold tracking-[-0.01em] transition-colors"
              style={{
                background: 'var(--color-paper, #efebe3)',
                color: '#080808',
                border: '1px solid var(--color-hairline)',
                borderRadius: 0,
              }}
            >
              {copied ? <Check size={16} aria-hidden="true" style={{ color: '#8b1a1a' }} /> : <Copy size={16} aria-hidden="true" />}
              {copied ? t('copied') : 'domain@hf.pl'}
            </button>
          </div>

          {/* Middle — evidence rows 01/02/03 with red mono */}
          <div className="mt-6 border-y" style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {['cl1', 'cl2', 'cl3'].map((key, index) => (
              <div
                key={key}
                className="evidence-row flex gap-4 px-1 py-4 sm:px-2 sm:py-5"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <span
                  className="mono shrink-0 pt-0.5 tabular-nums"
                  aria-hidden="true"
                  style={{ color: '#8b1a1a', fontSize: '0.65rem' }}
                >
                  0{index + 1}
                </span>
                <span className="text-sm leading-7 text-text-muted">{t(key)}</span>
              </div>
            ))}
          </div>

          {/* Bottom — provenance NDA */}
          <p className="mono mt-5 text-center" style={{ letterSpacing: '0.14em', color: 'var(--color-text-faint)' }}>
            Odpowiedź w 24h • NDA
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}