/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Hero() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const proofItems = [
    { value: t('metric_1_value'), label: t('metric_1_label'), sub: t('metric_1_sub') },
    { value: t('metric_2_value'), label: t('metric_2_label'), sub: t('metric_2_sub') },
    { value: t('metric_3_value'), label: t('metric_3_label'), sub: t('metric_3_sub') },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      className="section-shell relative overflow-visible bg-[#070a12] pt-[64px]"
      id="hero"
      style={{ borderBottom: '1px solid rgba(230,237,243,0.08)', zIndex: 2 }}
    >
      {/* ticker tape — Bloomberg style */}
      <div className="absolute inset-x-0 top-[56px] border-y bg-[#0e1422]/80 backdrop-blur-[8px]" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
        <div className="section-frame flex flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8]">
            <span className="ticker-dot--live inline-block h-[6px] w-[6px] rounded-full bg-[#ff3344]" style={{ boxShadow: '0 0 8px rgba(255,51,68,0.6)' }} aria-hidden="true" />
            HF.PL <span className="text-[#5a6575]">●</span> <span className="text-[#00e5ff]">LIVE</span> <span className="text-[#5a6575]">●</span> NASK 1996 <span className="hidden sm:inline text-[#5a6575]">●</span> <span className="hidden sm:inline">PL-676</span> <span className="hidden sm:inline text-[#5a6575]">●</span> <span className="hidden sm:inline text-[#ffb700]">LAST 676</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#5a6575]">
            <span className="h-px w-6 bg-[rgba(230,237,243,0.15)]" aria-hidden="true" />
            REJESTR NASK • 1996 — 676 / 1996
          </span>
        </div>
      </div>

      <div className="section-frame px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-10 pt-10 sm:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-12 lg:pt-12">
          {/* Left: terminal punch — NO PIN, no overlap */}
          <motion.div
            className="max-w-[44rem]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a97a8]" style={{ borderColor: 'rgba(230,237,243,0.08)', background: 'rgba(14,20,34,0.9)', borderRadius: 4 }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px rgba(0,229,255,0.6)' }} />
              ARCHIWUM NASK — 1 Z 676 — TERMINAL
            </motion.div>

            {/* HERO H1 — mono 7rem tracking -0.04, NOT serif */}
            <motion.h1
              variants={itemVariants}
              className="mt-4 font-mono font-extrabold uppercase leading-[0.84] tracking-[-0.04em] text-[#e6edf3]"
              style={{ fontSize: 'clamp(3rem, 1rem + 6.5vw, 7rem)', fontFamily: 'var(--font-mono)' }}
              aria-label="2 LITERY. 0 KONKURENCJI."
            >
              <span className="block">2 LITERY.</span>
              <span className="block text-[#00e5ff]">0 KONKURENCJI.</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
              className="mt-4 h-[2px] w-full max-w-[28rem] origin-left bg-[#00e5ff]"
              style={{ boxShadow: '0 0 8px rgba(0,229,255,0.5)' }}
              aria-hidden="true"
            />

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[34rem] border-l-2 pl-4 text-[1.02rem] font-bold leading-6 text-[#e6edf3]"
              style={{ borderColor: '#ff3344' }}
            >
              DŁUGIE NAZWY GINĄ.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="max-w-[34rem] pl-4 font-mono text-[0.74rem] leading-5 text-[#8a97a8]"
            >
              {t('hero_subtitle_accent')}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
                className="inline-flex items-center justify-center gap-2 border bg-[#00e5ff] px-6 py-3 font-mono text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#070a12] no-underline hover:bg-transparent hover:text-[#00e5ff] transition-colors"
                style={{ borderColor: '#00e5ff', borderRadius: 4 }}
              >
                SPRAWDŹ DOSTĘPNOŚĆ W 24H
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#valuation"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
                className="inline-flex items-center justify-center gap-2 border bg-transparent px-6 py-3 font-mono text-[0.70rem] font-semibold uppercase tracking-[0.12em] text-[#e6edf3] no-underline hover:bg-[#141e30] hover:border-[#00e5ff]/40 transition-colors"
                style={{ borderColor: 'rgba(230,237,243,0.14)', borderRadius: 4 }}
              >
                ZOBACZ WYCENĘ
              </a>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5a6575]">
              {t('cta_offer_sub')}
            </motion.p>

            {/* proof bar — terminal grid 3 metrics, surface + line */}
            <motion.div variants={itemVariants} className="mt-9 grid grid-cols-3 overflow-hidden border" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4 }}>
              {proofItems.map((item) => (
                <div key={item.label} className="border-r px-3 py-5 text-center last:border-r-0 sm:px-4 sm:text-left" style={{ borderColor: 'rgba(230,237,243,0.06)', background: 'rgba(14,20,34,0.6)' }}>
                  <div
                    className="font-mono text-[1.9rem] leading-none tracking-[-0.04em] text-[#e6edf3] sm:text-[2.2rem]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}
                  >
                    {item.value}
                  </div>
                  <div className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#00e5ff]">{item.label}</div>
                  <div className="mt-1 font-mono text-[0.66rem] leading-4 text-[#5a6575] line-clamp-1">{item.sub}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              id="tldr"
              className="mt-6 border p-4 sm:p-5"
              style={{ borderColor: 'rgba(230,237,243,0.08)', background: 'rgba(14,20,34,0.9)', borderRadius: 4 }}
            >
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#ffb700]">{t('tldr_title')}</div>
              <ul className="mt-3 space-y-1.5">
                {['tldr_b1', 'tldr_b2', 'tldr_b3', 'tldr_b4', 'tldr_b5'].map((k) => (
                  <li key={k} className="flex gap-2 font-mono text-[0.74rem] leading-6 text-[#8a97a8]">
                    <span className="shrink-0 text-[#00e5ff]">—</span>
                    <span className="line-clamp-1">{t(k)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: terminal execution card — depth REF/NASK/STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="relative lg:sticky lg:top-[72px]"
          >
            <div className="artifact-card protocol-card overflow-hidden" style={{ borderColor: 'rgba(230,237,243,0.10)', background: '#0e1422', borderRadius: 4 }}>
              <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: 'rgba(230,237,243,0.08)', background: '#141e30' }}>
                <span className="font-mono text-[0.60rem] uppercase tracking-[0.16em] text-[#8a97a8]">{t('hero_visual_label')}</span>
                <span className="inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#ffb700]" style={{ borderColor: 'rgba(255,183,0,0.25)', background: 'rgba(255,183,0,0.08)', borderRadius: 4 }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffb700]" aria-hidden="true" />
                  {t('hero_visual_tag')}
                </span>
              </div>

              <div className="relative bg-[#0e1422] px-6 py-8 sm:px-8 sm:py-9">
                {/* terminal crosshairs */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[rgba(230,237,243,0.04)]" />
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[rgba(230,237,243,0.04)]" />
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t" style={{ borderColor: 'rgba(230,237,243,0.12)' }} />
                <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t" style={{ borderColor: 'rgba(230,237,243,0.12)' }} />
                <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l" style={{ borderColor: 'rgba(230,237,243,0.12)' }} />
                <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r" style={{ borderColor: 'rgba(230,237,243,0.12)' }} />

                <div className="relative text-center">
                  <div className="font-mono text-[4.8rem] leading-none tracking-[-0.06em] text-[#e6edf3] sm:text-[5.6rem]" style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    <span>hf</span>
                    <span className="font-mono text-[0.9rem] font-normal tracking-[0.14em] text-[#5a6575]" style={{ verticalAlign: 'super', marginLeft: '2px' }}>
                      .pl
                    </span>
                  </div>
                  <div className="mx-auto mt-3 h-px w-16 bg-[#00e5ff]" style={{ boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
                  <div className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#5a6575]">PL-676 • ARCHIVAL • 1996 • HF.PL</div>
                  <div className="mx-auto mt-4 max-w-[18rem] font-mono text-[0.74rem] leading-6 text-[#8a97a8] line-clamp-1">{t('hero_panel_status_body')}</div>

                  {/* CSS seal — lightweight, no r3f, square 4px */}
                  <div className="relative mx-auto mt-6 flex h-[128px] w-[128px] items-center justify-center">
                    <div className="absolute inset-0 rounded-[12px] bg-[rgba(0,229,255,0.04)] blur-2xl" aria-hidden="true" />
                    <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full border-[1.6px] bg-[rgba(14,20,34,0.9)]" style={{ borderColor: '#ff3344', boxShadow: '0 0 24px rgba(255,51,68,0.18)' }}>
                      <div className="absolute inset-[5px] rounded-full border" style={{ borderColor: 'rgba(255,51,68,0.35)' }} />
                      <div className="absolute inset-[10px] rounded-full border border-dashed" style={{ borderColor: 'rgba(255,51,68,0.18)' }} />
                      <span className="relative z-10 font-mono text-[1.05rem] font-extrabold tracking-[-0.02em] text-[#ff3344]" style={{ fontFamily: 'var(--font-mono)' }}>
                        hf
                      </span>
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                        <defs>
                          <path id="heroSealCircleTerminal" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="5.6" letterSpacing="0.85" fill="#ff3344" fontFamily="JetBrains Mono, monospace">
                          <textPath href="#heroSealCircleTerminal" startOffset="0%">
                            ARCHIWUM • NASK • 1996 • PL-676 •
                          </textPath>
                        </text>
                      </svg>
                      <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff3344]" style={{ boxShadow: '0 0 6px rgba(255,51,68,0.6)' }} />
                      <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff3344]" />
                    </div>
                  </div>

                  <div className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#ff3344]">— PIECZĘĆ ARCHIWALNA —</div>
                </div>

                {/* terminal cells: REF / NASK / STATUS */}
                <div className="mt-7 grid grid-cols-3 overflow-hidden border text-center" style={{ borderColor: 'rgba(230,237,243,0.08)', borderRadius: 4 }}>
                  <div className="border-r px-3 py-3" style={{ borderColor: 'rgba(230,237,243,0.08)', background: 'rgba(20,30,48,0.6)' }}>
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#5a6575]">REF</div>
                    <div className="mt-1 font-mono text-[0.82rem] font-bold tracking-[0.02em] text-[#e6edf3]">PL-676</div>
                  </div>
                  <div className="border-r px-3 py-3" style={{ borderColor: 'rgba(230,237,243,0.08)', background: 'rgba(20,30,48,0.6)' }}>
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#5a6575]">REJESTR</div>
                    <div className="mt-1 font-mono text-[0.82rem] font-bold text-[#e6edf3]">NASK</div>
                  </div>
                  <div className="px-3 py-3" style={{ background: 'rgba(0,229,255,0.08)' }}>
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#5a6575]">STATUS</div>
                    <div className="mt-1 inline-flex items-center gap-1 font-mono text-[0.78rem] font-bold text-[#00e5ff]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse" aria-hidden="true" />
                      {t('badge_live')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid border-t sm:grid-cols-3" style={{ borderColor: 'rgba(230,237,243,0.08)' }}>
                {[
                  ['hero_panel_status_title', 'hero_panel_status_body'],
                  ['hero_panel_flex_title', 'hero_panel_flex_body'],
                  ['hero_panel_transfer_title', 'hero_panel_transfer_body'],
                ].map(([tk, bk]) => (
                  <div key={tk} className="border-r px-4 py-4 last:border-r-0" style={{ borderColor: 'rgba(230,237,243,0.06)' }}>
                    <div className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#00e5ff]">{t(tk)}</div>
                    <div className="mt-2 font-mono text-[0.72rem] leading-5 text-[#8a97a8] line-clamp-1">{t(bk)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575]">NASK • 1996 • PL-676 — {t('provenance_label')}</span>
              <span className="hidden sm:inline font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#5a6575]">{t('hero_status_value')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
