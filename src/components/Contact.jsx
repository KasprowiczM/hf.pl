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
            { xPercent: -2, opacity: 0.88 },
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
      className="section-shell hairline-top bg-[#f6f1e8] dark:bg-[#07080a]"
      id="contact"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #0a0a0a)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame swiss-grid gap-10 lg:gap-14 lg:items-start">
        {/* Left — slogan ZANIM KONKURENT. — Swiss */}
        <motion.div variants={shouldReduceMotion ? undefined : item} className="col-span-12 lg:col-span-5 max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2
            ref={sloganRef}
            className="mt-3 font-display leading-[0.85] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8] will-change-transform"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(2.8rem, 1.6rem + 4vw, 5rem)' }}
          >
            ZANIM <span className="text-[#e30613] dark:text-[#ff1a2b]">KONKURENT.</span>
          </h2>
          <div className="mt-4 h-[2px] w-16 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
          <p className="mt-4 max-w-[34rem] font-body text-[15px] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/60">
            {t('contact_desc')}
          </p>
          <p className="mt-3 max-w-[34rem] font-body text-[14px] leading-6 text-[#4a4642]/85 dark:text-[#f6f1e8]/50">
            {t('contact_info')}
          </p>
          <motion.a
            href="mailto:domain@hf.pl"
            onClick={() => trackEvent('cta_click', { location: 'contact_hero', target: 'mailto' })}
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { y: 0 }}
            className="mt-6 inline-flex items-center gap-2 border border-[#0a0a0a] bg-[#0a0a0a] px-6 py-3 font-mono text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#f6f1e8] no-underline hover:bg-transparent hover:text-[#0a0a0a] dark:border-[#f6f1e8] dark:bg-[#f6f1e8] dark:text-[#07080a] dark:hover:bg-transparent dark:hover:text-[#f6f1e8]"
            style={{ borderRadius: '4px' }}
          >
            NAPISZ TERAZ — domain@hf.pl
            <ArrowRight size={15} aria-hidden="true" />
          </motion.a>
          <p className="mono mt-4 flex items-center gap-2" style={{ color: '#8a8683' }}>
            <span className="h-px w-6 bg-[#0a0a0a]/18 dark:bg-white/15 hidden sm:block" aria-hidden="true" />
            <span className="provenance">NASK • 1996 • PL-676 — {t('provenance_label')}</span>
          </p>
        </motion.div>

        {/* Right — Swiss protocol-card: square, hairline rows, radius 4 */}
        <motion.div
          variants={shouldReduceMotion ? undefined : item}
          className="col-span-12 lg:col-span-7 overflow-hidden bg-[#fdf8ef] dark:bg-[#111418] p-6 sm:p-7 lg:p-8 will-change-transform"
          style={{ border: '1.5px solid var(--color-ink, #0a0a0a)', borderRadius: '4px' }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[0.86rem] font-bold tracking-[-0.01em] no-underline transition-colors"
              style={{ background: '#0a0a0a', color: '#f6f1e8', border: '1.5px solid #0a0a0a', borderRadius: '4px' }}
            >
              <Mail size={16} aria-hidden="true" />
              {t('contact_email_label')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? t('copied') : 'domain@hf.pl — copy to clipboard'}
              className="inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[0.86rem] font-bold tracking-[-0.01em] transition-colors"
              style={{
                background: '#f6f1e8',
                color: '#0a0a0a',
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: '4px',
              }}
            >
              {copied ? <Check size={16} aria-hidden="true" style={{ color: '#e30613' }} /> : <Copy size={16} aria-hidden="true" />}
              {copied ? t('copied') : 'domain@hf.pl'}
            </button>
          </div>

          <div className="mt-6 border-y border-[rgba(10,10,10,0.06)] dark:border-white/10" style={{ borderTopWidth: '1px', borderBottomWidth: '1px' }}>
            {['cl1', 'cl2', 'cl3'].map((key, index) => (
              <div
                key={key}
                className="evidence-row flex gap-4 px-1 py-4 sm:px-2 sm:py-5"
                style={{ borderTop: '1px solid var(--color-hairline)' }}
              >
                <span className="mono shrink-0 pt-0.5 tabular-nums" aria-hidden="true" style={{ color: '#e30613', fontSize: '10px' }}>
                  0{index + 1}
                </span>
                <span className="text-[15px] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/70 line-clamp-1">
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          <p className="mono mt-5 text-center" style={{ letterSpacing: '0.14em', color: '#8a8683' }}>
            Odpowiedź w 24h • NDA • HF.PL — ZANIM KONKURENT
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
