import React from 'react';
import { FAST_FACTS, SCIENTIFIC_SOURCES } from '../data/mosasaurusData';

export const FastFacts: React.FC = () => {
  return (
    <section
      id="facts"
      aria-labelledby="facts-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-gradient-to-b from-[#020E1A] to-[#031A2E] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
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
              12
            </span>
            <div data-scroll-header>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 12 · COMPENDIUM &amp; BIBLIOGRAPHY
              </p>
              <h2
                id="facts-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Fast Facts &amp; Sources
              </h2>
            </div>
          </div>

          <p data-scroll-header className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            Eight verified paleobiological takeaways alongside institutional
            archives and peer-reviewed primary literature.
          </p>
        </div>

        {/* 8 "Did You Know" Fast Facts Grid */}
        <div className="mt-12">
          <h3 data-scroll-header className="font-display text-sm tracking-[0.2em] text-[#7CF4F0] uppercase">
            DID YOU KNOW? · 8 KEY PALEONTOLOGICAL FACTS
          </h3>

          <div
            data-scroll-grid
            className="mt-6 grid grid-cols-1 gap-px border border-[#F4FEFF]/15 bg-[#F4FEFF]/15 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FAST_FACTS.map((fact) => (
              <article
                key={fact.number}
                className="flex flex-col justify-between bg-[#020E1A] p-6 transition-colors hover:bg-[#07405F]/35"
              >
                <div>
                  <span className="font-mono-tabular text-xs text-[#7CF4F0]">
                    FACT {fact.number}
                  </span>
                  <h4 className="mt-2 font-display text-lg tracking-[0.03em] text-[#F4FEFF] uppercase">
                    {fact.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-[1.7] text-[#F4FEFF]/80">
                    {fact.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Institutional & Peer-Reviewed Sources List */}
        <div className="mt-16 border border-[#F4FEFF]/15 bg-[#020E1A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4FEFF]/15 pb-4">
            <h3 className="font-display text-lg tracking-[0.12em] text-[#F4FEFF] uppercase">
              Primary Literature &amp; Museum Repositories
            </h3>
            <span className="font-mono-tabular text-xs text-[#7CF4F0]">
              6 VERIFIED CITATIONS
            </span>
          </div>

          <ul className="mt-6 divide-y divide-[#F4FEFF]/10">
            {SCIENTIFIC_SOURCES.map((src) => (
              <li
                key={src.id}
                className="flex flex-col justify-between gap-2 py-4 md:flex-row md:items-baseline"
              >
                <div>
                  <span className="font-display text-base text-[#7CF4F0]">
                    {src.institution}
                  </span>
                  <p className="mt-1 text-sm text-[#F4FEFF]/80">
                    {src.reference}
                  </p>
                </div>
                <span className="font-mono-tabular text-xs text-[#F4FEFF]/55 whitespace-nowrap">
                  {src.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
