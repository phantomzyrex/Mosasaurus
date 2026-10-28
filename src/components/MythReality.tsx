import React, { useState } from 'react';
import { MYTH_CARDS } from '../data/mosasaurusData';

export const MythReality: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flipAll = () => {
    const allFlipped = MYTH_CARDS.every((c) => flippedIds[c.id]);
    const next: Record<string, boolean> = {};
    for (const c of MYTH_CARDS) {
      next[c.id] = !allFlipped;
    }
    setFlippedIds(next);
  };

  return (
    <section
      id="myths"
      aria-labelledby="myths-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-[#031A2E] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end">
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              10
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 10 · PUBLIC MISCONCEPTIONS
              </p>
              <h2
                id="myths-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Myth vs. Reality
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={flipAll}
              className="border border-[#7CF4F0]/50 bg-[#020E1A] px-4 py-2 font-display text-xs tracking-[0.14em] text-[#F4FEFF] uppercase whitespace-nowrap shrink-0 transition-colors hover:border-[#7CF4F0] hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
            >
              Toggle All Realities
            </button>
          </div>
        </div>

        {/* 4 Interactive Flip Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {MYTH_CARDS.map((card) => {
            const isFlipped = Boolean(flippedIds[card.id]);
            return (
              <div
                key={card.id}
                data-testid={`myth-card-${card.id}`}
                className="group relative min-h-[270px] border border-[#F4FEFF]/15 bg-[#020E1A] transition-colors duration-200 hover:border-[#7CF4F0]/60"
              >
                <button
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  aria-expanded={isFlipped}
                  aria-label={`Myth ${card.index}: ${card.myth}. Click to flip between myth and scientific reality.`}
                  className="flex h-full w-full flex-col justify-between p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0]"
                >
                  {!isFlipped ? (
                    <>
                      <div className="flex w-full items-center justify-between border-b border-[#F4FEFF]/10 pb-3">
                        <span className="font-mono-tabular text-xs tracking-widest text-[#7CF4F0]">
                          POPULAR MYTH {card.index}
                        </span>
                        <span className="font-display text-xs tracking-[0.16em] text-[#F4FEFF]/60 uppercase group-hover:text-[#7CF4F0]">
                          CLICK TO REVEAL REALITY →
                        </span>
                      </div>

                      <div className="my-6">
                        <h3 className="font-display text-2xl leading-snug tracking-[0.02em] text-[#F4FEFF] md:text-3xl">
                          {card.myth}
                        </h3>
                      </div>

                      <div className="w-full border-t border-[#F4FEFF]/10 pt-3 font-mono-tabular text-xs text-[#F4FEFF]/50">
                        STATUS: WIDESPREAD CINEMATIC MISCONCEPTION
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex w-full items-center justify-between border-b border-[#7CF4F0]/30 pb-3">
                        <span className="font-mono-tabular text-xs font-medium tracking-widest text-[#7CF4F0]">
                          {card.verdict}
                        </span>
                        <span className="font-display text-xs tracking-[0.16em] text-[#36D6DE] uppercase">
                          ← FLIP BACK TO MYTH
                        </span>
                      </div>

                      <div className="my-4">
                        <h3 className="font-display text-xl tracking-[0.02em] text-[#7CF4F0] uppercase">
                          {card.realityTitle}
                        </h3>
                        <p className="mt-3 text-base leading-[1.7] text-[#F4FEFF]/90">
                          {card.realityDetail}
                        </p>
                      </div>

                      <div className="w-full border-t border-[#F4FEFF]/10 pt-3 font-mono-tabular text-xs text-[#36D6DE]">
                        Evidence: {card.evidenceRef}
                      </div>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
