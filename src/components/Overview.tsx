import React from 'react';
import { OVERVIEW_STATS } from '../data/mosasaurusData';

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-gradient-to-b from-[#031A2E] via-[#07405F]/45 to-[#031A2E] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header with Outlined Marcellus Number 02 */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#F4FEFF]/15 pb-12 lg:grid-cols-12">
          <div className="flex items-baseline gap-6 lg:col-span-7">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              02
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 02 · PALEOBIOLOGICAL OVERVIEW
              </p>
              <h2
                id="overview-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                The Meuse Lizard
              </h2>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm tracking-[0.06em] text-[#F4FEFF]/75">
              SPECIMEN ARCHIVE · MAASTRICHTIAN STAGE (72.1 – 66.0 MA)
            </p>
          </div>
        </div>

        {/* Editorial Lead Narrative */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-[1.75] font-light text-[#F4FEFF] md:text-xl">
              <span className="float-left mr-3 mt-1 font-display text-5xl leading-none text-[#7CF4F0]">
                M
              </span>
              osasaurus was a giant, air-breathing marine lizard that ruled the
              oceans in the final chapters of the Age of Dinosaurs. Despite its
              colossal scale and fearsome reputation, it was{' '}
              <strong className="font-medium text-[#7CF4F0]">
                not a dinosaur
              </strong>
              , but a squamate—a true scaled reptile closely related to today’s
              monitor lizards and snakes.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-[#F4FEFF]/85 md:text-[17px]">
              Evolving from small semi-aquatic coastal lizards during the Late
              Cretaceous, <em>Mosasaurus</em> adapted rapidly to pelagic life.
              Its limbs transformed into hydrofoil steering paddles, its tail
              developed a powerful two-lobed fluke, and its double-hinged jaws
              armed with conical palate teeth made it the undisputed apex
              predator of warm epicontinental seas from the Netherlands to North
              America, Morocco, and New Zealand.
            </p>
          </div>

          <div className="flex flex-col justify-between border border-[#F4FEFF]/15 bg-[#020E1A]/65 p-6 lg:col-span-5">
            <div>
              <p className="font-display text-xs tracking-[0.2em] text-[#7CF4F0] uppercase">
                CURATORIAL NOTE ON ESTIMATES
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#F4FEFF]/80">
                Because complete articulated skeletons of giant marine reptiles
                are rare in the fossil record, body length and mass values are
                derived from cranial-to-axial osteological scaling. All
                estimated figures in this monograph are explicitly marked as{' '}
                <span className="text-[#7CF4F0] underline decoration-[#7CF4F0]/40 underline-offset-4">
                  estimates
                </span>
                .
              </p>
            </div>
            <div className="mt-6 border-t border-[#F4FEFF]/10 pt-4 font-mono-tabular text-xs text-[#F4FEFF]/60">
              TYPE SPECIES: MOSASAURUS HOFFMANNII (MANTELL, 1829)
            </div>
          </div>
        </div>

        {/* 8 Scientific Stat Cards on --deep / --abyss surfaces */}
        <dl className="mt-14 grid grid-cols-1 gap-px border border-[#F4FEFF]/15 bg-[#F4FEFF]/15 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW_STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col justify-between bg-[#031A2E] p-6 transition-colors duration-200 hover:bg-[#07405F]/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    {stat.label}
                  </dt>
                  {stat.isEstimate && (
                    <span className="font-mono-tabular text-[11px] text-[#F4FEFF]/55">
                      [Estimate]
                    </span>
                  )}
                </div>
                <dd className="mt-3 font-display text-xl tracking-[0.02em] text-[#F4FEFF] md:text-2xl">
                  {stat.value}
                </dd>
              </div>
              <p className="mt-3 border-t border-[#F4FEFF]/10 pt-3 text-xs leading-relaxed text-[#F4FEFF]/70">
                {stat.subtext}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
