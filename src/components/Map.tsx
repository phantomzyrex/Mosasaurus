import React, { useState } from 'react';
import { FOSSIL_LOCATIONS } from '../data/mosasaurusData';
import { getFossilLocationById } from '../utils/oceanMath';

export const Map: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string>(FOSSIL_LOCATIONS[0].id);
  const activeLocation = getFossilLocationById(selectedLocId);

  return (
    <section
      id="habitat"
      aria-labelledby="habitat-heading"
      className="relative border-t border-[#F4FEFF]/10 bg-gradient-to-b from-[#031A2E] via-[#07405F]/35 to-[#031A2E] px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#F4FEFF]/15 pb-12 md:flex-row md:items-end">
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden="true"
              className="section-number-outline text-6xl leading-none md:text-8xl"
            >
              07
            </span>
            <div>
              <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
                CHAPTER 07 · PALEOGEOGRAPHY &amp; BIOGEOGRAPHY
              </p>
              <h2
                id="habitat-heading"
                className="mt-2 font-display text-3xl tracking-[0.04em] text-[#F4FEFF] uppercase sm:text-4xl md:text-5xl"
              >
                Habitat &amp; Distribution
              </h2>
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#F4FEFF]/75">
            During the Late Cretaceous, sea levels stood up to 200 m higher than
            today, flooding the continents with warm epicontinental seas.
          </p>
        </div>

        {/* Interactive World Map + Locality Dossier */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive SVG World Map with Fossil Sites (8 cols) */}
          <div className="flex flex-col justify-between border border-[#F4FEFF]/15 bg-[#020E1A]/90 p-5 sm:p-6 lg:col-span-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F4FEFF]/65">
              <span className="font-display tracking-[0.16em] text-[#7CF4F0] uppercase">
                GLOBAL FOSSIL DISTRIBUTION · MAASTRICHTIAN OCEANS
              </span>
              <span className="font-mono-tabular">
                8 MAJOR FOSSIL PROVINCES
              </span>
            </div>

            <div className="relative aspect-[2/1] w-full overflow-hidden border border-[#F4FEFF]/10 bg-[#031A2E]">
              <svg
                viewBox="0 0 1000 500"
                className="h-full w-full"
                role="img"
                aria-label="World map showing Mosasaurus fossil discovery locations across Europe, North America, Morocco, Japan, and New Zealand"
              >
                {/* Latitude / Longitude Graticule Lines */}
                <g stroke="rgba(244,254,255,0.07)" strokeWidth="1">
                  <line x1="0" y1="125" x2="1000" y2="125" />
                  <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="4 4" />
                  <line x1="0" y1="375" x2="1000" y2="375" />
                  <line x1="250" y1="0" x2="250" y2="500" />
                  <line x1="500" y1="0" x2="500" y2="500" />
                  <line x1="750" y1="0" x2="750" y2="500" />
                </g>

                {/* Flooded Epicontinental Sea Shelf Glow (Western Interior Seaway, European Chalk Sea, Tethys) */}
                <g fill="rgba(54,214,222,0.12)">
                  <ellipse cx="235" cy="175" rx="65" ry="55" />
                  <ellipse cx="505" cy="155" rx="70" ry="50" />
                  <ellipse cx="490" cy="220" rx="60" ry="35" />
                </g>

                {/* Stylized Continental Outlines */}
                <g
                  fill="rgba(7,64,95,0.65)"
                  stroke="rgba(124,244,240,0.28)"
                  strokeWidth="1.2"
                >
                  {/* North America */}
                  <path d="M95,75 L210,65 L315,115 L300,195 L245,235 L185,220 L135,165 Z" />
                  {/* South America */}
                  <path d="M265,260 L355,285 L385,355 L325,455 L285,440 L255,330 Z" />
                  {/* Europe */}
                  <path d="M445,75 L575,65 L615,145 L545,180 L455,175 L435,130 Z" />
                  {/* Africa */}
                  <path d="M440,195 L565,200 L615,285 L565,410 L505,415 L465,315 L430,255 Z" />
                  {/* Asia */}
                  <path d="M605,70 L865,80 L895,185 L815,265 L715,270 L625,205 Z" />
                  {/* Australia & Zealandia */}
                  <path d="M755,325 L865,320 L885,395 L795,415 L745,380 Z" />
                  <path d="M885,405 L915,415 L900,445 L878,435 Z" />
                </g>

                {/* Fossil Locality Markers */}
                {FOSSIL_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === selectedLocId;
                  return (
                    <g
                      key={loc.id}
                      onClick={() => setSelectedLocId(loc.id)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={loc.svgX}
                          cy={loc.svgY}
                          r="18"
                          fill="rgba(124,244,240,0.2)"
                          stroke="#7CF4F0"
                          strokeWidth="1.2"
                        />
                      )}
                      <circle
                        cx={loc.svgX}
                        cy={loc.svgY}
                        r={isSelected ? '7.5' : '5.5'}
                        fill={isSelected ? '#7CF4F0' : '#36D6DE'}
                        stroke="#020E1A"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive Locality Selector Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FOSSIL_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocId(loc.id)}
                    aria-pressed={isSelected}
                    className={`border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] ${
                      isSelected
                        ? 'border-[#7CF4F0] bg-[#07405F] text-[#F4FEFF]'
                        : 'border-[#F4FEFF]/12 bg-[#031A2E] text-[#F4FEFF]/70 hover:border-[#F4FEFF]/35 hover:text-[#F4FEFF]'
                    }`}
                  >
                    <div className="font-display text-xs tracking-[0.04em] uppercase truncate">
                      {loc.countries}
                    </div>
                    <div className="font-mono-tabular text-[10px] text-[#7CF4F0]/80 truncate">
                      {loc.coordinatesLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Fossil Locality Dossier (4 cols) */}
          <div
            aria-live="polite"
            data-testid="map-locality-panel"
            className="flex flex-col justify-between border border-[#7CF4F0]/40 bg-[#020E1A] p-6 sm:p-8 lg:col-span-4"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#F4FEFF]/10 pb-3">
                <span className="font-mono-tabular text-xs text-[#7CF4F0]">
                  {activeLocation.coordinatesLabel}
                </span>
                <span className="font-mono-tabular text-[11px] text-[#F4FEFF]/55">
                  FOSSIL HORIZON
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl tracking-[0.03em] text-[#F4FEFF] uppercase">
                {activeLocation.countries}
              </h3>
              <p className="mt-1 font-display text-xs tracking-[0.14em] text-[#36D6DE] uppercase">
                {activeLocation.region}
              </p>

              <dl className="mt-6 space-y-4 border-t border-[#F4FEFF]/15 pt-5 text-sm">
                <div>
                  <dt className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    Geological Formation
                  </dt>
                  <dd className="mt-1 text-[#F4FEFF]/90">
                    {activeLocation.formation}
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    Documented Species
                  </dt>
                  <dd className="mt-1 italic text-[#F4FEFF]/90">
                    {activeLocation.speciesFound}
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-xs tracking-[0.16em] text-[#7CF4F0] uppercase">
                    Paleoenvironmental Context
                  </dt>
                  <dd className="mt-1 leading-relaxed text-[#F4FEFF]/80">
                    {activeLocation.notes}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-[#F4FEFF]/15 pt-4 text-xs leading-relaxed text-[#F4FEFF]/65">
              Distribution is species-dependent and spans nearly worldwide
              across Late Cretaceous warm epicontinental and open-ocean margins.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
