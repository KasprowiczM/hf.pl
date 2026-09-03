/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Mail, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const sloganRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (sloganRef.current) {
          gsap.fromTo(
            sloganRef.current,
            { xPercent: -2, opacity: 0.85 },
            {
              xPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    } catch {
      // ignore
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [shouldReduceMotion]);

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
      ref={sectionRef}
      className="section-shell hairline-top"
      id="contact"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #080808)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:items-start">
        {/* Left — slogan ZANIM KONKURENT. */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2
            ref={sloganRef}
            className="mt-3 font-display leading-[0.85] tracking-[-0.05em] text-ink dark:text-paper will-change-transform"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.8rem, 1.6rem + 4vw, 5rem)' }}
          >
            ZANIM <span className="text-[#8b1a1a]">KONKURENT.</span>
          </h2>
          <p
            className="mt-4 max-w-[34rem] text-text-muted"
            style={{ fontSize: '0.88rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('contact_desc')}
          </p>
          <p
            className="mt-3 max-w-[34rem] text-text-muted"
            style={{ fontSize: '0.84rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('contact_info')}
          </p>
          {/* CTA ink — brutalist */}
          <motion.a
            href="mailto:domain@hf.pl"
            onClick={() => trackEvent('cta_click', { location: 'contact_hero', target: 'mailto' })}
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { y: 0 }}
            className="mt-6 inline-flex items-center gap-2 border border-[#080808] bg-[#080808] px-6 py-3 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#efebe3] no-underline hover:bg-transparent hover:text-[#080808] dark:border-[#efebe3] dark:bg-[#efebe3] dark:text-[#080808] dark:hover:bg-transparent dark:hover:text-[#efebe3]"
          >
            NAPISZ TERAZ — domain@hf.pl
            <ArrowRight size={15} aria-hidden="true" />
          </motion.a>
          <p className="mono mt-3 flex items-center gap-2">
            <span className="h-px w-6" aria-hidden="true" style={{ background: '#080808' }} />
            <span>NASK • 1996 • PL-676 — {t('provenance_label')}</span>
          </p>
        </motion.div>

        {/* Right — protocol-card brut: square, 1.5px ink, hairline rows */}
        <motion.div
          variants={shouldReduceMotion ? undefined : item}
          className="overflow-hidden bg-paper dark:bg-surface p-6 sm:p-7 lg:p-8 will-change-transform"
          style={{ border: '1.5px solid var(--color-ink, #080808)', borderRadius: 0 }}
        >
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

          <div className="mt-6 border-y" style={{ borderColor: 'var(--color-hairline)', borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {['cl1', 'cl2', 'cl3'].map((key, index) => (
              <div
                key={key}
                className="evidence-row flex gap-4 px-1 py-4 sm:px-2 sm:py-5"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <span className="mono shrink-0 pt-0.5 tabular-nums" aria-hidden="true" style={{ color: '#8b1a1a', fontSize: '0.65rem' }}>
                  0{index + 1}
                </span>
                <span className="text-sm leading-6 text-text-muted line-clamp-1" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          <p className="mono mt-5 text-center" style={{ letterSpacing: '0.14em', color: 'var(--color-text-faint)' }}>
            Odpowiedź w 24h • NDA • HF.PL — ZANIM KONKURENT
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
