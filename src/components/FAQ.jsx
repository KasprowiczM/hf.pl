/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const faqKeys = [1, 2, 3, 4, 5, 6, 7];

export function FAQ() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } },
  };
  const row = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      className="section-shell hairline-top"
      id="faq"
      style={{ borderTopColor: 'rgba(230,237,243,0.08)', background: '#070a12' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <motion.div variants={shouldReduceMotion ? undefined : row} className="max-w-[36rem]">
          <div className="eyebrow">{t('faq_overline')}</div>
          <h2 className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 1.4rem + 2.4vw, 3.2rem)' }}>{t('faq_title')}</h2>
          <p className="mt-4 font-mono text-[0.76rem] leading-6 text-[#8a97a8]">{t('faq_desc')}</p>
          <p className="mono mt-6 hidden lg:flex items-center gap-2 text-[#5a6575]">
            <span className="h-px w-6" aria-hidden="true" style={{ background: 'rgba(230,237,243,0.12)' }} />
            <span>NASK • 7 — {t('faq_overline')}</span>
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="overflow-hidden border"
          style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4, background: '#0e1422' }}
        >
          {faqKeys.map((key) => {
            const isOpen = openKey === key;
            const qNum = `Q${String(key).padStart(2, '0')}`;
            return (
              <motion.div
                key={key}
                variants={shouldReduceMotion ? undefined : row}
                className="border-b last:border-b-0"
                style={{ borderColor: 'rgba(230,237,243,0.06)' }}
              >
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-trigger-${key}`}
                  className="group flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition-colors hover:bg-[rgba(0,229,255,0.04)]"
                >
                  <span className="flex min-w-0 items-start gap-4">
                    <span
                      className="font-mono shrink-0 pt-1 text-[#00e5ff]"
                      style={{ fontSize: '0.62rem', letterSpacing: '0.14em', fontWeight: 600 }}
                      aria-hidden="true"
                    >
                      {qNum}
                    </span>
                    <span
                      className="font-mono text-[0.92rem] font-semibold leading-6 tracking-[-0.01em] text-[#e6edf3]"
                      style={{ letterSpacing: '-0.015em' }}
                    >
                      {t(`faq${key}_q`)}
                    </span>
                  </span>
                  <span
                    className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center border bg-[#141e30] transition-colors group-hover:border-[rgba(0,229,255,0.25)]"
                    style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4 }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.25, 1, 0.5, 1] }}
                      className="flex"
                    >
                      <ChevronDown size={16} aria-hidden="true" className="text-[#8a97a8]" />
                    </motion.span>
                  </span>
                </button>

                <div
                  id={`faq-answer-${key}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${key}`}
                  className="grid"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.25, 1, 0.5, 1] }}
                          className="px-4 pb-5 pl-[3.4rem] sm:pl-[4.2rem]"
                        >
                          <div
                            className="mb-3 h-6 w-0.5"
                            aria-hidden="true"
                            style={{ background: '#00e5ff', opacity: 0.9, boxShadow: '0 0 6px rgba(0,229,255,0.4)' }}
                          />
                          <p className="font-mono text-[0.84rem] leading-6 text-[#8a97a8]">{t(`faq${key}_a`)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
