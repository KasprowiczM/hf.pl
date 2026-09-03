/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Mail, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion';
import { trackEvent } from '../lib/analytics';

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText('domain@hf.pl');
    setCopied(true);
    trackEvent('contact_copy', { value: 'domain@hf.pl' });
    window.setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      id="contact"
      className="section-shell hairline-top bg-[var(--color-paper)]"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={item} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('contact_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 1.4rem + 2.8vw, 3.6rem)', letterSpacing: '-0.05em', lineHeight: 0.88 }}
          >
            Zanim
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">konkurent.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[32rem] text-[15px] leading-7 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {t('contact_desc')}
          </p>
          <p className="mx-auto mt-2 max-w-[32rem] text-[14px] leading-6 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {t('contact_info')}
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[var(--color-stone)]" aria-hidden="true" />
        </motion.div>

        {/* gallery contact card — minimal centered */}
        <motion.div
          variants={item}
          className="gallery-narrow mt-10 overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface)] will-change-transform"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <div className="p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3 text-[0.84rem] font-medium tracking-[-0.01em] text-[var(--color-paper)] no-underline hover:opacity-90 transition-opacity"
              >
                <Mail size={15} aria-hidden="true" />
                {t('contact_email_label')}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? t('copied') : 'domain@hf.pl — copy to clipboard'}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-paper)] px-5 py-3 text-[0.82rem] font-medium tracking-[-0.01em] text-[var(--color-ink)] hover:border-[var(--color-line-strong)] transition-colors"
              >
                {copied ? <Check size={15} aria-hidden="true" className="text-[var(--color-stone-strong)]" /> : <Copy size={15} aria-hidden="true" className="text-[var(--color-text-faint)]" />}
                {copied ? t('copied') : 'domain@hf.pl'}
              </button>
            </div>

            <div className="mt-6 divide-y divide-[var(--color-hairline)] border-y border-[var(--color-hairline)]">
              {['cl1', 'cl2', 'cl3'].map((key, idx) => (
                <div key={key} className="flex gap-3 px-1 py-3.5 sm:px-2">
                  <span className="mono shrink-0 pt-0.5 !text-[var(--color-stone-strong)]" aria-hidden="true">0{idx + 1}</span>
                  <span className="text-sm leading-6 text-[var(--color-text-muted)] line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>

            <motion.a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact_hero', target: 'mailto' })}
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { y: 0 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 text-[0.80rem] font-medium tracking-[-0.01em] text-[var(--color-ink)] underline decoration-[var(--color-stone)] decoration-1 underline-offset-4 hover:decoration-[var(--color-ink)] transition-colors no-underline"
            >
              Napisz teraz — domain@hf.pl
              <ArrowRight size={14} aria-hidden="true" />
            </motion.a>

            <p className="mono mt-4 text-center">Odpowiedź w 24h • NDA • HF.PL — ZANIM KONKURENT</p>
          </div>
        </motion.div>

        <motion.p variants={item} className="mono mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[var(--color-hairline)]" aria-hidden="true" />
          <span>NASK • 1996 • PL-676 — {t('provenance_label')}</span>
        </motion.p>
      </div>
    </motion.section>
  );
}
