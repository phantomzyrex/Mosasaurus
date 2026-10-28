import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], img, [data-cursor-bubble]');
        setIsHovering(Boolean(interactive));
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
    >
      <div
        className={` -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          isHovering
            ? 'h-12 w-12 border-[#7CF4F0]/75 bg-[#36D6DE]/15 shadow-[0_0_20px_rgba(124,244,240,0.35)]'
            : 'h-4 w-4 border-[#F4FEFF]/55 bg-[#7CF4F0]/10'
        }`}
      />
    </div>
  );
};
