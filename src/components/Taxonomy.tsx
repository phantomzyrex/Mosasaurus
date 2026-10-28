import React, { useState } from 'react';
import { SPECIES_LIST, TAXONOMY_RANKS } from '../data/mosasaurusData';

export const Taxonomy: React.FC = () => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(SPECIES_LIST[0].id);

  return (
    <section
      id="taxonomy"
      aria-labelledby="taxonomy-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-[#020E1A] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
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
              08
            </span>
            <div data-scroll-header>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 08 · SYSTEMATIC PALEONTOLOGY
              </p>
              <h2
                id="taxonomy-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Classification &amp; Species
              </h2>
            </div>
          </div>

          <p data-scroll-header className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            Roughly 5 to 8 species are currently recognised within the genus{' '}
            <em>Mosasaurus</em>, though species boundaries remain actively
            debated among vertebrate paleontologists.
          </p>
        </div>

        {/* Two-Column Layout: Linnaean Hierarchy Card (5 cols) + Species Catalogue (7 cols) */}
        <div data-scroll-reveal className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Taxonomy Hierarchy Card */}
          <div className="border border-[#F4FEFF]/15 bg-[#031A2E] p-6 sm:p-8 lg:col-span-5">
            <div className="border-b border-[#F4FEFF]/15 pb-4">
              <p className="font-display text-xs tracking-[0.2em] text-[#7CF4F0] uppercase">
                LINNAEAN HIERARCHY
              </p>
              <h3 className="mt-1 font-display text-2xl text-[#F4FEFF] uppercase">
                Taxonomic Chain
              </h3>
            </div>

            <ol className="mt-6 space-y-4">
              {TAXONOMY_RANKS.map((item, idx) => (
                <li
                  key={item.rank}
                  className="border-b border-[#F4FEFF]/10 pb-3.5 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono-tabular text-xs tracking-wider text-[#7CF4F0] uppercase">
                      0{idx + 1} · {item.rank}
                    </span>
                    <span
                      className={`font-display text-lg tracking-[0.04em] text-[#F4FEFF] ${
                        item.rank === 'Genus' ? 'italic text-[#36D6DE]' : ''
                      }`}
                    >
                      {item.taxon}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#F4FEFF]/65">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Recognised Species List */}
          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-[#F4FEFF]/15 pb-3">
              <h3 className="font-display text-sm tracking-[0.18em] text-[#7CF4F0] uppercase">
                RECOGNISED SPECIES (5–8 TAXA · DEBATED)
              </h3>
              <span className="font-mono-tabular text-xs text-[#F4FEFF]/55">
                SELECT SPECIES TO EXPAND
              </span>
            </div>

            {SPECIES_LIST.map((sp) => {
              const isSelected = sp.id === selectedSpeciesId;
              return (
                <article
                  key={sp.id}
                  onClick={() => setSelectedSpeciesId(sp.id)}
                  className={`cursor-pointer border p-5 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#7CF4F0]/65 bg-[#07405F]/45'
                      : 'border-[#F4FEFF]/12 bg-[#031A2E]/70 hover:border-[#F4FEFF]/30'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h4 className="font-display text-xl italic tracking-[0.02em] text-[#F4FEFF]">
                        {sp.binomial}
                      </h4>
                      <p className="mt-0.5 text-xs text-[#F4FEFF]/60">
                        Authority: {sp.authority} · {sp.status}
                      </p>
                    </div>
                    <span className="font-mono-tabular text-xs text-[#7CF4F0]">
                      {sp.estimatedLength}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-[1.7] text-[#F4FEFF]/85">
                    {sp.summary}
                  </p>

                  <div className="mt-3 border-t border-[#F4FEFF]/10 pt-2.5 font-mono-tabular text-xs text-[#F4FEFF]/60">
                    Stratigraphic Range: {sp.horizon}
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
