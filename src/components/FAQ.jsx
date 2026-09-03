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
      className="section-shell hairline-top bg-[#f6f1e8] dark:bg-[#07080a]"
      id="faq"
      style={{ borderTopWidth: '1.5px', borderTopColor: 'var(--color-ink, #0a0a0a)' }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={container}
    >
      <div className="section-frame swiss-grid gap-8 lg:gap-14">
        <motion.div variants={shouldReduceMotion ? undefined : row} className="col-span-12 max-w-[36rem] lg:col-span-4">
          <div className="eyebrow">{t('faq_overline')}</div>
          <h2 className="section-title text-balance mt-3 text-[#0a0a0a] dark:text-[#f6f1e8]">{t('faq_title')}</h2>
          <p className="section-lead mt-5 text-[#4a4642] dark:text-[#f6f1e8]/60">{t('faq_desc')}</p>
          <div className="mt-5 h-[2px] w-16 bg-[#e30613] dark:bg-[#ff1a2b] hidden lg:block" aria-hidden="true" />
          <p className="mono mt-6 hidden lg:flex items-center gap-2">
            <span className="h-px w-6 bg-[rgba(10,10,10,0.12)] dark:bg-white/15" aria-hidden="true" />
            <span className="text-[#8a8683]">NASK • 7 — {t('faq_overline')}</span>
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="col-span-12 border-y border-[rgba(10,10,10,0.06)] dark:border-white/10 lg:col-span-8"
          style={{ borderTopWidth: '1px', borderBottomWidth: '1px' }}
        >
          {faqKeys.map((key) => {
            const isOpen = openKey === key;
            const qNum = `Q${String(key).padStart(2, '0')}`;
            return (
              <motion.div
                key={key}
                variants={shouldReduceMotion ? undefined : row}
                className="border-b last:border-b-0"
                style={{ borderColor: 'var(--color-hairline)' }}
              >
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-trigger-${key}`}
                  className="group flex w-full items-start justify-between gap-4 px-2 py-5 text-left transition-colors hover:bg-[#fdf8ef] dark:hover:bg-white/[0.04]"
                >
                  <span className="flex min-w-0 items-start gap-4">
                    <span
                      className="mono shrink-0 pt-1"
                      style={{ color: '#e30613', fontSize: '10px', letterSpacing: '0.14em' }}
                      aria-hidden="true"
                    >
                      {qNum}
                    </span>
                    <span
                      className="text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[#0a0a0a] dark:text-[#f6f1e8]"
                      style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: 600, letterSpacing: '-0.015em' }}
                    >
                      {t(`faq${key}_q`)}
                    </span>
                  </span>
                  <span
                    className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center border bg-[#fdf8ef] dark:bg-[#111418] transition-colors group-hover:border-[rgba(10,10,10,0.14)]"
                    style={{ borderColor: 'var(--color-hairline)', borderRadius: '4px' }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.25, 1, 0.5, 1] }}
                      className="flex"
                    >
                      <ChevronDown size={16} aria-hidden="true" className="text-[#8a8683]" />
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
                          className="px-2 pb-5 pl-[3.4rem] sm:pl-[4.2rem]"
                        >
                          <div
                            className="mb-3 h-6 w-0.5"
                            aria-hidden="true"
                            style={{ background: '#e30613', opacity: 0.9 }}
                          />
                          <p className="text-[15px] leading-7 text-[#4a4642] dark:text-[#f6f1e8]/65">{t(`faq${key}_a`)}</p>
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
