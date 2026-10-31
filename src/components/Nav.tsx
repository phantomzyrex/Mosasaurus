import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  isScrolledPastHero?: boolean;
}

export const Nav: React.FC<NavProps> = ({
  onOpenMenu,
  isScrolledPastHero = false,
}) => {
  return (
    <header
      data-testid="site-header"
      data-scrolled={isScrolledPastHero ? 'true' : 'false'}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 px-2.5 pt-2.5 sm:px-3.5 sm:pt-3.5"
    >
      {/* Ambient Sunlit-Ocean Top Veil that Fades Smoothly Downward */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 transition-opacity duration-500 ease-ocean ${
          isScrolledPastHero ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(18, 168, 190, 0.55) 0%, rgba(10, 110, 138, 0.42) 38%, rgba(7, 64, 95, 0.18) 72%, rgba(2, 14, 26, 0) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Inner Rounded Lighter Ocean-Aqua Arch with Feathered Bottom Fade */}
      <div
        className={`relative w-full rounded-t-[20px] sm:rounded-t-[22px] transition-all duration-500 ease-ocean ${
          isScrolledPastHero
            ? 'px-6 pt-5 pb-12 md:px-9 md:pt-6 md:pb-14'
            : 'px-6 pt-5 pb-4 md:px-8 md:pt-6'
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-t-[20px] sm:rounded-t-[22px] transition-opacity duration-500 ease-ocean ${
            isScrolledPastHero ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(ellipse at 50% -15%, rgba(54, 214, 222, 0.58) 0%, rgba(18, 168, 190, 0.52) 34%, rgba(10, 110, 138, 0.44) 64%, rgba(7, 64, 95, 0) 100%)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0) 100%)',
          }}
        />

        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto relative z-10 mx-auto flex w-full items-center justify-between"
        >
          {/* Zone 1: Left Brand Name */}
          <a
            href="#hero"
            className="font-display text-sm tracking-[0.08em] text-[#F4FEFF] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:text-[#7CF4F0] hover:drop-shadow-[0_0_12px_rgba(124,244,240,0.65)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] md:text-[15px]"
          >
            MOSASAURUS
          </a>

          {/* Zone 2: Dead-Centre MENU with thin 1px white line (~80px wide) above it */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            className="group absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#F4FEFF] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
          >
            <span
              aria-hidden="true"
              className="block h-[1px] w-16 bg-[#F4FEFF]/85 transition-all duration-200 group-hover:w-24 group-hover:bg-[#7CF4F0] group-hover:shadow-[0_0_10px_rgba(124,244,240,0.85)] md:w-20 md:group-hover:w-28"
            />
            <span className="font-display text-sm tracking-[0.08em] uppercase transition-all duration-200 group-hover:text-[#7CF4F0] group-hover:drop-shadow-[0_0_12px_rgba(124,244,240,0.65)] md:text-[15px]">
              MENU
            </span>
          </button>

          {/* Zone 3: Right CONTACT */}
          <a
            href="#contact"
            className="font-display text-sm tracking-[0.08em] text-[#F4FEFF] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:text-[#7CF4F0] hover:drop-shadow-[0_0_12px_rgba(124,244,240,0.65)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] md:text-[15px]"
          >
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
};
