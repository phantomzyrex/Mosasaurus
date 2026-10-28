import React, { useEffect, useRef, useState } from 'react';
import { HERO_CUTOUT_FALLBACK, HERO_CUTOUT_PATH } from '../data/mosasaurusData';
import { computeParallaxOffset } from '../utils/oceanMath';
import { Nav } from './Nav';

interface HeroProps {
  onOpenMenu: () => void;
  isLoaded: boolean;
  scrollProgress: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  depthLayer: number; // 0.35 (far), 0.65 (mid), 1.0 (near)
}

const WORDMARK_LETTERS = 'MOSASAURUS'.split('');

const BUBBLES = [
  { id: 1, left: '37%', top: '42%', size: 5, delay: '0s', duration: '6.5s' },
  { id: 2, left: '41%', top: '45%', size: 3.5, delay: '1.8s', duration: '5.8s' },
  { id: 3, left: '35%', top: '39%', size: 4, delay: '3.2s', duration: '7.1s' },
  { id: 4, left: '44%', top: '41%', size: 6, delay: '2.4s', duration: '6.2s' },
  { id: 5, left: '39%', top: '36%', size: 3, delay: '4.5s', duration: '5.4s' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenMenu, isLoaded, scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerNormRef = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({
    wordmark: { x: 0, y: 0 },
    creature: { x: 0, y: 0 },
    rays: { x: 0, y: 0 },
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Desktop mouse parallax
  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      pointerNormRef.current = { x: normX, y: normY };

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setParallax({
          wordmark: computeParallaxOffset(normX, normY, 12, reducedMotion),
          creature: computeParallaxOffset(normX, normY, -24, reducedMotion),
          rays: computeParallaxOffset(normX, normY, 40, reducedMotion),
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // Marine snow & particles canvas (3 depth layers)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const isLowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const count = reducedMotion ? 30 : isLowPower ? 48 : 85;
    const layers = [0.35, 0.65, 1.0];

    const particles: Particle[] = Array.from({ length: count }, (_, idx) => {
      const depthLayer = layers[idx % layers.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (0.7 + Math.random() * 1.6) * depthLayer,
        alpha: (0.14 + Math.random() * 0.36) * depthLayer,
        vx: (Math.random() - 0.5) * 0.18 * depthLayer,
        vy: (-0.12 - Math.random() * 0.22) * depthLayer,
        depthLayer,
      };
    });

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const px = pointerNormRef.current.x * 60;
      const py = pointerNormRef.current.y * 60;

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const drawX = p.x + (reducedMotion ? 0 : px * p.depthLayer);
        const drawY = p.y + (reducedMotion ? 0 : py * p.depthLayer);

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 254, 255, ${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        animationFrameId = window.setTimeout(renderFrame, 80);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(animationFrameId);
    };
  }, [reducedMotion]);

  // Subtle hero scroll transformation
  const heroScrollFactor = Math.min(1, scrollProgress * 5);
  const wordmarkScale = 1 - heroScrollFactor * 0.06;
  const creatureDriftY = -heroScrollFactor * 42;

  return (
    <section
      id="hero"
      aria-label="Mosasaurus Hero"
      className="relative h-screen min-h-[680px] w-full bg-[#020E1A] p-2.5 sm:p-3.5"
    >
      {/* Full-viewport Frame with 24px Rounded Corners */}
      <div className="hero-ocean-gradient relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#F4FEFF]/10 shadow-[0_0_80px_rgba(2,14,26,0.95)]">
        {/* LAYER 1B: Faint Soft Vertical Light Bands near Top-Left and Top-Right (as in reference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(124,244,240,0.08) 0%, transparent 14%, transparent 86%, rgba(124,244,240,0.08) 100%)',
          }}
        />

        {/* LAYER 2A: Organic Sunlit Surface Caustics in Top 42% of Frame */}
        <div
          aria-hidden="true"
          className="animate-caustics pointer-events-none absolute top-0 right-0 left-0 z-[2] h-[44%] overflow-hidden opacity-30 mix-blend-screen"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 100%)',
          }}
        >
          <div className="absolute -top-12 left-[18%] h-56 w-[36%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,244,240,0.55)_0%,rgba(54,214,222,0.18)_45%,transparent_72%)] blur-2xl" />
          <div className="absolute -top-16 left-[42%] h-64 w-[42%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,254,255,0.5)_0%,rgba(54,214,222,0.22)_50%,transparent_75%)] blur-2xl" />
          <div className="absolute -top-10 left-[64%] h-48 w-[28%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,244,240,0.45)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* LAYER 2B: 6 Swaying Underwater God Rays from the Sunlit Surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-screen transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.rays.x}px, ${parallax.rays.y * 0.4}px, 0)`,
          }}
        >
          <div className="animate-ray-slow absolute -top-24 left-[12%] h-[85%] w-28 origin-top -rotate-6 bg-gradient-to-b from-[#7CF4F0]/30 via-[#36D6DE]/12 to-transparent blur-[34px]" />
          <div className="animate-ray-alt absolute -top-20 left-[28%] h-[92%] w-40 origin-top -rotate-3 bg-gradient-to-b from-[#F4FEFF]/28 via-[#36D6DE]/14 to-transparent blur-[38px]" />
          <div className="animate-ray-slow absolute -top-28 left-[46%] h-[95%] w-52 origin-top rotate-1 bg-gradient-to-b from-[#7CF4F0]/32 via-[#36D6DE]/15 to-transparent blur-[40px]" />
          <div className="animate-ray-alt absolute -top-24 left-[63%] h-[88%] w-36 origin-top rotate-3 bg-gradient-to-b from-[#F4FEFF]/25 via-[#36D6DE]/10 to-transparent blur-[36px]" />
          <div className="animate-ray-slow absolute -top-20 left-[79%] h-[80%] w-28 origin-top rotate-6 bg-gradient-to-b from-[#7CF4F0]/22 via-[#12A8BE]/10 to-transparent blur-[32px]" />
          <div className="animate-ray-alt absolute -top-16 left-[5%] h-[70%] w-20 origin-top -rotate-8 bg-gradient-to-b from-[#36D6DE]/20 to-transparent blur-[30px]" />
        </div>

        {/* LAYER 2C: Marine Snow & Floating Specks Canvas (3 depth layers) */}
        <canvas
          ref={canvasRef}
          data-testid="marine-snow-canvas"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
        />

        {/* LAYER 5 (Top UI): Minimal 3-Part Navigation */}
        <Nav onOpenMenu={onOpenMenu} isScrolledPastHero={false} />

        {/* LAYER 3: GIGANTIC Wordmark "MOSASAURUS" (z-10, sits BEHIND the creature) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[49%] z-10 flex -translate-y-1/2 flex-col items-center justify-center px-4 select-none md:top-[50%]"
          style={{
            transform: `translate3d(${parallax.wordmark.x}px, calc(-50% + ${parallax.wordmark.y}px), 0) scale(${wordmarkScale})`,
          }}
        >
          {/* Desktop & Tablet Single-Line Giant Wordmark (~85% of viewport width) */}
          <h1
            aria-label="MOSASAURUS"
            className="hero-wordmark hidden w-[86vw] max-w-[1600px] items-center justify-between text-center uppercase md:flex"
            style={{
              fontSize: 'clamp(3.75rem, 11.2vw, 13.5rem)',
            }}
          >
            {WORDMARK_LETTERS.map((char, idx) => (
              <span
                key={idx}
                className="inline-block overflow-hidden py-2"
              >
                <span
                  className={`inline-block transition-all duration-700 ease-out ${
                    isLoaded
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-[110%] opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${idx * 60}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Mobile Two-Line Wordmark ("MOSA / SAURUS" at ~22-24vw) */}
          <div
            aria-hidden="true"
            className="hero-wordmark flex flex-col items-center text-center uppercase md:hidden"
            style={{ fontSize: '22.5vw', lineHeight: 0.88 }}
          >
            <span className="tracking-[0.02em]">MOSA</span>
            <span className="tracking-[-0.01em]">SAURUS</span>
          </div>
        </div>

        {/* LAYER 4: Subject Cutout Placed IN FRONT of Wordmark (z-20)
            Positioned so the head/torso overlaps the middle 3-4 letters (S-A-U-R)
            while keeping the first two (M-O) and last two (U-S) letters completely visible */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          style={{
            transform: `translate3d(${parallax.creature.x}px, ${parallax.creature.y + creatureDriftY}px, 0)`,
          }}
        >
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? 'translate-x-0 scale-100 opacity-100 blur-0'
                : 'translate-x-10 scale-[1.08] opacity-0 blur-sm'
            }`}
          >
            {/* Rising Bubbles near Creature's Jaw/Head */}
            {!reducedMotion &&
              BUBBLES.map((b) => (
                <span
                  key={b.id}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-30 rounded-full border border-[#7CF4F0]/60 bg-[#F4FEFF]/25 shadow-[0_0_8px_rgba(124,244,240,0.6)]"
                  style={{
                    left: b.left,
                    top: b.top,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    animation: `bubbleRise ${b.duration} ease-in infinite`,
                    animationDelay: b.delay,
                  }}
                />
              ))}

            {/* Idle Swimming Wrapper */}
            <div className="animate-creature-swim relative flex items-center justify-center">
              {/* Subtle Rim Backlight Aura behind the torso/head */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-[65%] w-[65%] rounded-full bg-[radial-gradient(circle,rgba(124,244,240,0.22)_0%,transparent_70%)] blur-2xl"
              />

              <img
                src={HERO_CUTOUT_PATH}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.src.endsWith(HERO_CUTOUT_FALLBACK)) {
                    img.src = HERO_CUTOUT_FALLBACK;
                  }
                }}
                alt="Mosasaurus hoffmannii swimming in the Late Cretaceous ocean"
                referrerPolicy="no-referrer"
                className="mosasaurus-hero-graded relative z-20 h-auto w-[84vw] max-w-[460px] translate-y-10 object-contain sm:w-[68vw] sm:max-w-[620px] md:w-[54vw] md:max-w-[780px] md:translate-x-[2%] md:translate-y-[4%]"
              />
            </div>
          </div>
        </div>

        {/* LAYER 4B: Depth Haze Over Bottom 30% of Frame so Lower Body Dissolves into Dark Water */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[22] h-[32%] bg-gradient-to-t from-[#031A2E] via-[#07405F]/65 to-transparent"
        />

        {/* LAYER 5 (Bottom HUD): Tagline & "SCROLL TO DESCEND" Hint */}
        <div className="relative z-30 mt-auto flex flex-col items-center justify-end px-6 pb-6 text-center md:pb-8">
          <p className="font-display text-xs tracking-[0.26em] text-[#F4FEFF]/75 uppercase sm:text-sm md:text-base">
            Lord of the Late Cretaceous Seas
          </p>
          <p className="mt-1 text-xs tracking-[0.14em] text-[#7CF4F0]/75">
            82 – 66 Million Years Ago · Order Squamata · Family Mosasauridae
          </p>

          <a
            href="#overview"
            aria-label="Scroll to descend into Overview section"
            className="group mt-5 inline-flex flex-col items-center gap-2 text-[11px] tracking-[0.24em] text-[#F4FEFF]/70 uppercase transition-colors hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
          >
            <span>SCROLL TO DESCEND</span>
            <span
              aria-hidden="true"
              className="block h-6 w-[1px] bg-gradient-to-b from-[#7CF4F0] to-transparent transition-all duration-300 group-hover:h-8"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
