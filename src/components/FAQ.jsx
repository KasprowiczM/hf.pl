/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion';

const faqKeys = [1, 2, 3, 4, 5, 6, 7];

export function FAQ() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const row = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.section
      id="faq"
      className="section-shell hairline-top bg-[var(--color-paper)]"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="section-frame">
        <motion.div variants={row} className="gallery-inner text-center">
          <div className="eyebrow justify-center">{t('faq_overline')}</div>
          <h2
            className="mt-4 font-display text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 1.4rem + 2.4vw, 3.2rem)', letterSpacing: '-0.05em', lineHeight: 0.9 }}
          >
            3 pytania.
            <br />
            <span className="serif-italic font-normal text-[var(--color-text-muted)]">Zero ściemy.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-[15px] leading-7 text-[var(--color-text-muted)]">{t('faq_desc')}</p>
        </motion.div>

        <motion.div variants={container} className="gallery-inner mt-10 border-y border-[var(--color-hairline)]">
          {faqKeys.map((key) => {
            const isOpen = openKey === key;
            const qNum = `Q${String(key).padStart(2, '0')}`;
            return (
              <motion.div key={key} variants={row} className="border-b border-[var(--color-hairline)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-trigger-${key}`}
                  className="group flex w-full items-start justify-between gap-4 px-2 py-5 text-left hover:bg-[var(--color-surface)]/60 transition-colors sm:px-3"
                >
                  <span className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <span className="mono shrink-0 pt-1 !text-[var(--color-stone-strong)]" aria-hidden="true">
                      {qNum}
                    </span>
                    <span
                      className="text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[var(--color-ink)]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {t(`faq${key}_q`)}
                    </span>
                  </span>
                  <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-paper)] transition-colors group-hover:border-[var(--color-line-strong)]">
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.25, 1, 0.5, 1] }}
                      className="flex"
                    >
                      <ChevronDown size={14} aria-hidden="true" className="text-[var(--color-text-faint)]" />
                    </motion.span>
                  </span>
                </button>

                <div
                  id={`faq-answer-${key}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${key}`}
                  className="grid"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 300ms cubic-bezier(0.25,1,0.5,1)' }}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.25, 1, 0.5, 1] }}
                          className="px-2 pb-5 pl-[2.8rem] sm:pl-[3.8rem] sm:pr-6"
                        >
                          <div className="mb-3 h-5 w-px bg-[var(--color-stone)]" aria-hidden="true" />
                          <p className="text-sm leading-7 text-[var(--color-text-muted)]">{t(`faq${key}_a`)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p variants={row} className="mono mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[var(--color-hairline)]" aria-hidden="true" />
          <span>NASK • 7 — {t('faq_overline')}</span>
        </motion.p>
      </div>
    </motion.section>
  );
}
