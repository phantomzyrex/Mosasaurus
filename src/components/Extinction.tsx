import React, { useState } from 'react';
import { EVOLUTION_STAGES } from '../data/mosasaurusData';

export const Extinction: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(EVOLUTION_STAGES[3].id); // K-Pg boundary active by default

  return (
    <section
      id="extinction"
      aria-labelledby="extinction-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-gradient-to-b from-[#020E1A] via-[#031A2E] to-[#020E1A] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end">
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              09
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 09 · MACROEVOLUTION &amp; K–PG BOUNDARY
              </p>
              <h2
                id="extinction-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Evolution &amp; Extinction
              </h2>
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            From semi-aquatic lizards ~100 million years ago to open-ocean apex
            predators within ~30 million years—terminated abruptly at the 66 Ma
            K–Pg boundary.
          </p>
        </div>

        {/* Narrative Highlights: Terrestrial-to-Pelagic + Live Birth + Chicxulub Impact */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border border-[#F4FEFF]/15 bg-[#031A2E]/90 p-6">
            <span className="font-mono-tabular text-xs text-[#7CF4F0]">
              100 MA → 70 MA RADIATION
            </span>
            <h3 className="mt-2 font-display text-lg text-[#F4FEFF] uppercase">
              30-Million-Year Ascent
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-[#F4FEFF]/80">
              Mosasaurs descended from small, semi-aquatic coastal squamates
              about 100 million years ago and evolved into giant ocean top
              predators within roughly 30 million years.
            </p>
          </div>

          <div className="border border-[#F4FEFF]/15 bg-[#031A2E]/90 p-6">
            <span className="font-mono-tabular text-xs text-[#7CF4F0]">
              PELAGIC VIVIPARITY
            </span>
            <h3 className="mt-2 font-display text-lg text-[#F4FEFF] uppercase">
              Live Birth in Open Water
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-[#F4FEFF]/80">
              Related mosasaur fossils show direct evidence of live birth
              (viviparity) in open water, freeing them from ever needing to haul
              out onto land to nest.
            </p>
          </div>

          <div className="border border-[#7CF4F0]/45 bg-[#07405F]/35 p-6">
            <span className="font-mono-tabular text-xs text-[#7CF4F0]">
              66.0 MA · CHICXULUB IMPACT
            </span>
            <h3 className="mt-2 font-display text-lg text-[#F4FEFF] uppercase">
              The K–Pg Mass Extinction
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-[#F4FEFF]/85">
              About 66 million years ago, the end-Cretaceous (K–Pg) mass
              extinction—triggered by the Chicxulub asteroid impact—wiped out{' '}
              <em>Mosasaurus</em> along with ammonites, plesiosaurs, and
              non-avian dinosaurs.
            </p>
          </div>
        </div>

        {/* Animated Geological Timeline with Marker at K-Pg Boundary */}
        <div className="mt-12 border border-[#F4FEFF]/15 bg-[#020E1A] p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#F4FEFF]/15 pb-4">
            <span className="font-display text-xs tracking-[0.2em] text-[#7CF4F0] uppercase">
              LATE CRETACEOUS CHRONOSTRATIGRAPHIC TIMELINE (100 MA — 66.0 MA)
            </span>
            <span className="font-mono-tabular text-xs text-[#7CF4F0]">
              ★ K–PG IMPACT BOUNDARY AT 66.0 MA
            </span>
          </div>

          {/* Horizontal Geological Axis */}
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
            {EVOLUTION_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  aria-pressed={isActive}
                  className={`group flex flex-col justify-between border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0] ${
                    stage.isKpgBoundary
                      ? isActive
                        ? 'border-[#7CF4F0] bg-[#07405F]/75 shadow-[0_0_25px_rgba(124,244,240,0.35)]'
                        : 'border-[#7CF4F0]/50 bg-[#07405F]/30 hover:border-[#7CF4F0]'
                      : isActive
                        ? 'border-[#36D6DE] bg-[#031A2E]'
                        : 'border-[#F4FEFF]/15 bg-[#031A2E]/50 hover:border-[#F4FEFF]/35'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tabular text-sm font-medium text-[#7CF4F0]">
                        {stage.ma}
                      </span>
                      {stage.isKpgBoundary && (
                        <span className="border border-[#7CF4F0]/60 px-1.5 py-0.5 font-mono-tabular text-[10px] text-[#7CF4F0]">
                          K–Pg BOUNDARY
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs tracking-[0.08em] text-[#F4FEFF]/60 uppercase">
                      {stage.epoch}
                    </p>

                    <h4 className="mt-3 font-display text-lg tracking-[0.03em] text-[#F4FEFF] uppercase">
                      {stage.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-[#F4FEFF]/80">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-[#F4FEFF]/10 pt-2.5 font-mono-tabular text-[11px] text-[#36D6DE]">
                    {stage.bodyAdaptation}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
