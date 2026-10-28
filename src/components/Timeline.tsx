import React, { useState } from 'react';
import { DISCOVERY_TIMELINE } from '../data/mosasaurusData';

export const Timeline: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(DISCOVERY_TIMELINE[3].id); // 1808 Cuvier default highlighted

  return (
    <section
      id="discovery"
      aria-labelledby="discovery-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-[#020E1A] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end">
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              03
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 03 · HISTORICAL CHRONOLOGY
              </p>
              <h2
                id="discovery-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Discovery &amp; History
              </h2>
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            From subterranean Dutch chalk quarries in 1764 to Georges Cuvier’s
            1808 breakthrough proving the reality of extinction.
          </p>
        </div>

        {/* Vertical Timeline with Animated Draw Line */}
        <div className="relative mt-16 pl-6 md:pl-0">
          {/* Central / Left Vertical Draw Line */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2 w-[1px] bg-gradient-to-b from-[#36D6DE] via-[#12A8BE] to-[#07405F] md:left-[220px]"
          />

          <div className="space-y-10">
            {DISCOVERY_TIMELINE.map((event, idx) => {
              const isSelected = event.id === selectedId;
              return (
                <article
                  key={event.id}
                  onClick={() => setSelectedId(event.id)}
                  className={`group relative grid cursor-pointer grid-cols-1 gap-4 transition-all duration-200 md:grid-cols-[200px_1fr] md:gap-12 ${
                    isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Timeline Node Marker on the vertical line */}
                  <button
                    type="button"
                    onClick={() => setSelectedId(event.id)}
                    aria-label={`Select timeline milestone ${event.year}: ${event.title}`}
                    aria-pressed={isSelected}
                    className={`absolute top-1.5 -left-[21px] z-10 flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0] md:left-[213px] ${
                      isSelected
                        ? 'scale-125 border-[#7CF4F0] bg-[#36D6DE] shadow-[0_0_14px_rgba(124,244,240,0.9)]'
                        : 'border-[#F4FEFF]/50 bg-[#020E1A] group-hover:border-[#7CF4F0]'
                    }`}
                  />

                  {/* Left Column: Year & Location */}
                  <div className="md:text-right md:pr-4">
                    <span className="font-mono-tabular font-display text-2xl tracking-[0.04em] text-[#7CF4F0] md:text-3xl">
                      {event.year}
                    </span>
                    <p className="mt-1 text-xs tracking-[0.12em] text-[#F4FEFF]/60 uppercase">
                      {event.location}
                    </p>
                  </div>

                  {/* Right Column: Card Content */}
                  <div
                    className={`border p-6 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#7CF4F0]/60 bg-[#07405F]/45 shadow-[0_0_30px_rgba(10,110,138,0.25)]'
                        : 'border-[#F4FEFF]/12 bg-[#031A2E]/80 group-hover:border-[#F4FEFF]/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl tracking-[0.03em] text-[#F4FEFF] uppercase">
                        {event.title}
                      </h3>
                      <span className="font-mono-tabular text-xs text-[#7CF4F0]/75">
                        MILESTONE 0{idx + 1}
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-[1.7] text-[#F4FEFF]/85">
                      {event.description}
                    </p>

                    <div className="mt-4 border-t border-[#F4FEFF]/10 pt-3 text-xs text-[#7CF4F0]">
                      <span className="uppercase tracking-[0.14em] text-[#F4FEFF]/55">
                        Historical Significance:{' '}
                      </span>
                      {event.significance}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
