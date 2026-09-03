/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Valuation() {
  const { t } = useTranslation();
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

  return (
    <section className="section-shell bg-[#080808] text-[#efebe3] hairline-top" id="valuation" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="section-frame grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14 lg:px-10">
        {/* Left — copy on ink */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-[36rem]"
        >
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">{t('val_overline')}</div>
          <h2
            className="mt-3 font-display text-balance text-[clamp(2.4rem,1.6rem+2.8vw,4.2rem)] leading-[0.9] tracking-[-0.04em] text-[#efebe3]"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            {t('val_title')}
          </h2>
          <p className="mt-5 max-w-[42rem] font-mono text-[0.84rem] leading-7 text-white/65">{t('val_note')}</p>
          <p className="mt-6 hidden font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/25 lg:block">NASK • 676 • {t('val_label')} — {t('provenance_label')}</p>

          {/* notarial decoration — faint rule */}
          <div className="mt-8 hidden h-px w-full max-w-[28rem] bg-white/10 lg:block"></div>
          <p className="mt-3 hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/30 lg:block">Nr 676/1996 • PROTOKÓŁ WYCENY • PL-676</p>
        </motion.div>

        {/* Right — paper protocol-card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="artifact-card protocol-card overflow-hidden border border-white/15 bg-[#efebe3] text-[#080808] dark:border-white/15"
        >
          {/* header — ink on paper style but keep paper */}
          <div className="flex items-center justify-between border-b border-[#080808] bg-[#efebe3] px-5 py-3 sm:px-6">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/60">{t('val_label')}</span>
            <span className="border border-[#080808] px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808]">NASK • 676 • 1996</span>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="font-display text-[clamp(2.4rem,1.6rem+3vw,3.4rem)] leading-none tracking-[-0.04em] text-[#080808]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              {t('val_price')}
            </motion.p>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/45">WARTOŚĆ ARCHIWALNA NETTO</p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#8b1a1a]">{t('val_cta_sub')}</p>

            {/* hairline divider */}
            <div className="mt-4 h-px w-full bg-[#080808]/10"></div>

            <div className="border-y border-[#080808] dark:border-[#080808]">
              {terms.map((term, idx) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + idx * 0.06 }}
                  className="flex gap-3 border-b border-[#080808]/10 px-1 py-4 last:border-b-0"
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b1a1a]" aria-hidden="true" />
                  <span className="font-mono text-[0.76rem] leading-6 text-[#080808]/70">{t(term)}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'valuation', target: 'contact' })}
              className="mt-6 flex w-full items-center justify-center gap-2 border border-[#080808] bg-[#080808] px-5 py-3 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#efebe3] no-underline hover:bg-transparent hover:text-[#080808]"
            >
              {t('val_cta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </motion.a>
            <p className="mt-3 text-center font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/40">Odpowiedź w 24h • NDA • Protokół przekazania</p>

            {/* notarial footer marks */}
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#080808]/15 pt-3">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#080808]/30">PL-676 • Nr 676/1996</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#080808]/30">PODPIS ————————</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
