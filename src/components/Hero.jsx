import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Mail } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const proofPanelKeys = [
  ['hero_panel_status_title', 'hero_panel_status_body'],
  ['hero_panel_flex_title', 'hero_panel_flex_body'],
  ['hero_panel_transfer_title', 'hero_panel_transfer_body'],
];

const SHAPES = ['circle', 'square', 'triangle'];
const COLORS = ['#f3efe7', '#cfb68b', '#a7bed8', '#f6d8a8', '#93b4ff'];

export function Hero() {
  const { t } = useTranslation();
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef(0);
  const trackedInteractionRef = useRef(false);

  const proofItems = [
    { value: t('metric_1_value'), label: t('metric_1_label') },
    { value: t('metric_2_value'), label: t('metric_2_label') },
    { value: t('metric_3_value'), label: t('metric_3_label') },
  ];

  useEffect(() => {
    if (!boxRef.current || !canvasRef.current) {
      return undefined;
    }

    const box = boxRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particlesRef.current = Array.from({ length: 22 }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        size: 12 + Math.random() * 34,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.032,
        shape: SHAPES[index % SHAPES.length],
        color: COLORS[index % COLORS.length],
      }));
    };

    const drawShape = (particle) => {
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.globalAlpha = 0.88;

      if (particle.shape === 'circle') {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.46, 0, Math.PI * 2);
        context.fill();
      } else if (particle.shape === 'square') {
        const edge = particle.size * 0.9;
        context.fillRect(-edge / 2, -edge / 2, edge, edge);
      } else {
        context.beginPath();
        context.moveTo(0, -particle.size * 0.52);
        context.lineTo(particle.size * 0.44, particle.size * 0.36);
        context.lineTo(-particle.size * 0.44, particle.size * 0.36);
        context.closePath();
        context.fill();
      }

      context.restore();
    };

    const step = (time) => {
      const width = box.clientWidth;
      const height = box.clientHeight;

      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0d1726');
      gradient.addColorStop(0.5, '#16233a');
      gradient.addColorStop(1, '#0b111c');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        const pointer = pointerRef.current;
        const dxCenter = width * 0.5 - particle.x;
        const dyCenter = height * 0.5 - particle.y;

        particle.vx += dxCenter * 0.00045;
        particle.vy += dyCenter * 0.00035;
        particle.vx += Math.sin(time * 0.0009 + index * 0.4) * 0.013;
        particle.vy += Math.cos(time * 0.0011 + index * 0.3) * 0.009;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          if (distance < 180) {
            const force = ((180 - distance) / 180) * 0.95;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= 0.987;
        particle.vy *= 0.987;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.vr;

        const bound = particle.size * 0.52;
        if (particle.x < bound || particle.x > width - bound) {
          particle.vx *= -0.84;
          particle.x = Math.min(Math.max(particle.x, bound), width - bound);
        }
        if (particle.y < bound || particle.y > height - bound) {
          particle.vy *= -0.84;
          particle.y = Math.min(Math.max(particle.y, bound), height - bound);
        }

        drawShape(particle);
      });

      animationRef.current = window.requestAnimationFrame(step);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(box);

    if (!reducedMotion) {
      animationRef.current = window.requestAnimationFrame(step);
    }

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (event) => {
    if (!boxRef.current) {
      return;
    }
    const rect = boxRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };

    if (!trackedInteractionRef.current) {
      trackedInteractionRef.current = true;
      trackEvent('hero_interact', { area: 'antigravity_abstract' });
    }
  };

  return (
    <section className="section-shell section-tone-light reveal reveal-up relative overflow-hidden pt-32 sm:pt-36 lg:pt-40" id="hero">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-primary/12 blur-3xl"></div>
        <div className="absolute bottom-[14%] right-[12%] h-56 w-56 rounded-full bg-surface-offset/8 blur-3xl"></div>
      </div>

      <div className="section-frame grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] lg:gap-16">
        <div className="max-w-[40rem]">
          <div className="eyebrow reveal reveal-left">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            {t('badge')}
          </div>
          <h1 className="display-title reveal reveal-up text-balance text-[clamp(4.75rem,2.4rem+9vw,10rem)] leading-[0.86]">
            <span className="gold-gradient bg-clip-text text-transparent">{t('domain_prefix')}</span>
            <span className="text-text-faint">.pl</span>
          </h1>
          <p className="mt-6 max-w-[36rem] text-balance text-lg leading-8 text-text-muted sm:text-xl reveal reveal-up">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 reveal reveal-up">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'hero', target: 'mailto' })}
              className="action-pill hoverable bg-text text-bg no-underline"
            >
              <Mail size={16} />
              {t('cta_offer')}
            </a>
            <a
              href="#valuation"
              onClick={() => trackEvent('cta_click', { location: 'hero', target: 'valuation' })}
              className="action-pill hoverable border border-border bg-surface/90 text-text no-underline"
            >
              {t('cta_valuation')}
              <ArrowDown size={15} />
            </a>
          </div>
          <p className="mt-5 max-w-[34rem] text-sm leading-7 text-text-muted reveal reveal-up">{t('hero_note')}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {proofItems.map((item) => (
              <div key={item.label} className="interactive-card reveal reveal-up rounded-[1.5rem] border border-border bg-surface/90 p-5">
                <dt className="text-xs uppercase tracking-[0.18em] text-text-faint">{item.label}</dt>
                <dd className="stat-value mt-3 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-none text-text">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative reveal reveal-right">
          <div className="hero-shadow parallax-sheen relative overflow-hidden rounded-[2rem] border border-border bg-surface-offset px-6 py-6 text-white sm:px-8">
            <div className="backdrop-grain absolute inset-0 opacity-80"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.22em] text-white/65">
                <span>{t('hero_visual_label')}</span>
                <span>{t('hero_visual_tag')}</span>
              </div>
              <div className="relative mt-8 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,#1f2a39_0%,#101720_80%)] px-6 py-8 sm:px-8">
                <div className="absolute inset-x-10 top-6 h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] [animation:pulseLine_3.2s_ease-in-out_infinite]"></div>
                <div
                  ref={boxRef}
                  onMouseMove={handlePointerMove}
                  onMouseLeave={() => {
                    pointerRef.current.active = false;
                  }}
                  className="hf-antigravity-box relative mx-auto h-[260px] w-full max-w-[420px] cursor-none overflow-hidden rounded-[1.3rem] border border-white/12"
                  role="img"
                  aria-label={t('hero_art_alt')}
                >
                  <canvas ref={canvasRef} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {proofPanelKeys.map(([titleKey, bodyKey]) => (
                  <div key={titleKey} className="interactive-card rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">{t(titleKey)}</p>
                    <p className="mt-2 text-sm leading-6 text-white/78">{t(bodyKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
