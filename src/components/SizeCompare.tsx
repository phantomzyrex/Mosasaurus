import React, { useEffect, useRef, useState } from 'react';
import { getScaleComparisonMetrics, type EstimateMode } from '../utils/oceanMath';

const renderSilhouetteSvg = (id: string, isHighlighted: boolean) => {
  const fill = isHighlighted ? '#36D6DE' : '#12A8BE';
  const stroke = isHighlighted ? '#7CF4F0' : 'rgba(244,254,255,0.45)';

  switch (id) {
    case 'human':
      return (
        <svg viewBox="0 0 120 36" className="h-7 w-full overflow-visible" aria-hidden="true">
          <circle cx="105" cy="16" r="5.5" fill={fill} stroke={stroke} strokeWidth="1" />
          <path
            d="M15,18 L45,14 L96,13 L98,20 L55,21 L12,24 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
          />
          <path d="M88,13 L112,7 L110,11 L92,16 Z" fill={fill} />
        </svg>
      );
    case 'shark':
      return (
        <svg viewBox="0 0 240 60" className="h-9 w-full overflow-visible" aria-hidden="true">
          <path
            d="M6,30 L28,12 L24,28 L95,20 L115,4 L130,20 L195,22 L236,30 L198,39 L140,38 L120,54 L108,38 L24,33 L28,48 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'orca':
      return (
        <svg viewBox="0 0 280 70" className="h-10 w-full overflow-visible" aria-hidden="true">
          <path
            d="M6,35 L26,18 L22,32 L115,20 L135,2 L152,22 L232,24 L274,36 L236,46 L160,47 L138,65 L122,47 L22,39 L26,52 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'bus':
      return (
        <svg viewBox="0 0 360 72" className="h-11 w-full overflow-visible" aria-hidden="true">
          <rect
            x="6"
            y="10"
            width="346"
            height="44"
            rx="6"
            fill="rgba(10,110,138,0.45)"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <rect x="24" y="16" width="52" height="18" fill="rgba(244,254,255,0.2)" />
          <rect x="86" y="16" width="52" height="18" fill="rgba(244,254,255,0.2)" />
          <rect x="148" y="16" width="52" height="18" fill="rgba(244,254,255,0.2)" />
          <rect x="210" y="16" width="52" height="18" fill="rgba(244,254,255,0.2)" />
          <rect x="272" y="16" width="64" height="22" fill="rgba(244,254,255,0.28)" />
          <circle cx="76" cy="56" r="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="282" cy="56" r="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'mosasaurus':
    default:
      return (
        <svg viewBox="0 0 460 90" className="h-14 w-full overflow-visible" aria-hidden="true">
          <path
            d="M4,44 L36,16 L32,40 L125,34 L215,24 L335,23 L415,29 L456,36 L408,38 L448,47 L402,48 L330,49 L355,78 L332,74 L305,50 L205,51 L225,84 L198,78 L175,49 L95,46 L28,68 L32,48 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <circle cx="408" cy="33" r="2.5" fill="#020E1A" />
        </svg>
      );
  }
};

export const SizeCompare: React.FC = () => {
  const [mode, setMode] = useState<EstimateMode>('conservative');
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const metrics = getScaleComparisonMetrics(mode);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="size"
      aria-labelledby="size-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-[#031A2E] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header + Estimate Toggle */}
        <div
          data-scroll-divider
          className="flex flex-col justify-between gap-8 border-b border-[#F4FEFF]/15 pb-12 lg:flex-row lg:items-end"
        >
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              05
            </span>
            <div data-scroll-header>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 05 · OSTEOLOGICAL SCALING
              </p>
              <h2
                id="size-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Size Comparison
              </h2>
            </div>
          </div>

          {/* Interactive Toggle: Conservative Estimate vs Maximum Disputed Estimate (17 m) */}
          <div
            data-scroll-header
            role="group"
            aria-label="Mosasaurus size estimate mode"
            className="inline-flex flex-wrap gap-1 border border-[#F4FEFF]/20 bg-[#020E1A] p-1"
          >
            <button
              type="button"
              onClick={() => setMode('conservative')}
              aria-pressed={mode === 'conservative'}
              className={`px-4 py-2 font-display text-xs tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-all duration-300 ease-ocean focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] ${
                mode === 'conservative'
                  ? 'bg-[#36D6DE] text-[#020E1A] font-medium shadow-[0_0_18px_rgba(54,214,222,0.45)]'
                  : 'text-[#F4FEFF]/75 hover:text-[#F4FEFF]'
              }`}
            >
              Conservative estimate (11–12 m)
            </button>
            <button
              type="button"
              onClick={() => setMode('maximum')}
              aria-pressed={mode === 'maximum'}
              className={`px-4 py-2 font-display text-xs tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-all duration-300 ease-ocean focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] ${
                mode === 'maximum'
                  ? 'bg-[#36D6DE] text-[#020E1A] font-medium shadow-[0_0_18px_rgba(54,214,222,0.45)]'
                  : 'text-[#F4FEFF]/75 hover:text-[#F4FEFF]'
              }`}
            >
              Maximum disputed estimate (17 m)
            </button>
          </div>
        </div>

        {/* Metric Grid Scale Header (0 m to 18 m) */}
        <div
          data-scroll-reveal
          className="mt-12 border border-[#F4FEFF]/15 bg-[#020E1A]/90 p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between border-b border-[#F4FEFF]/15 pb-3 font-mono-tabular text-xs text-[#7CF4F0]">
            <span>0 m</span>
            <span>3 m</span>
            <span>6 m</span>
            <span>9 m</span>
            <span>12 m</span>
            <span>15 m</span>
            <span>18 m</span>
          </div>

          {/* Silhouette Scale Rows */}
          <div data-scroll-grid className="space-y-8">
            {metrics.map((item, idx) => (
              <div
                key={item.id}
                data-testid={`size-row-${item.id}`}
                className={`border-b border-[#F4FEFF]/10 pb-6 transition-all duration-300 last:border-b-0 last:pb-0 ${
                  item.isMosasaurus
                    ? 'rounded-sm border border-[#7CF4F0]/45 bg-[#07405F]/35 p-4 shadow-[0_0_32px_rgba(10,110,138,0.25)]'
                    : ''
                }`}
              >
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3
                      className={`font-display text-lg tracking-[0.04em] uppercase ${
                        item.isMosasaurus ? 'text-[#7CF4F0]' : 'text-[#F4FEFF]'
                      }`}
                    >
                      {item.name}
                    </h3>
                    <span className="text-xs text-[#F4FEFF]/60">
                      {item.subtitle}
                    </span>
                  </div>

                  <span
                    data-testid={item.isMosasaurus ? 'mosasaurus-scale-value' : undefined}
                    className="font-mono-tabular text-sm text-[#7CF4F0] transition-all duration-300"
                  >
                    {item.activeLabel}
                  </span>
                </div>

                {/* Proportional Bar + Vector Silhouette with Smooth Slide-In */}
                <div className="relative w-full overflow-hidden bg-[#031A2E]/90 py-3 px-2">
                  <div
                    className="transition-all duration-700 ease-ocean"
                    style={{
                      width: inView ? `${item.widthPercent}%` : '8%',
                      transitionDelay: `${idx * 60}ms`,
                    }}
                  >
                    {renderSilhouetteSvg(item.id, Boolean(item.isMosasaurus))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodological Footnote */}
          <div className="mt-8 border-t border-[#F4FEFF]/15 pt-4 text-xs leading-relaxed text-[#F4FEFF]/70">
            <strong className="font-medium text-[#7CF4F0] uppercase tracking-wider">
              Scaling Note:{' '}
            </strong>
            Modern revisions of <em>Mosasaurus hoffmannii</em> (Grigoriev, 2014;
            Street &amp; Caldwell, 2017) apply a jaw-to-body ratio of roughly
            1:7.5, placing large adults at{' '}
            <strong>about 11–12 m (36–40 ft)</strong>—roughly equal to a city
            bus. Older 19th- and 20th-century extrapolations assumed a more
            elongate lizard ratio (1:10+), yielding the disputed{' '}
            <strong>~17 m (56 ft)</strong> upper figure.
          </div>
        </div>
      </div>
    </section>
  );
};
