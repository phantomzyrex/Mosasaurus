import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  isScrolledPastHero?: boolean;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, isScrolledPastHero = false }) => {
  return (
    <header
      className={`z-40 transition-all duration-300 ${
        isScrolledPastHero
          ? 'fixed top-0 right-0 left-0 border-b border-[#F4FEFF]/10 bg-[#020E1A]/85 px-6 py-4 backdrop-blur-md md:px-10'
          : 'absolute top-0 right-0 left-0 px-6 pt-5 pb-4 md:px-8 md:pt-7'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex w-full items-center justify-between gap-8"
      >
        {/* Zone 1: Left Brand Name */}
        <a
          href="#hero"
          className="font-display text-sm tracking-[0.08em] text-[#F4FEFF] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:text-[#7CF4F0] hover:drop-shadow-[0_0_12px_rgba(124,244,240,0.65)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0] md:text-[15px]"
        >
          MOSASAURUS
        </a>

        {/* Zone 2: Centre MENU with thin 1px white line (~80px wide) above it */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          className="group flex flex-col items-center gap-1.5 text-[#F4FEFF] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7CF4F0]"
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
    </header>
  );
};
