import React, { useEffect, useRef, useState } from 'react';
import {
  GALLERY_ITEMS,
  HERO_CUTOUT_FALLBACK,
  HERO_CUTOUT_PATH,
  type GalleryItem,
} from '../data/mosasaurusData';

const renderSpecimenBlueprintSvg = (type: GalleryItem['specimenType']) => {
  switch (type) {
    case 'skull':
      return (
        <svg viewBox="0 0 320 160" className="h-32 w-full" aria-hidden="true">
          <path
            d="M20,85 L220,45 L285,68 L295,95 L220,100 L45,105 Z"
            fill="rgba(18,168,190,0.18)"
            stroke="#7CF4F0"
            strokeWidth="1.5"
          />
          <circle cx="215" cy="70" r="14" fill="#020E1A" stroke="#36D6DE" strokeWidth="1.5" />
          <path
            d="M35,88 L50,96 L65,88 L80,96 L95,88 L110,96 L125,88 L140,96 L155,88"
            fill="none"
            stroke="#F4FEFF"
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'skeleton':
      return (
        <svg viewBox="0 0 320 160" className="h-32 w-full" aria-hidden="true">
          <path
            d="M15,80 Q110,55 210,80 T305,72"
            fill="none"
            stroke="#7CF4F0"
            strokeWidth="2.5"
            strokeDasharray="6 3"
          />
          <ellipse cx="95" cy="112" rx="14" ry="28" fill="rgba(54,214,222,0.2)" stroke="#36D6DE" />
          <ellipse cx="195" cy="110" rx="10" ry="22" fill="rgba(54,214,222,0.2)" stroke="#36D6DE" />
        </svg>
      );
    case 'quarry':
      return (
        <svg viewBox="0 0 320 160" className="h-32 w-full" aria-hidden="true">
          <line x1="10" y1="45" x2="310" y2="45" stroke="#36D6DE" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="10" y1="85" x2="310" y2="85" stroke="#7CF4F0" strokeWidth="1.5" />
          <line x1="10" y1="125" x2="310" y2="125" stroke="#12A8BE" strokeWidth="1" />
          <rect x="85" y="62" width="150" height="44" fill="rgba(124,244,240,0.12)" stroke="#7CF4F0" />
        </svg>
      );
    default:
      return (
        <img
          src={HERO_CUTOUT_PATH}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.endsWith(HERO_CUTOUT_FALLBACK)) {
              img.src = HERO_CUTOUT_FALLBACK;
            }
          }}
          alt=""
          referrerPolicy="no-referrer"
          className="mosasaurus-anatomy-graded h-32 w-auto object-contain opacity-85"
        />
      );
  }
};

export const Gallery: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [missingAssets, setMissingAssets] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GALLERY_ITEMS.map((item) => [item.id, true]))
  );
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = GALLERY_ITEMS.findIndex((i) => i.id === lightboxItem.id);
        setLightboxItem(GALLERY_ITEMS[(idx + 1) % GALLERY_ITEMS.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = GALLERY_ITEMS.findIndex((i) => i.id === lightboxItem.id);
        setLightboxItem(
          GALLERY_ITEMS[(idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length]
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem]);

  const scrollTrack = (dir: -1 | 1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 1.4;
    trackRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-[#020E1A] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header + Scroll Controls */}
        <div
          data-scroll-divider
          className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end"
        >
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              11
            </span>
            <div data-scroll-header>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 11 · SPECIMEN PLATES
              </p>
              <h2
                id="gallery-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Archival Gallery
              </h2>
            </div>
          </div>

          <div data-scroll-header className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label="Scroll gallery left"
              className="border border-[#F4FEFF]/20 bg-[#031A2E] px-4 py-2 font-display text-xs tracking-[0.14em] text-[#F4FEFF] uppercase transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label="Scroll gallery right"
              className="border border-[#F4FEFF]/20 bg-[#031A2E] px-4 py-2 font-display text-xs tracking-[0.14em] text-[#F4FEFF] uppercase transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Horizontal Drag-Scroll Track */}
        <div
          ref={trackRef}
          data-scroll-grid
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className={`mt-12 flex gap-6 overflow-x-auto pb-6 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {GALLERY_ITEMS.map((item) => {
            const isMissing = Boolean(missingAssets[item.id]);
            return (
              <figure
                key={item.id}
                className="group flex w-[320px] shrink-0 flex-col justify-between border border-[#F4FEFF]/15 bg-[#031A2E] transition-colors duration-200 hover:border-[#7CF4F0]/60 sm:w-[380px]"
              >
                {/* Image or Clearly Labelled Placeholder */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#F4FEFF]/10 bg-[radial-gradient(circle_at_50%_35%,rgba(10,110,138,0.45),rgba(2,14,26,0.98))]">
                  {!isMissing && (
                    <img
                      src={item.assetPath}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setMissingAssets((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="mosasaurus-anatomy-graded h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {isMissing && (
                    <div className="flex h-full w-full flex-col items-center justify-between p-5 text-center">
                      <div className="flex w-full items-center justify-between font-mono-tabular text-[11px] text-[#7CF4F0]">
                        <span>{item.catalogNumber}</span>
                        <span>PLATE {item.index}</span>
                      </div>

                      <div className="my-auto flex flex-col items-center">
                        {renderSpecimenBlueprintSvg(item.specimenType)}
                        <span className="mt-3 border border-[#7CF4F0]/40 bg-[#020E1A]/90 px-2.5 py-1 font-mono-tabular text-[11px] text-[#7CF4F0]">
                          PLACEHOLDER: {item.assetPath}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#F4FEFF]/55">
                        Drop {item.assetPath.replace('/assets/', '')} into /public/assets/
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption & Lightbox Trigger */}
                <figcaption className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#7CF4F0]">
                      <span className="font-mono-tabular">{item.catalogNumber}</span>
                      <span className="font-mono-tabular text-[#F4FEFF]/55">
                        {item.dimensionsLabel}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-lg tracking-[0.03em] text-[#F4FEFF] uppercase">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#F4FEFF]/80">
                      {item.caption}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxItem(item)}
                    className="mt-5 inline-flex items-center gap-2 border-t border-[#F4FEFF]/10 pt-3 font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase transition-colors hover:text-[#F4FEFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
                  >
                    <span>Inspect Plate {item.index} in Lightbox</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox view: ${lightboxItem.title}`}
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-[85] flex items-center justify-center bg-[#020E1A]/92 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="relative w-full max-w-4xl border border-[#7CF4F0]/50 bg-[#031A2E] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-[#F4FEFF]/15 pb-4">
              <div>
                <span className="font-mono-tabular text-xs text-[#7CF4F0]">
                  {lightboxItem.catalogNumber} · {lightboxItem.assetPath}
                </span>
                <h3 className="mt-1 font-display text-xl text-[#F4FEFF] uppercase sm:text-2xl">
                  {lightboxItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close lightbox"
                className="border border-[#F4FEFF]/25 bg-[#020E1A] px-4 py-2 font-display text-xs tracking-[0.16em] text-[#F4FEFF] uppercase hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
              >
                Close [Esc]
              </button>
            </div>

            <div className="my-6 flex min-h-[260px] flex-col items-center justify-center border border-[#F4FEFF]/10 bg-[#020E1A] p-8 text-center">
              {renderSpecimenBlueprintSvg(lightboxItem.specimenType)}
              <p className="mt-4 font-mono-tabular text-xs text-[#7CF4F0]">
                ASSET SLOT: /public{lightboxItem.assetPath} ({lightboxItem.dimensionsLabel})
              </p>
            </div>

            <p className="text-base leading-relaxed text-[#F4FEFF]/90">
              {lightboxItem.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
