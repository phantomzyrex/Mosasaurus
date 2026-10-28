import React from 'react';
import { MENU_CHAPTERS } from '../data/mosasaurusData';
import { getPelagicZoneLabel, type DiveActionType } from '../utils/oceanMath';

interface DepthGaugeProps {
  depthMeters: number;
  activeChapterIndex?: number;
  onSelectChapter?: (index: number, action: DiveActionType) => void;
}

export const DepthGauge: React.FC<DepthGaugeProps> = ({
  depthMeters,
  activeChapterIndex = 0,
  onSelectChapter,
}) => {
  const zoneLabel = getPelagicZoneLabel(depthMeters);
  const progressPct = Math.min(100, Math.max(0, (depthMeters / 200) * 100));
  const currentChapter = MENU_CHAPTERS[activeChapterIndex] ?? MENU_CHAPTERS[0];

  return (
    <aside
      aria-label="Ocean Depth Gauge"
      data-testid="depth-gauge"
      className="pointer-events-none fixed top-1/2 right-3.5 z-30 hidden -translate-y-1/2 flex-col items-end gap-2.5 md:right-5 md:flex"
    >
      {/* Compact vertical readout that never obscures content */}
      <div className="flex flex-col items-end text-right drop-shadow-[0_2px_8px_rgba(2,14,26,0.95)]">
        <span className="font-mono-tabular text-[11px] font-medium tracking-[0.16em] text-[#F4FEFF] whitespace-nowrap">
          DEPTH {depthMeters} m
        </span>
        <span className="font-mono-tabular text-[9px] tracking-[0.14em] text-[#7CF4F0]/80 uppercase whitespace-nowrap">
          {zoneLabel} · CH.{currentChapter.number}
        </span>
      </div>

      {/* Ultra-slim bathymetric tick rail with interactive chapter strata nodes */}
      <div className="flex items-center gap-1.5">
        <div className="flex h-40 flex-col justify-between text-right font-mono-tabular text-[9px] text-[#F4FEFF]/45">
          <span>0m</span>
          <span>100m</span>
          <span>200m</span>
        </div>

        <div className="relative h-40 w-[1.5px] bg-[#F4FEFF]/20">
          <div
            className="w-full bg-gradient-to-b from-[#36D6DE] to-[#7CF4F0] transition-all duration-150"
            style={{ height: `${progressPct}%` }}
          />
          {/* Chapter tick markers along the 0–200m rail */}
          {MENU_CHAPTERS.map((ch, idx) => {
            const topPct = (idx / (MENU_CHAPTERS.length - 1)) * 100;
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.number}
                type="button"
                onClick={() =>
                  onSelectChapter?.(
                    idx,
                    idx > activeChapterIndex ? 'dive-deeper' : 'ascend-shallower'
                  )
                }
                title={`Jump to Ch. ${ch.number}: ${ch.label} (${ch.depth})`}
                aria-label={`Jump to Chapter ${ch.number} ${ch.label}`}
                style={{ top: `calc(${topPct}% - 3px)` }}
                className={`pointer-events-auto absolute -left-[3px] h-1.5 w-2 transition-all duration-150 focus-visible:outline-none ${
                  isActive
                    ? 'scale-125 bg-[#7CF4F0] shadow-[0_0_8px_rgba(124,244,240,0.95)]'
                    : 'bg-[#F4FEFF]/30 hover:scale-125 hover:bg-[#36D6DE]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

