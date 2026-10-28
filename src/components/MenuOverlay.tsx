import React, { useEffect } from 'react';
import {
  HERO_CUTOUT_FALLBACK,
  HERO_CUTOUT_PATH,
  MENU_CHAPTERS,
} from '../data/mosasaurusData';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition Chapters Menu"
      className="fixed inset-0 z-[75] flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#031A2E] via-[#020E1A] to-[#020E1A] px-6 py-6 text-[#F4FEFF] transition-all duration-500 md:px-12 md:py-8"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      {/* Top Bar inside Overlay */}
      <div className="flex items-center justify-between border-b border-[#F4FEFF]/10 pb-5">
        <span className="font-display text-sm tracking-[0.08em] text-[#F4FEFF] uppercase md:text-[15px]">
          MOSASAURUS · ARCHIVE INDEX
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="group flex flex-col items-center gap-1.5 text-[#F4FEFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
        >
          <span
            aria-hidden="true"
            className="block h-[1px] w-20 bg-[#F4FEFF]/85 transition-all duration-200 group-hover:w-28 group-hover:bg-[#7CF4F0]"
          />
          <span className="font-display text-sm tracking-[0.08em] uppercase group-hover:text-[#7CF4F0] md:text-[15px]">
            CLOSE
          </span>
        </button>

        <span className="hidden font-mono-tabular text-xs tracking-widest text-[#7CF4F0]/80 md:inline">
          ESC TO RETURN
        </span>
      </div>

      {/* Main Grid: Numbered Links + Small Copy of Creature Cutout */}
      <div className="mx-auto my-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 py-8 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:col-span-8">
          {MENU_CHAPTERS.map((chapter) => (
            <a
              key={chapter.number}
              href={chapter.href}
              onClick={onClose}
              className="group flex items-baseline justify-between border-b border-[#F4FEFF]/10 py-2.5 transition-colors duration-200 hover:border-[#7CF4F0]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-lg text-[#7CF4F0]/70 transition-colors group-hover:text-[#7CF4F0]">
                  {chapter.number}
                </span>
                <span className="font-display text-lg tracking-[0.04em] text-[#F4FEFF] uppercase transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-[#7CF4F0] md:text-xl">
                  {chapter.label}
                </span>
              </div>
              <span className="font-mono-tabular text-xs text-[#F4FEFF]/45 whitespace-nowrap shrink-0 pl-3 group-hover:text-[#7CF4F0]">
                {chapter.depth}
              </span>
            </a>
          ))}
        </div>

        {/* Small ocean-graded copy of the Mosasaurus creature image */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#F4FEFF]/10 bg-gradient-to-b from-[#07405F]/50 to-[#031A2E]/80 p-6 lg:col-span-4">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_30%,rgba(54,214,222,0.18),transparent_70%)]" />
          <img
            src={HERO_CUTOUT_PATH}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith(HERO_CUTOUT_FALLBACK)) {
                img.src = HERO_CUTOUT_FALLBACK;
              }
            }}
            alt="Mosasaurus hoffmannii specimen preview"
            referrerPolicy="no-referrer"
            className="mosasaurus-anatomy-graded relative z-10 h-44 w-auto object-contain"
          />
          <div className="mt-4 text-center">
            <p className="font-display text-xs tracking-[0.18em] text-[#7CF4F0] uppercase">
              Mosasaurus hoffmannii
            </p>
            <p className="mt-1 text-xs text-[#F4FEFF]/65">
              Late Cretaceous (Campanian–Maastrichtian) · 82–66 Ma
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#F4FEFF]/10 pt-4 text-xs text-[#F4FEFF]/55">
        <span>MUSEUM DIGITAL MONOGRAPH · ORDER SQUAMATA</span>
        <span>DEPTH RANGE: 0 M (SURFACE) — 200 M (MESOPELAGIC BOUNDARY)</span>
      </div>
    </div>
  );
};
