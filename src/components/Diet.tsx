import React, { useState } from 'react';
import { PREY_NODES, type PreyNode } from '../data/mosasaurusData';

export const Diet: React.FC = () => {
  const [selectedPrey, setSelectedPrey] = useState<PreyNode>(PREY_NODES[2]); // Ammonites default

  return (
    <section
      id="diet"
      aria-labelledby="diet-heading"
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
              06
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 06 · PALEOECOLOGY &amp; PREDATION
              </p>
              <h2
                id="diet-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Diet &amp; Hunting
              </h2>
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            An ambush apex predator using rapid bursts of fluked acceleration,
            verified through fossil bite marks and preserved stomach contents.
          </p>
        </div>

        {/* Editorial Overview + Interactive Food-Web Diagram */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Interactive Food-Web SVG Diagram (7 cols) */}
          <div className="border border-[#F4FEFF]/15 bg-[#031A2E]/90 p-6 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between text-xs text-[#F4FEFF]/65">
              <span className="font-display tracking-[0.16em] text-[#7CF4F0] uppercase">
                MAASTRICHTIAN MARINE TROPHIC WEB
              </span>
              <span className="font-mono-tabular">CLICK PREY GUILD TO INSPECT</span>
            </div>

            <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#F4FEFF]/10 bg-[radial-gradient(circle_at_50%_46%,rgba(18,168,190,0.22),rgba(2,14,26,0.95)_75%)]">
              {/* SVG Connection Lines from Center Apex (50%, 48%) to Prey Nodes */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {PREY_NODES.map((node) => {
                  const isActive = node.id === selectedPrey.id;
                  return (
                    <g key={node.id}>
                      <line
                        x1="50"
                        y1="48"
                        x2={node.x}
                        y2={node.y}
                        stroke={isActive ? '#7CF4F0' : 'rgba(244,254,255,0.22)'}
                        strokeWidth={isActive ? '0.75' : '0.35'}
                        strokeDasharray={isActive ? 'none' : '1.5 1.5'}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Central Apex Predator Hub */}
              <div
                style={{ left: '50%', top: '48%' }}
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 border border-[#7CF4F0] bg-[#020E1A]/95 px-4 py-2.5 text-center shadow-[0_0_28px_rgba(54,214,222,0.4)]"
              >
                <div className="font-mono-tabular text-[10px] tracking-[0.18em] text-[#7CF4F0]">
                  APEX PREDATOR · TROPHIC LEVEL 5
                </div>
                <div className="font-display text-sm tracking-[0.1em] text-[#F4FEFF] uppercase sm:text-base">
                  MOSASAURUS
                </div>
              </div>

              {/* 6 Interactive Prey Nodes */}
              {PREY_NODES.map((node) => {
                const isActive = node.id === selectedPrey.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedPrey(node)}
                    aria-pressed={isActive}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 border px-3 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0] ${
                      isActive
                        ? 'scale-105 border-[#7CF4F0] bg-[#07405F] text-[#F4FEFF] shadow-[0_0_18px_rgba(124,244,240,0.5)]'
                        : 'border-[#F4FEFF]/20 bg-[#020E1A]/90 text-[#F4FEFF]/80 hover:border-[#7CF4F0]/60 hover:text-[#F4FEFF]'
                    }`}
                  >
                    <div className="font-display text-xs tracking-[0.06em] uppercase whitespace-nowrap">
                      {node.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Prey Evidence & Predation Analysis (5 cols) */}
          <div className="flex flex-col justify-between border border-[#F4FEFF]/15 bg-[#031A2E] p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="font-display text-xs tracking-[0.2em] text-[#7CF4F0] uppercase">
                TROPHIC INTERACTION RECORD
              </p>
              <h3 className="mt-2 font-display text-2xl tracking-[0.03em] text-[#F4FEFF] uppercase">
                {selectedPrey.name}
              </h3>
              <p className="mt-1 font-mono-tabular text-xs text-[#36D6DE]">
                Taxa: {selectedPrey.scientificGroup} · {selectedPrey.trophicLevel}
              </p>

              <div className="mt-6 space-y-5 border-t border-[#F4FEFF]/15 pt-5">
                <div>
                  <h4 className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    Direct Fossil Evidence
                  </h4>
                  <p className="mt-1.5 text-sm leading-[1.7] text-[#F4FEFF]/85">
                    {selectedPrey.evidence}
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    Predatory Biomechanics
                  </h4>
                  <p className="mt-1.5 text-sm leading-[1.7] text-[#F4FEFF]/85">
                    {selectedPrey.huntingMechanic}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#F4FEFF]/15 pt-4 text-xs leading-relaxed text-[#F4FEFF]/70">
              <strong>Ambush Strategy:</strong> Rather than long-distance
              pursuit, <em>Mosasaurus</em> likely launched upward from the dim
              photic margin in explosive bursts of speed, using its two-lobed
              tail fluke and double-hinged jaws to incapacitate prey on impact.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
