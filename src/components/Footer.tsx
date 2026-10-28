import React from 'react';

interface FooterProps {
  onBackToSurface: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToSurface }) => {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-[#F4FEFF]/15 bg-[#020E1A] px-6 pt-24 pb-14 md:px-12 lg:px-20 lg:pt-32"
    >
      {/* Subtle Bathymetric Grid & Ocean Constellation Specks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(124,244,240,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,244,240,0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
      >
        <defs>
          <radialGradient id="footer-abyss-glow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#0A6E8A" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#07405F" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#020E1A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="700" fill="url(#footer-abyss-glow)" />

        {/* Delicate constellation lines & marine snow nodes */}
        <g stroke="#7CF4F0" strokeOpacity="0.22" strokeWidth="0.8" fill="none">
          <polygon points="245,65 285,82 238,94" />
          <polyline points="880,155 835,215 865,280 945,245 880,155" />
          <line x1="865" y1="280" x2="825" y2="420" />
          <polygon points="435,345 472,415 412,438" />
        </g>
        <g fill="#7CF4F0">
          <circle cx="245" cy="65" r="2" fillOpacity="0.55" />
          <circle cx="285" cy="82" r="1.5" fillOpacity="0.4" />
          <circle cx="140" cy="295" r="3" fillOpacity="0.45" />
          <circle cx="585" cy="205" r="2" fillOpacity="0.5" />
          <circle cx="880" cy="155" r="2" fillOpacity="0.6" />
          <circle cx="835" cy="215" r="2.5" fillOpacity="0.55" />
          <circle cx="945" cy="245" r="2" fillOpacity="0.45" />
          <circle cx="412" cy="438" r="2.5" fillOpacity="0.65" />
          <circle cx="472" cy="415" r="1.8" fillOpacity="0.45" />
          <circle cx="1270" cy="435" r="1.8" fillOpacity="0.55" />
          <circle cx="1390" cy="225" r="1.5" fillOpacity="0.4" />
          <circle cx="1305" cy="675" r="2.2" fillOpacity="0.5" />
          <circle cx="105" cy="685" r="2.5" fillOpacity="0.5" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Top Row: Section Number 13 & Kicker */}
        <div
          data-scroll-divider
          className="flex items-baseline gap-6 border-b border-[#F4FEFF]/15 pb-8"
        >
          <span
            aria-hidden="true"
            className="section-number-outline text-5xl leading-none md:text-7xl"
          >
            13
          </span>
          <div data-scroll-header>
            <p className="font-display text-xs tracking-[0.24em] text-[#7CF4F0] uppercase">
              CHAPTER 13 · CURATORIAL INQUIRIES &amp; COLOPHON
            </p>
            <p className="mt-1 text-xs text-[#F4FEFF]/65">
              PALEONTOLOGICAL EXHIBITION PORTFOLIO · MAASTRICHTIAN SEA
            </p>
          </div>
        </div>

        {/* Contact Row: "LET'S TALK" + Back to Surface Button */}
        <div
          data-scroll-reveal
          className="my-14 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"
        >
          <div>
            <h2
              id="contact-heading"
              className="font-display text-4xl tracking-[0.02em] text-[#F4FEFF] uppercase sm:text-6xl md:text-7xl"
              style={{
                textShadow: '0 0 36px rgba(124, 244, 240, 0.2)',
                lineHeight: 0.94,
              }}
            >
              LET&apos;S TALK
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href="mailto:techhelp.shivang@gmail.com"
                className="font-display text-base tracking-[0.08em] text-[#7CF4F0] underline decoration-[#7CF4F0]/40 underline-offset-8 transition-colors hover:text-[#F4FEFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] sm:text-lg"
              >
                techhelp.shivang@gmail.com
              </a>
            </div>
          </div>

          {/* Back to Surface Button */}
          <div className="flex flex-col items-start lg:items-end">
            <button
              type="button"
              onClick={onBackToSurface}
              data-testid="back-to-surface-btn"
              className="group inline-flex items-center gap-4 border border-[#7CF4F0]/60 bg-[#031A2E] px-6 py-3.5 font-display text-xs tracking-[0.2em] text-[#F4FEFF] uppercase whitespace-nowrap shrink-0 transition-all duration-300 ease-ocean hover:-translate-y-0.5 hover:border-[#7CF4F0] hover:bg-[#07405F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CF4F0]"
            >
              <span>Back to Surface (0 m)</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-1"
              >
                ↑
              </span>
            </button>
          </div>
        </div>

        {/* Monumental Full-Width "Shivang Studios" Display Lockup */}
        <div
          data-testid="shivang-studios-banner"
          className="my-14 flex w-full flex-col items-center justify-center py-4 text-center md:my-20"
        >
          <svg
            viewBox="0 0 1200 185"
            className="w-full overflow-visible select-none"
            role="heading"
            aria-level={2}
            aria-label="Shivang Studios"
          >
            <text
              x="600"
              y="142"
              textAnchor="middle"
              textLength="1188"
              lengthAdjust="spacingAndGlyphs"
              className="fill-[#F4FEFF] font-body font-bold"
              style={{
                fontSize: '154px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                filter:
                  'drop-shadow(0 0 36px rgba(124, 244, 240, 0.22)) drop-shadow(0 0 12px rgba(54, 214, 222, 0.14))',
              }}
            >
              Shivang Studios
            </text>
          </svg>
        </div>

        {/* Bottom Hairline Divider & Signature Navigation Bar */}
        <div className="border-t border-[#F4FEFF]/15 pt-7">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            {/* Left: Shivang Gupta · Created with [Ocean Heart] by Shivang Studios */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm text-[#F4FEFF]/75">
              <span className="font-display text-base font-medium tracking-[0.02em] text-[#F4FEFF]">
                Shivang Gupta
              </span>
              <span aria-hidden="true" className="text-[#7CF4F0]/50">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#F4FEFF]/75">
                <span>Created with</span>
                <svg
                  aria-label="love"
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-[#36D6DE] text-[#7CF4F0] drop-shadow-[0_0_8px_rgba(124,244,240,0.75)]"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>by Shivang Studios</span>
              </span>
            </div>

            {/* Right: GitHub & Email */}
            <nav
              aria-label="Footer Studio Links"
              className="flex flex-wrap items-center gap-6 text-sm text-[#F4FEFF]/75 md:gap-7"
            >
              <a
                href="https://github.com/phantomzyrex"
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
              >
                GitHub
              </a>
              <a
                href="mailto:techhelp.shivang@gmail.com"
                className="whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#7CF4F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
              >
                Email
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
