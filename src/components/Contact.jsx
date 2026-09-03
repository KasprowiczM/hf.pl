/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Mail, ArrowRight } from 'lucide-react';
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="contact"
      style={{ borderTopColor: 'rgba(230,237,243,0.08)', background: '#070a12' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:items-start">
        {/* Left — slogan */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2
            className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.4rem, 1.4rem + 3vw, 3.6rem)' }}
          >
            ZANIM <span className="text-[#00e5ff]">KONKURENT.</span>
          </h2>
          <p
            className="mt-4 max-w-[34rem] font-mono text-[#8a97a8]"
            style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('contact_desc')}
          </p>
          <p
            className="mt-3 max-w-[34rem] font-mono text-[#8a97a8]"
            style={{ fontSize: '0.74rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('contact_info')}
          </p>
          <motion.a
            href="mailto:domain@hf.pl"
            onClick={() => trackEvent('cta_click', { location: 'contact_hero', target: 'mailto' })}
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { y: 0 }}
            className="mt-6 inline-flex items-center gap-2 border bg-[#00e5ff] px-6 py-3 font-mono text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#070a12] no-underline hover:bg-transparent hover:text-[#00e5ff] transition-colors"
            style={{ borderColor: '#00e5ff', borderRadius: 4 }}
          >
            NAPISZ TERAZ — domain@hf.pl
            <ArrowRight size={15} aria-hidden="true" />
          </motion.a>
          <p className="mono mt-3 flex items-center gap-2 text-[#5a6575]">
            <span className="h-px w-6" aria-hidden="true" style={{ background: 'rgba(230,237,243,0.12)' }} />
            <span>NASK • 1996 • PL-676 — {t('provenance_label')}</span>
          </p>
        </motion.div>

        {/* Right — terminal execution card */}
        <motion.div
          variants={shouldReduceMotion ? undefined : item}
          className="overflow-hidden p-6 sm:p-7 lg:p-8 will-change-transform"
          style={{ border: '1px solid rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] no-underline transition-colors"
              style={{ background: '#00e5ff', color: '#070a12', border: '1px solid #00e5ff', borderRadius: 4 }}
            >
              <Mail size={16} aria-hidden="true" />
              {t('contact_email_label')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? t('copied') : 'domain@hf.pl — copy to clipboard'}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors"
              style={{
                background: '#141e30',
                color: '#e6edf3',
                border: '1px solid rgba(230,237,243,0.08)',
                borderRadius: 4,
              }}
            >
              {copied ? <Check size={16} aria-hidden="true" style={{ color: '#00e5ff' }} /> : <Copy size={16} aria-hidden="true" />}
              {copied ? t('copied') : 'domain@hf.pl'}
            </button>
          </div>

          <div className="mt-6 overflow-hidden border" style={{ borderColor: 'rgba(230,237,243,0.06)', borderRadius: 4 }}>
            {['cl1', 'cl2', 'cl3'].map((key, index) => (
              <div
                key={key}
                className="evidence-row flex gap-4 px-4 py-4 sm:py-5"
                style={{ borderTop: '1px solid rgba(230,237,243,0.06)' }}
              >
                <span className="font-mono shrink-0 pt-0.5 tabular-nums text-[#00e5ff]" aria-hidden="true" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', fontWeight: 600 }}>
                  0{index + 1}
                </span>
                <span className="font-mono text-[0.82rem] leading-6 text-[#8a97a8] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          <p className="mono mt-5 text-center text-[#5a6575]" style={{ letterSpacing: '0.14em' }}>
            Odpowiedź w 24h • NDA • HF.PL — ZANIM KONKURENT • TERMINAL
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
