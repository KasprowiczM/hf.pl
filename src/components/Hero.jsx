/* eslint-disable no-unused-vars */
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function SealMesh({ hovered }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (hovered ? 1.1 : 0.24);
    }
  });
  return (
    <group>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.14, 64]} />
        <meshStandardMaterial color="#e30613" roughness={0.42} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.02, 64]} />
        <meshStandardMaterial color="#f6f1e8" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[0.82, 0.84, 64]} />
        <meshBasicMaterial color="#e30613" transparent opacity={0.9} side={2} />
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
  const shouldReduceMotion = useReducedMotion();
  const [sealHovered, setSealHovered] = useState(false);
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const leftColRef = useRef(null);
  const sealWrapRef = useRef(null);

  const proofItems = [
    { value: t('metric_1_value'), label: t('metric_1_label'), sub: t('metric_1_sub') },
    { value: t('metric_2_value'), label: t('metric_2_label'), sub: t('metric_2_sub') },
    { value: t('metric_3_value'), label: t('metric_3_label'), sub: t('metric_3_sub') },
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
    if (isTestEnv) return;
    let ctx;
    try {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // hero split words — clipPath inset scrub 0.7 (Swiss, brief)
        const lines = gsap.utils.toArray('.hero-slogan-line-inner');
        lines.forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 88%',
                end: 'top 28%',
                scrub: 0.7,
              },
            }
          );
        });

        // pin ONLY hero WORD wrapper — pinSpacing true, wrapper is trigger (no overlap)
        if (pinWrapperRef.current && leftColRef.current) {
          ScrollTrigger.create({
            trigger: pinWrapperRef.current,
            start: 'top top',
            end: '+=720',
            pin: leftColRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            // refreshPriority ensures correct order vs scarcity pin
            refreshPriority: 1,
          });
        }

        // seal rotate on scroll scrub
        if (sealWrapRef.current) {
          gsap.to(sealWrapRef.current, {
            rotation: 180,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=720',
              scrub: 1.4,
            },
          });
        }
      }, sectionRef);
    } catch {
      // ignore
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [shouldReduceMotion]);

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
      ref={sectionRef}
      className="section-shell relative overflow-hidden bg-[#f6f1e8] dark:bg-[#07080a] pt-[52px] hairline-bottom"
      id="hero"
      style={{ borderBottom: '1px solid rgba(10,10,10,0.08)', minHeight: 'auto' }}
    >
      {/* Swiss provenance top rule — paper */}
      <div className="border-b border-[rgba(10,10,10,0.08)] bg-[#f6f1e8] dark:border-white/10 dark:bg-[#07080a]">
        <div className="section-frame flex flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-10">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#4a4642] dark:text-[#f6f1e8]/60 sm:text-[0.60rem]">
            NASK • ARCHIWUM PL-676 • 1996 — Nr 676/1996 • PROTOKÓŁ PRZEKAZANIA — SYSTEM REJESTRU DN
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#0a0a0a]/55 dark:text-[#f6f1e8]/45">
            <span className="h-px w-6 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
            REJESTR NASK
          </span>
        </div>
      </div>

      <div className="section-frame px-4 sm:px-6 lg:px-10">
        {/* Swiss 12col grid — rigid */}
        <div className="swiss-grid items-start pt-8 sm:pt-10 lg:pt-12">
          {/* Left — pin-wrapper ensures Spacer, not overlap; trigger is wrapper */}
          <div ref={pinWrapperRef} className="pin-wrapper contents lg:block lg:col-span-7">
            <motion.div
              ref={leftColRef}
              className="max-w-[40rem] will-change-transform col-span-12 lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              style={{ gridColumn: undefined }}
            >
            {/* badge — mono RED 10px 0.18em — Swiss — NO fill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">
              <span className="h-[1.5px] w-4 bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
              — NASK 1/676 —
            </motion.div>

            {/* H1 — 2 LITERY. (ink + red dot) / 0 KONKURENCJI. (red) — Instrument Serif 8rem -0.06 */}
            <motion.h1
              variants={itemVariants}
              className="mt-3 font-display leading-[0.82] tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8]"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(3.4rem, 1.8rem + 7vw, 8rem)' }}
              aria-label="2 LITERY. 0 KONKURENCJI."
            >
              <span className="hero-slogan-line block overflow-hidden leading-[0.82]">
                <span className="hero-slogan-line-inner block will-change-transform">
                  2 LITERY<span className="text-[#e30613] dark:text-[#ff1a2b]">.</span>
                </span>
              </span>
              <span className="hero-slogan-line block overflow-hidden leading-[0.82] text-[#e30613] dark:text-[#ff1a2b]">
                <span className="hero-slogan-line-inner block will-change-transform">0 KONKURENCJI.</span>
              </span>
            </motion.h1>

            {/* red 2px rule — Swiss */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.62, ease: 'easeOut', delay: 0.45 }}
              className="mt-4 h-[2px] w-full max-w-[28rem] origin-left bg-[#e30613] dark:bg-[#ff1a2b]"
              aria-hidden="true"
            />

            {/* signal slogan — Swiss caps : DŁUGIE GINĄ. KRÓTKIE ZOSTAJĄ. */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[34rem] border-l-2 border-[#e30613] dark:border-[#ff1a2b] pl-4 text-[1.02rem] font-bold leading-6 tracking-[-0.015em] text-[#0a0a0a] dark:text-[#f6f1e8] sm:text-[1.06rem]"
            >
              DŁUGIE GINĄ. KRÓTKIE ZOSTAJĄ.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="max-w-[34rem] pl-4 font-mono text-[0.72rem] leading-5 tracking-[0.08em] text-[#4a4642] dark:text-[#f6f1e8]/60"
            >
              {t('hero_subtitle_accent')}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.a
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                href="mailto:domain@hf.pl"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
                className="inline-flex items-center justify-center gap-2 border border-[#0a0a0a] bg-[#0a0a0a] px-6 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#f6f1e8] no-underline hover:bg-transparent hover:text-[#0a0a0a] dark:border-[#f6f1e8] dark:bg-[#f6f1e8] dark:text-[#07080a] dark:hover:bg-transparent dark:hover:text-[#f6f1e8]"
                style={{ borderRadius: '4px' }}
              >
                SPRAWDŹ DOSTĘPNOŚĆ W 24H
                <ArrowRight size={15} aria-hidden="true" />
              </motion.a>
              <motion.a
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { y: 0 }}
                href="#valuation"
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(10,10,10,0.14)] bg-transparent px-6 py-3 font-mono text-[0.70rem] font-bold uppercase tracking-[0.12em] text-[#0a0a0a] no-underline hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f6f1e8] dark:border-white/18 dark:text-[#f6f1e8] dark:hover:bg-[#f6f1e8] dark:hover:text-[#07080a]"
                style={{ borderRadius: '4px' }}
              >
                ZOBACZ WYCENĘ
              </motion.a>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8a8683]">
              {t('cta_offer_sub')}
            </motion.p>

            {/* proof bar — 1.5px ink top, hairline dividers — Swiss */}
            <motion.div variants={itemVariants} className="mt-9 grid grid-cols-3 border-t-[1.5px] border-[#0a0a0a] dark:border-[#f6f1e8]/18">
              {proofItems.map((item) => (
                <div key={item.label} className="border-r border-[rgba(10,10,10,0.08)] px-3 py-5 text-center last:border-r-0 dark:border-white/10 sm:px-4 sm:text-left">
                  <div
                    className="font-display text-[2rem] leading-none tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8] sm:text-[2.55rem]"
                    style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
                  >
                    {item.value}
                  </div>
                  <div className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#0a0a0a] dark:text-[#f6f1e8]">{item.label}</div>
                  <div className="mt-1 font-mono text-[0.66rem] leading-4 text-[#8a8683] line-clamp-1">{item.sub}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              id="tldr"
              className="mt-6 border border-[rgba(10,10,10,0.08)] bg-[#fdf8ef] p-4 dark:border-white/12 dark:bg-[#111418] sm:p-5"
              style={{ borderRadius: '4px' }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e30613] dark:text-[#ff1a2b]">{t('tldr_title')}</div>
              <ul className="mt-3 space-y-1.5">
                {['tldr_b1', 'tldr_b2', 'tldr_b3', 'tldr_b4', 'tldr_b5'].map((k) => (
                  <li key={k} className="flex gap-2 font-mono text-[0.74rem] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/75">
                    <span className="shrink-0 text-[#e30613] dark:text-[#ff1a2b]">—</span>
                    <span className="line-clamp-1">{t(k)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            </motion.div>
          </div>

          {/* Right: Swiss artifact card — paper #fdf8ef, 1.5px ink outer? Actually 1px line + radius 4 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="relative col-span-12 mt-8 lg:col-span-5 lg:mt-0 lg:relative"
            onHoverStart={() => setSealHovered(true)}
            onHoverEnd={() => setSealHovered(false)}
          >
            <div className="artifact-card swiss-card--ink overflow-hidden border border-[#0a0a0a] bg-[#fdf8ef] dark:border-white/14 dark:bg-[#111418]" style={{ borderRadius: '4px' }}>
              <div className="flex items-center justify-between border-b border-[rgba(10,10,10,0.08)] bg-[#fdf8ef] px-5 py-3 dark:border-white/10 dark:bg-[#111418]">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8683]">{t('hero_visual_label')}</span>
                <span className="inline-flex items-center border border-[#e30613] bg-transparent px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#e30613] dark:border-[#ff1a2b] dark:text-[#ff1a2b]" style={{ borderRadius: '4px' }}>
                  {t('hero_visual_tag')}
                </span>
              </div>

              <div className="relative bg-[#fdf8ef] px-6 py-8 dark:bg-[#111418] sm:px-8 sm:py-9">
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[rgba(10,10,10,0.06)] dark:bg-white/10"></div>
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[rgba(10,10,10,0.06)] dark:bg-white/10"></div>
                <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>
                <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[rgba(10,10,10,0.12)] dark:border-white/12"></span>

                <div className="relative text-center">
                  <div className="font-display flex items-baseline justify-center gap-[2px] text-[5.2rem] leading-none tracking-[-0.06em] text-[#0a0a0a] dark:text-[#f6f1e8] sm:text-[6.2rem]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    <span>hf</span>
                    <span className="inline-block h-[7px] w-[7px] self-center rounded-full bg-[#e30613] dark:bg-[#ff1a2b]" aria-hidden="true" />
                    <span className="font-mono text-[0.9rem] font-normal tracking-[0.14em] text-[#0a0a0a] dark:text-[#f6f1e8]" style={{ verticalAlign: 'baseline' }}>
                      pl
                    </span>
                  </div>
                  <div className="mx-auto mt-3 h-[2px] w-16 bg-[#e30613] dark:bg-[#ff1a2b]"></div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8683]">PL-676 • ARCHIVAL • 1996</div>
                  <div className="mx-auto mt-4 max-w-[18rem] font-mono text-[0.72rem] leading-6 text-[#4a4642] dark:text-[#f6f1e8]/60 line-clamp-1">{t('hero_panel_status_body')}</div>

                  <div
                    className="relative mx-auto mt-6 h-[148px] w-[148px]"
                    onMouseEnter={() => setSealHovered(true)}
                    onMouseLeave={() => setSealHovered(false)}
                  >
                    <div className="absolute inset-0">
                      <SealCanvas hovered={sealHovered} />
                    </div>
                    <motion.div
                      ref={sealWrapRef}
                      animate={{ rotate: sealHovered ? 8 : 0 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
                    >
                      <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border-[1.8px] border-[#e30613] bg-[#fdf8ef]/10 backdrop-blur-[0.5px] dark:bg-[#07080a]/20 dark:border-[#ff1a2b]">
                        <div className="absolute inset-[5px] rounded-full border border-[#e30613]/45 dark:border-[#ff1a2b]/45"></div>
                        <div className="absolute inset-[10px] rounded-full border border-dashed border-[#e30613]/20 dark:border-[#ff1a2b]/20"></div>
                        <span className="relative z-10 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[#e30613] dark:text-[#ff1a2b]" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                          hf
                        </span>
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                          <defs>
                            <path id="heroSealCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                          </defs>
                          <text fontSize="6.2" letterSpacing="0.9" fill="#e30613" fontFamily="monospace">
                            <textPath href="#heroSealCircle" startOffset="0%">
                              ARCHIWUM • NASK • 1996 • PL-676 •
                            </textPath>
                          </text>
                        </svg>
                        <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#e30613] dark:bg-[#ff1a2b]"></span>
                        <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#e30613] dark:bg-[#ff1a2b]"></span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-5 flex justify-center gap-2">
                    {['1996', 'NASK', 'PL-676'].map((lbl) => (
                      <span key={lbl} className="border border-[rgba(10,10,10,0.08)] bg-white px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-[#8a8683] dark:border-white/10 dark:bg-[#171a1e] dark:text-white/50" style={{ borderRadius: '4px' }}>
                        {lbl}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-0 border border-[rgba(10,10,10,0.08)] text-left dark:border-white/10" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="border-r border-[rgba(10,10,10,0.08)] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#171a1e]">
                      <div className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#e30613] dark:text-[#ff1a2b]">{t('hero_panel_status_title')}</div>
                      <div className="mt-1 font-mono text-[0.70rem] leading-5 text-[#0a0a0a]/70 dark:text-[#f6f1e8]/70 line-clamp-1">{t('hero_panel_status_body')}</div>
                    </div>
                    <div className="bg-white px-4 py-3 dark:bg-[#171a1e]">
                      <div className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#e30613] dark:text-[#ff1a2b]">{t('hero_panel_flex_title')}</div>
                      <div className="mt-1 font-mono text-[0.70rem] leading-5 text-[#0a0a0a]/70 dark:text-[#f6f1e8]/70 line-clamp-1">{t('hero_panel_flex_body')}</div>
                    </div>
                  </div>

                  <div className="mt-3 border border-dashed border-[rgba(10,10,10,0.10)] px-4 py-3 dark:border-white/10" style={{ borderRadius: '4px' }}>
                    <div className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-[#e30613] dark:text-[#ff1a2b]">{t('hero_panel_transfer_title')}</div>
                    <div className="mt-1 font-mono text-[0.70rem] leading-5 text-[#4a4642] dark:text-[#f6f1e8]/60 line-clamp-1">{t('hero_panel_transfer_body')}</div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-[rgba(10,10,10,0.08)] pt-3 dark:border-white/10">
                    <span className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-[#8a8683]">PL-676 • Nr 676/1996 • ARCHIWUM</span>
                    <span className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-[#8a8683]">PODPIS ————————</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#8a8683] lg:block">NASK • 676 • 1996 — {t('provenance_label')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
