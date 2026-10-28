import React, { useState } from 'react';
import {
  ANATOMY_HOTSPOTS,
  HERO_CUTOUT_FALLBACK,
  HERO_CUTOUT_PATH,
  SIDE_CUTOUT_PATH,
} from '../data/mosasaurusData';
import { getHotspotById } from '../utils/oceanMath';

export const AnatomyHotspots: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ANATOMY_HOTSPOTS[0].id);
  const activeHotspot = getHotspotById(activeId);
  const activeIndex = ANATOMY_HOTSPOTS.findIndex((h) => h.id === activeId);

  const selectPrev = () => {
    const prevIdx =
      (activeIndex - 1 + ANATOMY_HOTSPOTS.length) % ANATOMY_HOTSPOTS.length;
    setActiveId(ANATOMY_HOTSPOTS[prevIdx].id);
  };

  const selectNext = () => {
    const nextIdx = (activeIndex + 1) % ANATOMY_HOTSPOTS.length;
    setActiveId(ANATOMY_HOTSPOTS[nextIdx].id);
  };

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-gradient-to-b from-[#020E1A] via-[#031A2E] to-[#020E1A] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          data-scroll-divider
          className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end"
        >
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              04
            </span>
            <div data-scroll-header>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 04 · FUNCTIONAL MORPHOLOGY
              </p>
              <h2
                id="anatomy-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Anatomical Atlas
              </h2>
            </div>
          </div>

          <p data-scroll-header className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            Select any of the 9 anatomical markers on the specimen profile to
            inspect cranial mechanics, sensory adaptations, propulsion, and
            thermoregulation.
          </p>
        </div>

        {/* Interactive Specimen Viewport + Active Tooltip Card */}
        <div data-scroll-reveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Annotated Specimen Canvas (8 cols) */}
          <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border border-[#F4FEFF]/15 bg-[radial-gradient(ellipse_at_50%_40%,rgba(10,110,138,0.45)_0%,rgba(3,26,46,0.92)_70%,rgba(2,14,26,1)_100%)] p-6 sm:min-h-[460px] lg:col-span-8">
            {/* Subtle Bathymetric Crosshair Grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(244,254,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,254,255,0.18) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            <div className="relative z-10 flex items-center justify-between text-xs text-[#F4FEFF]/60">
              <span className="font-mono-tabular">
                SPECIMEN PROFILE · LATERAL-OBLIQUE VIEW
              </span>
              <span className="font-mono-tabular text-[#7CF4F0]">
                ACTIVE MARKER: {activeHotspot.number} / 09
              </span>
            </div>

            {/* Creature Cutout + Interactive Hotspot Pins */}
            <div className="relative my-6 flex w-full items-center justify-center py-4">
              <div className="relative w-full max-w-[680px]">
                <img
                  src={SIDE_CUTOUT_PATH}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('mosasaurus-side.png')) {
                      img.src = HERO_CUTOUT_PATH;
                    } else if (!img.src.endsWith(HERO_CUTOUT_FALLBACK)) {
                      img.src = HERO_CUTOUT_FALLBACK;
                    }
                  }}
                  alt="Annotated Mosasaurus hoffmannii anatomical profile"
                  referrerPolicy="no-referrer"
                  className="mosasaurus-anatomy-graded h-auto w-full object-contain select-none"
                />

                {/* 9 Interactive Hotspot Buttons */}
                {ANATOMY_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveId(spot.id)}
                      aria-label={`Anatomical hotspot ${spot.number}: ${spot.title}`}
                      aria-pressed={isActive}
                      style={{
                        left: `${spot.xPercent}%`,
                        top: `${spot.yPercent}%`,
                      }}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border font-mono-tabular text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0] sm:h-9 sm:w-9 ${
                        isActive
                          ? 'z-30 scale-115 border-[#F4FEFF] bg-[#36D6DE] text-[#020E1A] shadow-[0_0_20px_rgba(124,244,240,0.95)]'
                          : 'z-20 border-[#7CF4F0]/70 bg-[#020E1A]/85 text-[#F4FEFF] hover:scale-110 hover:border-[#F4FEFF] hover:bg-[#0A6E8A]'
                      }`}
                    >
                      <span>{spot.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Scale Bar inside Viewport */}
            <div className="relative z-10 flex items-center justify-between border-t border-[#F4FEFF]/10 pt-3 font-mono-tabular text-[11px] text-[#F4FEFF]/55">
              <span>CRANIAL LENGTH: ~1.5 M [ESTIMATE]</span>
              <span>TOTAL LENGTH: ~11–12 M [ESTIMATE]</span>
            </div>
          </div>

          {/* Active Hotspot Scientific Tooltip Panel (4 cols) */}
          <div
            aria-live="polite"
            data-testid="anatomy-detail-panel"
            className="flex flex-col justify-between border border-[#7CF4F0]/40 bg-[#031A2E] p-6 sm:p-8 lg:col-span-4"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#F4FEFF]/10 pb-4">
                <span className="font-mono-tabular text-xs tracking-widest text-[#7CF4F0]">
                  ANATOMY NODE {activeHotspot.number}
                </span>
                {activeHotspot.isEstimate && (
                  <span className="font-mono-tabular text-xs text-[#F4FEFF]/60">
                    [Estimate / Inferred]
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-2xl tracking-[0.03em] text-[#F4FEFF] uppercase">
                {activeHotspot.title}
              </h3>
              <p className="mt-1 font-display text-xs tracking-[0.18em] text-[#36D6DE] uppercase">
                {activeHotspot.shortLabel}
              </p>

              <p className="mt-5 text-base leading-[1.75] text-[#F4FEFF]/90">
                {activeHotspot.description}
              </p>

              {activeHotspot.citation && (
                <p className="mt-4 border-t border-[#F4FEFF]/10 pt-3 font-mono-tabular text-xs text-[#7CF4F0]/85">
                  Primary Reference: {activeHotspot.citation}
                </p>
              )}
            </div>

            {/* Prev / Next Navigation Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-[#F4FEFF]/15 pt-4">
              <button
                type="button"
                onClick={selectPrev}
                className="border border-[#F4FEFF]/20 bg-[#020E1A] px-4 py-2 font-display text-xs tracking-[0.16em] text-[#F4FEFF] uppercase transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
              >
                Prev Node
              </button>
              <span className="font-mono-tabular text-xs text-[#F4FEFF]/60">
                {activeIndex + 1} / {ANATOMY_HOTSPOTS.length}
              </span>
              <button
                type="button"
                onClick={selectNext}
                className="border border-[#F4FEFF]/20 bg-[#020E1A] px-4 py-2 font-display text-xs tracking-[0.16em] text-[#F4FEFF] uppercase transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
              >
                Next Node
              </button>
            </div>
          </div>
        </div>

        {/* Quick-Access Button Strip for All 9 Anatomical Systems */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-9">
          {ANATOMY_HOTSPOTS.map((spot) => {
            const isActive = spot.id === activeId;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveId(spot.id)}
                className={`flex flex-col items-start border p-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] ${
                  isActive
                    ? 'border-[#7CF4F0] bg-[#07405F]/65 text-[#F4FEFF]'
                    : 'border-[#F4FEFF]/10 bg-[#020E1A]/80 text-[#F4FEFF]/70 hover:border-[#F4FEFF]/30 hover:text-[#F4FEFF]'
                }`}
              >
                <span className="font-mono-tabular text-[11px] text-[#7CF4F0]">
                  {spot.number}
                </span>
                <span className="mt-1 font-display text-xs tracking-[0.04em] uppercase line-clamp-1">
                  {spot.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
