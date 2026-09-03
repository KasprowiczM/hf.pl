/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

function SealMesh({ hovered }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (hovered ? 1.1 : 0.28);
    }
  });
  return (
    <group>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.16, 64]} />
        <meshStandardMaterial color="#8b1a1a" roughness={0.42} metalness={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.02, 64]} />
        <meshStandardMaterial color="#efebe3" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[0.82, 0.84, 64]} />
        <meshBasicMaterial color="#8b1a1a" transparent opacity={0.9} side={2} />
      </mesh>
    </group>
  );
}

function SealCanvas({ hovered }) {
  const [hasWebGL, setHasWebGL] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  });

  // jsdom fallback: no WebGL -> render CSS only
  if (!hasWebGL) return null;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.9, 3.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[2.5, 4, 2]} intensity={1.15} />
      <directionalLight position={[-2, 1, -1.5]} intensity={0.35} />
      <Suspense fallback={null}>
        <SealMesh hovered={hovered} />
      </Suspense>
    </Canvas>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const [sealHovered, setSealHovered] = useState(false);

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease: 'easeOut' } },
  };

  return (
    <section
      className="section-shell relative overflow-hidden bg-[#efebe3] pt-[64px] hairline-bottom dark:bg-[#080808]"
      id="hero"
      style={{ borderBottom: '1px solid rgba(8,8,8,0.12)' }}
    >
      {/* Top provenance bar — rejestr */}
      <div className="border-b border-[#080808] bg-[#efebe3] dark:border-[#efebe3] dark:bg-[#080808]">
        <div className="section-frame flex flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-10">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#080808] dark:text-[#efebe3] sm:text-[0.62rem]">
            NASK • ARCHIWUM PL-676 • 1996 — Nr 676/1996 • PROTOKÓŁ PRZEKAZANIA
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#080808]/50 dark:text-[#efebe3]/50">
            <span className="h-px w-6 bg-[#8b1a1a]"></span> REJESTR NASK
          </span>
        </div>
      </div>

      <div className="section-frame px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-10 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-12 lg:pt-12">
          {/* Left: notarial copy */}
          <motion.div
            className="max-w-[40rem]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#080808] dark:text-[#efebe3]">
              — ARCHIWUM NASK 1 Z 676
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-3 flex items-baseline gap-1 font-display leading-[0.88] tracking-[-0.06em] text-[#080808] dark:text-[#efebe3]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(3.8rem, 2.2rem + 8vw, 8.6rem)' }}
            >
              <span>hf</span>
              <span className="font-mono text-[14px] font-normal tracking-[0.12em] text-[#080808]/55 dark:text-[#efebe3]/55" style={{ transform: 'translateY(-0.55em)' }}>
                .pl
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.62, ease: 'easeOut', delay: 0.45 }}
              className="mt-2 h-[2px] w-full max-w-[28rem] origin-left bg-[#080808] dark:bg-[#efebe3]"
              aria-hidden="true"
            />

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[34rem] border-l-2 border-[#8b1a1a] pl-4 text-[1.15rem] font-bold leading-7 text-[#080808] dark:text-[#efebe3] sm:text-[1.28rem] sm:leading-8"
            >
              {t('hero_subtitle')}
            </motion.p>
            <motion.p variants={itemVariants} className="mt-2 max-w-[34rem] pl-4 font-display italic text-[1.02rem] leading-7 text-[#080808]/70 dark:text-[#efebe3]/70">
              {t('hero_subtitle_accent')}
            </motion.p>

            <motion.p variants={itemVariants} className="mt-4 max-w-[34rem] border-l border-[#080808]/15 pl-4 font-mono text-[0.72rem] leading-5 text-[#080808]/60 dark:border-white/15 dark:text-[#efebe3]/60">
              {t('hero_note')}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
                className="inline-flex items-center justify-center gap-2 border border-[#080808] bg-[#080808] px-6 py-3 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-[#efebe3] no-underline hover:bg-transparent hover:text-[#080808] dark:border-[#efebe3] dark:bg-[#efebe3] dark:text-[#080808] dark:hover:bg-transparent dark:hover:text-[#efebe3]"
              >
                SPRAWDŹ DOSTĘPNOŚĆ W 24H
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#valuation"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
                className="inline-flex items-center justify-center gap-2 border border-[#080808] bg-transparent px-6 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#080808] no-underline hover:bg-[#080808] hover:text-[#efebe3] dark:border-[#efebe3] dark:text-[#efebe3] dark:hover:bg-[#efebe3] dark:hover:text-[#080808]"
              >
                ZOBACZ WYCENĘ ARCHIWALNĄ
              </a>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808]/50 dark:text-[#efebe3]/50">
              {t('cta_offer_sub')}
            </motion.p>

            {/* Brutalist proof bar — 1.5px top, 1px cells */}
            <motion.div variants={itemVariants} className="mt-9 grid grid-cols-3 border-t-[1.5px] border-[#080808] dark:border-[#efebe3]">
              {proofItems.map((item) => (
                <div key={item.label} className="border-r border-[#080808]/15 px-3 py-5 text-center last:border-r-0 dark:border-white/15 sm:px-4 sm:text-left">
                  <div
                    className="font-display text-[2rem] leading-none tracking-[-0.04em] text-[#080808] dark:text-[#efebe3] sm:text-[2.55rem]"
                    style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
                  >
                    {item.value}
                  </div>
                  <div className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#080808] dark:text-[#efebe3]">{item.label}</div>
                  <div className="mt-1 font-mono text-[0.66rem] leading-4 text-[#080808]/50 dark:text-[#efebe3]/50">{item.sub}</div>
                </div>
              ))}
            </motion.div>

            {/* TL;DR brutalist */}
            <motion.div variants={itemVariants} id="tldr" className="mt-6 border border-[#080808] bg-[#efebe3] p-4 dark:border-white/20 dark:bg-transparent sm:p-5">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#080808] dark:text-[#efebe3]">{t('tldr_title')}</div>
              <ul className="mt-3 space-y-1.5">
                {['tldr_b1', 'tldr_b2', 'tldr_b3', 'tldr_b4', 'tldr_b5'].map((k) => (
                  <li key={k} className="flex gap-2 font-mono text-[0.74rem] leading-6 text-[#080808]/75 dark:text-[#efebe3]/75">
                    <span className="shrink-0 text-[#8b1a1a]">—</span>
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: protocol-card with r3f seal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="relative lg:sticky lg:top-[72px]"
            onHoverStart={() => setSealHovered(true)}
            onHoverEnd={() => setSealHovered(false)}
          >
            <div className="artifact-card protocol-card overflow-hidden border border-[#080808] bg-[#efebe3] dark:border-white/15 dark:bg-[#111318]">
              {/* header rule */}
              <div className="flex items-center justify-between border-b border-[#080808] bg-[#efebe3] px-5 py-3 dark:border-white/15 dark:bg-[#080808]">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#080808] dark:text-[#efebe3]/70">{t('hero_visual_label')}</span>
                <span className="inline-flex items-center border border-[#080808] bg-transparent px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808] dark:border-white/20 dark:text-[#efebe3]/60">
                  {t('hero_visual_tag')}
                </span>
              </div>

              {/* paper artifact */}
              <div className="relative bg-[#efebe3] px-6 py-8 dark:bg-[#111318] sm:px-8 sm:py-9">
                {/* hairline cross — notarial grid */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[#080808]/10 dark:bg-white/10"></div>
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[#080808]/10 dark:bg-white/10"></div>
                {/* corner registration marks */}
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[#080808]/30 dark:border-white/20"></span>
                <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[#080808]/30 dark:border-white/20"></span>
                <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[#080808]/30 dark:border-white/20"></span>
                <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#080808]/30 dark:border-white/20"></span>

                <div className="relative text-center">
                  <div className="font-display text-[5.2rem] leading-none tracking-[-0.06em] text-[#080808] dark:text-[#efebe3] sm:text-[6.2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    <span>hf</span>
                    <span className="font-mono text-[0.9rem] font-normal tracking-[0.14em] text-[#080808]/45 dark:text-[#efebe3]/45" style={{ verticalAlign: 'super', marginLeft: '2px' }}>
                      .pl
                    </span>
                  </div>
                  <div className="mx-auto mt-3 h-px w-16 bg-[#8b1a1a]"></div>
                  <div className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#080808]/60 dark:text-[#efebe3]/50">PL-676 • ARCHIVAL • 1996</div>
                  <div className="mx-auto mt-4 max-w-[18rem] font-mono text-[0.74rem] leading-6 text-[#080808]/60 dark:text-[#efebe3]/60">{t('hero_panel_status_body')}</div>

                  {/* 3D seal area */}
                  <div
                    className="relative mx-auto mt-6 h-[148px] w-[148px]"
                    onMouseEnter={() => setSealHovered(true)}
                    onMouseLeave={() => setSealHovered(false)}
                  >
                    <div className="absolute inset-0">
                      <SealCanvas hovered={sealHovered} />
                    </div>
                    {/* CSS seal overlay — double border red, circular text, hover rotate */}
                    <motion.div
                      animate={{ rotate: sealHovered ? 8 : 0 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border-[1.8px] border-[#8b1a1a] bg-[#efebe3]/10 backdrop-blur-[0.5px] dark:bg-[#080808]/20">
                        <div className="absolute inset-[5px] rounded-full border border-[#8b1a1a]/45"></div>
                        <div className="absolute inset-[10px] rounded-full border border-dashed border-[#8b1a1a]/20"></div>
                        <span className="relative z-10 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[#8b1a1a]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                          hf
                        </span>
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                          <defs>
                            <path id="heroSealCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                          </defs>
                          <text fontSize="6.2" letterSpacing="0.9" fill="#8b1a1a" fontFamily="monospace">
                            <textPath href="#heroSealCircle" startOffset="0%">
                              ARCHIWUM • NASK • 1996 • PL-676 •
                            </textPath>
                          </text>
                        </svg>
                        {/* notarial perforation dots */}
                        <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8b1a1a]"></span>
                        <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8b1a1a]"></span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#8b1a1a]">— PIECZĘĆ ARCHIWALNA —</div>
                </div>

                {/* provenance grid brutalist */}
                <div className="mt-7 grid grid-cols-3 overflow-hidden border border-[#080808] text-center dark:border-white/15">
                  <div className="border-r border-[#080808] px-3 py-3 dark:border-white/15">
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808]/45 dark:text-[#efebe3]/40">REF</div>
                    <div className="mt-1 font-mono text-[0.82rem] font-semibold tracking-[0.02em] text-[#080808] dark:text-[#efebe3]">PL-676</div>
                  </div>
                  <div className="border-r border-[#080808] px-3 py-3 dark:border-white/15">
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808]/45 dark:text-[#efebe3]/40">REJESTR</div>
                    <div className="mt-1 font-mono text-[0.82rem] font-semibold text-[#080808] dark:text-[#efebe3]">NASK</div>
                  </div>
                  <div className="px-3 py-3">
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#080808]/45 dark:text-[#efebe3]/40">STATUS</div>
                    <div className="mt-1 font-mono text-[0.82rem] font-semibold text-[#0a7a3a]">{t('badge_live')}</div>
                  </div>
                </div>
              </div>

              {/* footer proof panels — editorial, no hover lift */}
              <div className="grid border-t border-[#080808] dark:border-white/15 sm:grid-cols-3">
                {[
                  ['hero_panel_status_title', 'hero_panel_status_body'],
                  ['hero_panel_flex_title', 'hero_panel_flex_body'],
                  ['hero_panel_transfer_title', 'hero_panel_transfer_body'],
                ].map(([tk, bk]) => (
                  <div key={tk} className="border-r border-[#080808]/15 px-4 py-4 last:border-r-0 dark:border-white/10">
                    <div className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#8b1a1a]">{t(tk)}</div>
                    <div className="mt-2 font-mono text-[0.74rem] leading-6 text-[#080808]/65 dark:text-[#efebe3]/65">{t(bk)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* archival note under artifact */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/45 dark:text-[#efebe3]/40">NASK • 1996 • PL-676 — {t('provenance_label')}</span>
              <span className="hidden sm:inline font-mono text-[0.60rem] uppercase tracking-[0.12em] text-[#080808]/45 dark:text-[#efebe3]/40">{t('hero_status_value')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
