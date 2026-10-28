import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (params.get('autostart') === '1' || prefersReduced) {
      setProgress(100);
      onComplete();
      return;
    }

    const duration = 650;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setFading(true);
        window.setTimeout(() => {
          onComplete();
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Loading Mosasaurus exhibition"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#020E1A] px-6 transition-opacity duration-300 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-display text-xs tracking-[0.22em] text-[#F4FEFF]/70 uppercase">
            Submerging · Maastrichtian Sea
          </span>
          <span className="font-mono-tabular text-sm tracking-widest text-[#7CF4F0]">
            {String(progress).padStart(3, '0')}%
          </span>
        </div>

        {/* Thin line filling like water */}
        <div className="relative h-[1px] w-full overflow-hidden bg-[#F4FEFF]/15">
          <div
            className="h-full bg-gradient-to-r from-[#12A8BE] via-[#36D6DE] to-[#7CF4F0] transition-transform duration-75 ease-out origin-left"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-[11px] tracking-[0.16em] text-[#F4FEFF]/45 uppercase">
          <span>66.0 Ma Horizon</span>
          <button
            type="button"
            onClick={onComplete}
            className="text-[#7CF4F0]/80 underline-offset-4 hover:text-[#F4FEFF] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
          >
            Skip Intro
          </button>
        </div>
      </div>
    </div>
  );
};
