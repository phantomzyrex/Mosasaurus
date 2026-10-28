import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up GSAP ScrollTrigger animations across all sections:
 * - Section numbers (.section-number-outline): vertical parallax & fade-in
 * - Section headers ([data-scroll-header]): upward line-mask reveal
 * - Hairline dividers ([data-scroll-divider]): horizontal scaleX(0 -> 1) draw
 * - Staggered grids ([data-scroll-grid]): staggered child card rise & fade
 * - Timeline progress line ([data-timeline-progress]): scrub-linked vertical draw
 * - Reveal blocks ([data-scroll-reveal]): smooth fade + translateY(32px -> 0)
 */
export function useScrollAnimations(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Outlined section numbers parallax & entrance
      gsap.utils.toArray<HTMLElement>('.section-number-outline').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0.15 },
          {
            y: -12,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.6,
            },
          }
        );
      });

      // 2. Section headings & kickers smooth rise
      gsap.utils.toArray<HTMLElement>('[data-scroll-header]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Expanding horizontal hairline dividers
      gsap.utils.toArray<HTMLElement>('[data-scroll-divider]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0.08, transformOrigin: 'left center', opacity: 0.3 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 4. Staggered card grids (Overview stats, Fast Facts, Species, etc.)
      gsap.utils.toArray<HTMLElement>('[data-scroll-grid]').forEach((grid) => {
        const children = Array.from(grid.children) as HTMLElement[];
        if (!children.length) return;
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.065,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 5. Individual reveal blocks
      gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 6. Discovery Timeline progressive draw line scrub
      const timelineLine = document.querySelector<HTMLElement>(
        '[data-timeline-progress]'
      );
      const timelineContainer = document.querySelector<HTMLElement>(
        '[data-timeline-container]'
      );
      if (timelineLine && timelineContainer) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0.05, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineContainer,
              start: 'top 75%',
              end: 'bottom 35%',
              scrub: 0.4,
            },
          }
        );
      }

      // 7. Shivang Studios monumental footer wordmark reveal
      const studioBanner = document.querySelector<HTMLElement>(
        '[data-testid="shivang-studios-banner"]'
      );
      if (studioBanner) {
        gsap.fromTo(
          studioBanner,
          { y: 44, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: studioBanner,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [enabled]);
}
