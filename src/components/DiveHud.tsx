import React from 'react';
import { MENU_CHAPTERS } from '../data/mosasaurusData';
import type { DiveActionType } from '../utils/oceanMath';

export interface DiveToastState {
  chapterNumber: string;
  chapterLabel: string;
  chapterDepth: string;
  action: DiveActionType;
  timestamp: number;
}

interface DiveHudProps {
  activeChapterIndex: number;
  diveToast: DiveToastState | null;
  onJumpToChapter: (index: number, action: DiveActionType) => void;
}

export const DiveHud: React.FC<DiveHudProps> = ({
  activeChapterIndex,
  diveToast,
  onJumpToChapter,
}) => {
  const total = MENU_CHAPTERS.length;
  const current = MENU_CHAPTERS[activeChapterIndex] ?? MENU_CHAPTERS[0];
  const isAtSurface = activeChapterIndex <= 0;
  const isAtAbyss = activeChapterIndex >= total - 1;

  const getActionLabel = (action: DiveActionType) => {
    switch (action) {
      case 'dive-deeper':
        return 'DESCENDING ↓';
      case 'ascend-shallower':
        return 'ASCENDING ↑';
      case 'resurface':
        return 'RESURFACING TO 0 m ↑';
      case 'abyss-floor':
        return 'ABYSSAL FLOOR ↓';
    }
  };

  return (
    <>
      {/* Transient Deep-Dive Sonar Telemetry Toast when navigating via keyboard */}
      <div
        aria-live="polite"
        aria-atomic="true"
        data-testid="dive-sonar-toast"
        className={`pointer-events-none fixed bottom-20 left-6 z-40 transition-all duration-300 ease-ocean md:left-8 ${
          diveToast
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        }`}
      >
        {diveToast && (
          <div className="flex items-center gap-3.5 border border-[#7CF4F0]/55 bg-[#020E1A]/92 px-4 py-2.5 shadow-[0_12px_36px_rgba(2,14,26,0.9),0_0_20px_rgba(54,214,222,0.18)] backdrop-blur-md">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-[#7CF4F0] shadow-[0_0_10px_#7CF4F0]"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono-tabular text-[10px] tracking-[0.18em] text-[#7CF4F0] uppercase">
                <span>{getActionLabel(diveToast.action)}</span>
                <span aria-hidden="true" className="text-[#F4FEFF]/30">
                  ·
                </span>
                <span>DEPTH {diveToast.chapterDepth}</span>
              </div>
              <p className="mt-0.5 font-display text-xs tracking-[0.1em] text-[#F4FEFF] uppercase">
                CH. {diveToast.chapterNumber} — {diveToast.chapterLabel}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Compact Deep-Dive Keyboard Navigation HUD */}
      <aside
        aria-label="Deep-Dive Keyboard Navigation Controls"
        data-testid="keyboard-dive-hud"
        className="fixed bottom-4 left-4 z-40 hidden items-center gap-3 border border-[#F4FEFF]/15 bg-[#020E1A]/85 px-3.5 py-2 shadow-[0_8px_28px_rgba(2,14,26,0.85)] backdrop-blur-md sm:flex md:bottom-5 md:left-8"
      >
        {/* Active Chapter Readout */}
        <div className="flex items-center gap-2 border-r border-[#F4FEFF]/15 pr-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#36D6DE] shadow-[0_0_8px_#36D6DE]"
          />
          <span
            data-testid="active-chapter-readout"
            className="font-mono-tabular text-[10px] tracking-[0.14em] text-[#F4FEFF]/90 uppercase whitespace-nowrap"
          >
            CH. {current.number}/{total} · {current.depth}
          </span>
        </div>

        {/* Arrow Keys Up / Down Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={isAtSurface}
            onClick={() =>
              onJumpToChapter(
                Math.max(0, activeChapterIndex - 1),
                'ascend-shallower'
              )
            }
            title="Ascend to previous chapter (ArrowUp / ArrowLeft / Shift+Space)"
            aria-label="Ascend to previous chapter"
            data-testid="dive-prev-btn"
            className="inline-flex h-6 w-6 items-center justify-center border border-[#F4FEFF]/20 bg-[#031A2E]/90 font-mono-tabular text-[11px] text-[#F4FEFF]/85 transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={isAtAbyss}
            onClick={() =>
              onJumpToChapter(
                Math.min(total - 1, activeChapterIndex + 1),
                'dive-deeper'
              )
            }
            title="Dive to next chapter (ArrowDown / ArrowRight)"
            aria-label="Dive to next chapter"
            data-testid="dive-next-btn"
            className="inline-flex h-6 w-6 items-center justify-center border border-[#F4FEFF]/20 bg-[#031A2E]/90 font-mono-tabular text-[11px] text-[#F4FEFF]/85 transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↓
          </button>
        </div>

        {/* Spacebar Deep-Dive Action Button */}
        <button
          type="button"
          onClick={() => {
            if (isAtAbyss) {
              onJumpToChapter(0, 'resurface');
            } else {
              onJumpToChapter(activeChapterIndex + 1, 'dive-deeper');
            }
          }}
          title="Press SPACE to dive to next ocean stratum (or resurface from 200 m)"
          data-testid="dive-space-btn"
          className="group inline-flex items-center gap-2 border border-[#7CF4F0]/45 bg-[#07405F]/50 px-2.5 py-1 font-mono-tabular text-[10px] tracking-[0.14em] text-[#7CF4F0] uppercase transition-all duration-200 hover:border-[#7CF4F0] hover:bg-[#0A6E8A]/50 hover:text-[#F4FEFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
        >
          <kbd className="font-mono-tabular text-[9px] text-[#F4FEFF]/90">
            SPACE
          </kbd>
          <span aria-hidden="true" className="text-[#7CF4F0]/50">
            ·
          </span>
          <span>{isAtAbyss ? 'RESURFACE ↑' : 'DEEP DIVE ↓'}</span>
        </button>
      </aside>
    </>
  );
};
