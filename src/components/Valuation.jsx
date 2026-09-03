/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Valuation() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const terms = ['val_term_1', 'val_term_2', 'val_term_3'];

  return (
    <section className="section-shell hairline-top" id="valuation" style={{ borderTop: '1px solid rgba(230,237,243,0.08)', background: '#070a12' }}>
      <div className="section-frame grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14 lg:px-10">
        {/* Left — slogan split, mono */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-[36rem]"
        >
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">{t('val_overline')}</div>
          <h2
            className="mt-3 font-mono font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#e6edf3]"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.0rem, 1.2rem + 2.8vw, 3.4rem)' }}
          >
            <span className="block">MIEJSIĄC REKLAMY — 30 DNI.</span>
            <span className="block text-[#00e5ff]">HF.PL — 20 LAT.</span>
          </h2>
          <p
            className="mt-4 max-w-[42rem] font-mono text-[#8a97a8]"
            style={{ fontSize: '0.76rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {t('val_note')}
          </p>
          <p className="mt-4 hidden font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#5a6575] lg:block">NASK • 676 • {t('val_label')} — {t('provenance_label')}</p>
          <div className="mt-6 hidden h-px w-full max-w-[28rem] lg:block" style={{ background: 'rgba(230,237,243,0.08)' }} />
          <p className="mt-3 hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#5a6575] lg:block">Nr 676/1996 • PROTOKÓŁ WYCENY • PL-676 • TERMINAL</p>
        </motion.div>

        {/* Right — execution panel, price serif 35–40k, amber/cyan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="artifact-card protocol-card overflow-hidden will-change-transform"
          style={{ borderColor: 'rgba(230,237,243,0.10)', background: '#0e1422', borderRadius: 4 }}
        >
          <div className="flex items-center justify-between border-b px-5 py-3 sm:px-6" style={{ borderColor: 'rgba(230,237,243,0.08)', background: '#141e30' }}>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8]">{t('val_label')}</span>
            <span className="border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#8a97a8]" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4 }}>NASK • 676 • 1996</span>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="price-serif leading-none tracking-[-0.04em] text-[#e6edf3] will-change-transform"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 1.6rem + 3.2vw, 3.4rem)' }}
              >
                {t('val_price')}
              </motion.p>
              {/* 7-day urgency badge — seal red pulsing */}
              <motion.span
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0 inline-flex items-center border px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white"
                style={{ background: '#ff3344', borderColor: '#ff3344', borderRadius: 4, boxShadow: '0 0 12px rgba(255,51,68,0.35)' }}
              >
                7 DNI
              </motion.span>
            </div>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">WARTOŚĆ ARCHIWALNA NETTO</p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#00e5ff]">{t('val_cta_sub')}</p>

            <div className="mt-4 h-px w-full" style={{ background: 'rgba(230,237,243,0.08)' }} />

            <div className="border-y" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
              {terms.map((term, idx) => (
                <motion.div
                  key={term}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + idx * 0.06 }}
                  className="flex gap-3 border-b px-1 py-3 last:border-b-0"
                  style={{ borderColor: 'rgba(230,237,243,0.06)' }}
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px rgba(0,229,255,0.5)' }} />
                  <span
                    className="font-mono text-[#8a97a8]"
                    style={{ fontSize: '0.74rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {t(term)}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { y: 0 }}
              href="#contact"
              onClick={() => trackEvent('cta_click', { location: 'valuation', target: 'contact' })}
              className="mt-6 flex w-full items-center justify-center gap-2 border bg-[#00e5ff] px-5 py-3 font-mono text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#070a12] no-underline hover:bg-transparent hover:text-[#00e5ff] transition-colors"
              style={{ borderColor: '#00e5ff', borderRadius: 4 }}
            >
              {t('val_cta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </motion.a>
            <p className="mt-3 text-center font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575]">Odpowiedź w 24h • NDA • 7 DNI • Protokół przekazania • TERMINAL</p>

            <div className="mt-6 flex items-center justify-between border-t border-dashed pt-3" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#5a6575]">PL-676 • Nr 676/1996</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[#5a6575]">PODPIS ————————</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
